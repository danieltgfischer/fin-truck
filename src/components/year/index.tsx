import React, {
	useState,
	useCallback,
	useMemo,
	useEffect,
	useContext,
} from 'react';
import Constants from 'expo-constants';
import { AdMobBanner } from 'expo-ads-admob';
import * as Sharing from 'expo-sharing';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useSerivces } from '@/hooks/useServices';
import { updateYearResume } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { asyncShareDatabase } from '@/utils/export-database';
import { Entypo } from '@expo/vector-icons';
import { ID_BANNER_PRODUCTION, ID_BANNER_DEV } from 'react-native-dotenv';
import { ThemeContext } from 'styled-components';
import { TimelineModalContext } from '@/contexts/timelineModal';
import { monthsNames } from './months';
import { PurchaseTimeline } from '../purchaseTimeline';
import {
	Container,
	Year,
	Line,
	Button,
	SubHeader,
	Label,
	Value,
	DatabseExportButton,
	ButtonDBContainer,
} from './styles';

interface IProps {
	year: number;
}

export const YearTimeline: React.FC<IProps> = ({ year }: IProps) => {
	const { locale, current_truck, yearResume } = useSelector(
		(state: IState) => state,
	);
	const [isPurchaselVisible, setPurchaselVisible] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const {
		billingRepository,
		isPremium,
		isNetworkConnected,
		isPurchaseStoreConnected,
	} = useSerivces();
	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);
	const [called, setCalled] = useState(false);
	const [isSharable, setSherable] = useState(false);
	const timelineCtx = useContext(TimelineModalContext);

	const getCurrentYearInfo = useCallback(async () => {
		const resume = await billingRepository.getYearInfo(year, current_truck.id);
		dispatch(updateYearResume({ year, resume }));
		setCalled(true);
	}, [billingRepository, current_truck.id, dispatch, year]);

	useEffect(() => {
		Sharing.isAvailableAsync().then(available => setSherable(available));
		if (isOpen && !called) {
			getCurrentYearInfo();
		}
	}, [called, getCurrentYearInfo, isOpen]);

	const months = useMemo(
		() => Object.keys(monthsNames).map(m => monthsNames[m]),
		[],
	);

	const toogleOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const { gains, costs, sub_total } = yearResume[year] ?? {
		gains: null,
		costs: null,
		sub_total: null,
	};

	const enableShareYearData = useCallback(async () => {
		const data = await billingRepository.getBillingOptionsByYear({
			truckId: current_truck.id,
			year,
		});

		await asyncShareDatabase({
			data,
			xlsx_name: `${year}`,
			path: `${current_truck.name}_${current_truck.board}_${year}`,
			locale: locale.country_code,
		});
	}, [
		billingRepository,
		current_truck.board,
		current_truck.id,
		current_truck.name,
		locale.country_code,
		year,
	]);

	const shareYearData = useCallback(async () => {
		if ((!isNetworkConnected || !isPurchaseStoreConnected) && !isPremium) {
			timelineCtx.setModalConnectionVisible(true);
			return;
		}
		if (!isPremium) {
			setPurchaselVisible(true);
			return;
		}
		const data = await billingRepository.getBillingOptionsByYear({
			truckId: current_truck.id,
			year,
		});

		await asyncShareDatabase({
			data,
			xlsx_name: `${year}`,
			path: `${current_truck.name}_${current_truck.board}_${year}`,
			locale: locale.country_code,
		});
	}, [
		billingRepository,
		current_truck.board,
		current_truck.id,
		current_truck.name,
		isNetworkConnected,
		isPremium,
		isPurchaseStoreConnected,
		locale.country_code,
		timelineCtx,
		year,
	]);

	const { currency } = locale[locale.country_code];
	const adUnitID =
		Constants.isDevice && !__DEV__ ? ID_BANNER_PRODUCTION : ID_BANNER_DEV;

	return (
		<Container>
			<Button onPress={toogleOpen}>
				<Line />
				<Year>{year}</Year>
				<Line />
			</Button>
			{!isPremium && isOpen && (
				<AdMobBanner
					style={{
						alignSelf: 'center',
					}}
					bannerSize="largeBanner"
					adUnitID={adUnitID}
					servePersonalizedAds
					onDidFailToReceiveAdWithError={e =>
						console.log('onDidFailToReceiveAdWithError', e)
					}
				/>
			)}
			{isOpen && (
				<>
					<SubHeader>
						{isSharable && (
							<ButtonDBContainer>
								<Label>{t(TranslationsValues.share)}</Label>
								<DatabseExportButton onPress={() => shareYearData()}>
									<Entypo name="share" size={30} color={theme.colors.text} />
								</DatabseExportButton>
							</ButtonDBContainer>
						)}
						<Label>{t(TranslationsValues.total_gains, { value: year })}:</Label>
						<Value color="#85bb65">
							{typeof gains !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(gains)
							)}
						</Value>
						<Label>{t(TranslationsValues.total_costs, { value: year })}:</Label>
						<Value color="#FF616D">
							{typeof costs !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(costs)
							)}
						</Value>
						<Label> {t(TranslationsValues.subtotal)}:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{typeof sub_total !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(sub_total)
							)}
						</Value>
					</SubHeader>
					{months.map(m => (
						<MonthTimeline
							month={m[locale.country_code]}
							year={year}
							key={m[locale.country_code]}
							monthNumber={m.monthNumber}
						/>
					))}
				</>
			)}
			<PurchaseTimeline
				isPurchaselVisible={isPurchaselVisible}
				setPurchaselVisible={setPurchaselVisible}
				enableFeature={enableShareYearData}
			/>
		</Container>
	);
};
