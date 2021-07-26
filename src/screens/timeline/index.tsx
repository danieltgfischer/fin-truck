import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { AdMobBanner } from 'expo-ads-admob';
import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { YearTimeline } from '@/components/year';
import TimelineIcon from '@/icons/TimelineIcon.png';
import TimelineIconLight from '@/icons/TimelineLight.png';
import { useSerivces } from '@/hooks/useServices';
import { updateYears } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { ModalConnection } from '@/components/modalConnection';
import { TimelineModalContext } from '@/contexts/timelineModal';
import {
	Container,
	Image,
	SubHeader,
	Title,
	Warning,
	scrollViewStyle,
} from './styles';

type ScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Timeline
>;

type Props = {
	navigation: ScreenNavigationProp;
};

export const Timeline: React.FC<Props> = ({ navigation }: Props) => {
	const [isModalConnectionVisible, setModalConnectionVisible] = useState(false);
	const servicesCtx = useSerivces();
	const [isLoading, setIsLoading] = useState(true);
	const { current_truck, total_years } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const title = current_truck?.name ?? '';

	useEffect(() => {
		navigation.setOptions({
			title,
		});
	}, [navigation, title]);

	useEffect(() => {
		if (isLoading) {
			const unsubscribe = navigation.addListener('focus', () => {
				servicesCtx.billingRepository
					.getYears(current_truck.id)
					.then(({ total_years }) => {
						dispatch(updateYears(total_years));
						setIsLoading(false);
					});
			});
			return () => unsubscribe;
		}
	}, [
		servicesCtx.billingRepository,
		current_truck.id,
		dispatch,
		isLoading,
		navigation,
		servicesCtx.truckRepository,
	]);

	const isDark = theme.name === 'dark';
	const adUnitID =
		Constants.isDevice && !__DEV__
			? 'ca-app-pub-9490699886096845/2625998185'
			: 'ca-app-pub-3940256099942544/6300978111';

	return (
		<Container>
			{!servicesCtx.isPremium && (
				<AdMobBanner
					style={{
						paddingTop: 15,
						alignSelf: 'center',
					}}
					bannerSize="banner"
					adUnitID={adUnitID}
					servePersonalizedAds
					onDidFailToReceiveAdWithError={e =>
						console.log('onDidFailToReceiveAdWithError', e)
					}
				/>
			)}
			<SubHeader>
				<Image
					source={isDark ? TimelineIconLight : TimelineIcon}
					resizeMode="contain"
				/>
				<Title>{t(TranslationsValues.history)}</Title>
			</SubHeader>
			<TimelineModalContext.Provider
				value={{
					setModalConnectionVisible,
				}}
			>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
					{isLoading ? (
						<ActivityIndicator
							color={isDark ? theme.colors.text : '#B63B34'}
							size="small"
						/>
					) : (
						<>
							{total_years.length > 0 &&
								total_years.map(year => (
									<YearTimeline year={year} key={year} />
								))}
							{total_years.length === 0 && (
								<Warning>{t(TranslationsValues.empty_timeline)}</Warning>
							)}
						</>
					)}
				</ScrollView>
			</TimelineModalContext.Provider>
			<ModalConnection
				visible={isModalConnectionVisible}
				setIsVisible={setModalConnectionVisible}
			/>
		</Container>
	);
};
