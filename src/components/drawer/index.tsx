import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import TrucksIcon from '@/icons/TrucksIcon.png';
import Timeline from '@/icons/Timeline.png';
import { ID_BANNER_PRODUCTION, ID_BANNER_DEV } from 'react-native-dotenv';
import { ButtonIcon } from '@/navigation/style';
import { routeNames } from '@/navigation/types';
import { TranslationsValues } from '@/config/intl';
import { AdMobBanner } from 'expo-ads-admob';
import { useSerivces } from '@/hooks/useServices';
import { DrawerItem } from './DrawerItem';
import { Menu } from '../menu';
import {
	DrawerContainer,
	HeaderContainer,
	HeaderLabel,
	MenuButtonsContainer,
	Container,
	MenuConfigContainer,
	DrawerContentContainer,
} from './styles';

export const DrawerComponent: React.FC = () => {
	const navigation = useNavigation();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const { isPremium } = useSerivces();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { height } = useWindowDimensions();
	const isDrawerOpen = useIsDrawerOpen();

	useEffect(() => {
		if (!isDrawerOpen) {
			setIsModalVisible(false);
		}
	}, [isDrawerOpen]);

	const navigate = useCallback(
		path => {
			navigation.navigate(path);
		},
		[navigation],
	);

	const isDark = theme.name === 'dark';
	const isDev = Constants.isDevice && __DEV__;
	const adUnitID = !isDev ? ID_BANNER_PRODUCTION : ID_BANNER_DEV;

	return (
		<Container>
			<DrawerContainer onPress={() => setIsModalVisible(false)}>
				<DrawerContentContainer>
					<MenuButtonsContainer>
						<HeaderContainer>
							<HeaderLabel>MENU</HeaderLabel>
						</HeaderContainer>
						<DrawerItem
							source={TrucksIcon}
							name={t(TranslationsValues.trucks)}
							onPress={() => navigate(routeNames.Home)}
						/>
						<DrawerItem
							source={Timeline}
							name={t(TranslationsValues.history)}
							onPress={() => navigate(routeNames.Timeline)}
						/>
						{!isPremium && height > 800 && (
							<AdMobBanner
								bannerSize="mediumRectangle"
								adUnitID={adUnitID}
								style={{
									alignSelf: 'center',
									paddingTop: 5,
								}}
								servePersonalizedAds
								onDidFailToReceiveAdWithError={e =>
									console.log('onDidFailToReceiveAdWithError', e)
								}
							/>
						)}
					</MenuButtonsContainer>
					<MenuConfigContainer>
						<ButtonIcon onPress={() => setIsModalVisible(true)}>
							<AntDesign
								name="setting"
								size={50}
								color={isDark ? theme.colors.text : '#ccc'}
							/>
						</ButtonIcon>
						{!isPremium && (
							<AdMobBanner
								bannerSize="largeBanner"
								adUnitID={adUnitID}
								style={{
									alignSelf: 'center',
									paddingTop: 5,
								}}
								servePersonalizedAds
								onDidFailToReceiveAdWithError={e =>
									console.log('onDidFailToReceiveAdWithError', e)
								}
							/>
						)}
					</MenuConfigContainer>
				</DrawerContentContainer>
			</DrawerContainer>
			<Menu
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				contentWidth={{ width: '90%' }}
			/>
		</Container>
	);
};
