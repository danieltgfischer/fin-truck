import React, {
	useState,
	useCallback,
	useMemo,
	useEffect,
	useContext,
} from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateYearResume } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import {
	asyncDownloadDatabase,
	asyncShareDatabase,
} from '@/utils/export-database';
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';
import { monthsNames } from './months';
import {
	Container,
	Year,
	Line,
	Button,
	SubHeader,
	Label,
	Value,
	DatabseExportButton,
	ExportDatabaseContainer,
	ButtonDBContainer,
} from './styles';

interface IProps {
	year: number;
}

export const YearTimeline: React.FC<IProps> = ({ year }: IProps) => {
	const { locale, current_truck, yearResume, monthResume } = useSelector(
		(state: IState) => state,
	);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const { billingRepository } = useDatabaseConnection();
	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (Object.keys(yearResume).length === 0) {
				billingRepository.getYearInfo(year, current_truck.id).then(resume => {
					dispatch(updateYearResume({ year, resume }));
				});
			}
		}
		return () => {
			mounted = false;
			return mounted;
		};
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		monthResume,
		year,
		yearResume,
	]);

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

	const exportYearData = useCallback(
		async type => {
			const data = await billingRepository.getBillingOptionsByYear({
				truckId: current_truck.id,
				year,
			});
			if (type === 'download') {
				await asyncDownloadDatabase({
					data,
					xlsx_name: `${year}`,
					path: `${current_truck.name}_${current_truck.board}_${year}`,
					locale: locale.country_code,
				});
				ToastAndroid.showWithGravity(
					t(TranslationsValues.toast_download_year, { year }),
					ToastAndroid.LONG,
					ToastAndroid.CENTER,
				);
				return;
			}
			await asyncShareDatabase({
				data,
				xlsx_name: `${year}`,
				path: `${current_truck.name}_${current_truck.board}_${year}`,
				locale: locale.country_code,
			});
		},
		[
			billingRepository,
			current_truck.board,
			current_truck.id,
			current_truck.name,
			locale.country_code,
			t,
			year,
		],
	);

	const { currency } = locale[locale.country_code];
	return (
		<Container>
			<Button onPress={toogleOpen}>
				<Line />
				<Year>{year}</Year>
				<Line />
			</Button>
			{isOpen && (
				<>
					<SubHeader>
						<ExportDatabaseContainer>
							<ButtonDBContainer>
								<Label>{t(TranslationsValues.download)}</Label>
								<DatabseExportButton onPress={() => exportYearData('download')}>
									<Entypo name="download" size={24} color={theme.colors.text} />
								</DatabseExportButton>
							</ButtonDBContainer>
							<ButtonDBContainer>
								<Label>{t(TranslationsValues.share)}</Label>
								<DatabseExportButton onPress={() => exportYearData('share')}>
									<Entypo name="share" size={24} color={theme.colors.text} />
								</DatabseExportButton>
							</ButtonDBContainer>
						</ExportDatabaseContainer>
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
		</Container>
	);
};
