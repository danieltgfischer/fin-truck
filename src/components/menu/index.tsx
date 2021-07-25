import React, {
	useEffect,
	useRef,
	SetStateAction,
	Dispatch,
	useContext,
	useState,
} from 'react';
import { Animated, Linking, useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import { useCallback } from 'react';
import { useSerivces } from '@/hooks/useServices';
import { AdMobBanner } from 'expo-ads-admob';
import { LanguageSwitch } from '../languageSwitch';
import { ThemeSwitch } from '../themeSwitch';
import {
	Container,
	ButtonIcon,
	Rotate,
	Label,
	ContainerMenu,
	CancelSubscriptionButton,
	LabelButton,
	CancelSubscriptionContainer,
	CloseButton,
	SubscriptionTitle,
	Message,
} from './styles';
import { Modal } from '../modal';

interface IProps {
	isModalVisible: boolean;
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const Menu: React.FC<IProps> = ({
	isModalVisible,
	setIsModalVisible,
}: IProps) => {
	const [isModalSubscriptionVisible, setModalSubscriptionVisible] =
		useState(false);
	const { height } = useWindowDimensions();
	const { t } = useTranslation();
	const { name, colors } = useContext(ThemeContext);
	const translateY = useRef(new Animated.Value(height)).current;
	const rotate = useRef(new Animated.Value(0)).current;
	const { isPremium } = useSerivces();
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					useNativeDriver: true,
					toValue: 1,
					duration: 1000,
				}),
				Animated.timing(opacity, {
					useNativeDriver: true,
					toValue: 0,
					duration: 1000,
				}),
			]),
		).start();
	}, [opacity]);

	useEffect(() => {
		if (isModalVisible) {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
			Animated.sequence([
				Animated.timing(rotate, {
					toValue: 1,
					duration: 500,
					delay: 500,
					useNativeDriver: true,
				}),
				Animated.timing(rotate, {
					toValue: -1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
			return;
		}
		Animated.timing(translateY, {
			toValue: height,
			duration: 500,
			useNativeDriver: true,
		}).start();
		rotate.setValue(0);
	}, [height, isModalVisible, rotate, translateY]);

	const dark = name === 'dark';

	const cancelSubscription = useCallback(() => {
		Linking.openURL('https://play.google.com/store/account/subscriptions');
	}, []);

	const adUnitID =
		Constants.isDevice && !__DEV__
			? 'ca-app-pub-9490699886096845/2625998185'
			: 'ca-app-pub-3940256099942544/6300978111';

	return (
		<Container
			style={{
				transform: [{ translateY }],
			}}
		>
			<ButtonIcon onPress={() => setIsModalVisible(false)}>
				<Rotate
					style={{
						transform: [
							{
								rotate: rotate.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: ['180deg', '0deg', '-50deg'],
								}),
							},
						],
					}}
				>
					<AntDesign
						name="setting"
						size={50}
						color={dark ? colors.text : '#ccc'}
					/>
				</Rotate>
			</ButtonIcon>
			<Label>{t(TranslationsValues.language)}:</Label>
			<ContainerMenu>
				<LanguageSwitch />
			</ContainerMenu>
			<Label>{t(TranslationsValues.theme)}:</Label>
			<ContainerMenu>
				<ThemeSwitch />
			</ContainerMenu>
			{isPremium && (
				<CancelSubscriptionButton
					onPress={() => setModalSubscriptionVisible(true)}
				>
					<LabelButton>{t(TranslationsValues.unsubscribe)}</LabelButton>
				</CancelSubscriptionButton>
			)}

			<Modal visible={isModalSubscriptionVisible} animationType="fade">
				<CancelSubscriptionContainer>
					<CloseButton onPress={() => setModalSubscriptionVisible(false)}>
						<AntDesign name="close" size={24} color={colors.text} />
					</CloseButton>
					<SubscriptionTitle
						style={{
							opacity,
						}}
					>
						{t(TranslationsValues.attention)}:
					</SubscriptionTitle>
					<Message style={{ paddingTop: 5 }}>
						{t(TranslationsValues.unsubscribe_message)}
					</Message>
					<CancelSubscriptionButton onPress={cancelSubscription}>
						<LabelButton>{t(TranslationsValues.unsubscribe)}</LabelButton>
					</CancelSubscriptionButton>
				</CancelSubscriptionContainer>
			</Modal>
			{!isPremium && (
				<AdMobBanner
					style={{
						paddingTop: 15,
						maxWidth: '100%',
						position: 'absolute',
						bottom: 0,
					}}
					bannerSize="banner"
					adUnitID={adUnitID}
					servePersonalizedAds
					onDidFailToReceiveAdWithError={e =>
						console.log('onDidFailToReceiveAdWithError', e)
					}
				/>
			)}
		</Container>
	);
};
