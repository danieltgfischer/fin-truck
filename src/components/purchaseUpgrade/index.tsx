import React, {
	Dispatch,
	useContext,
	useCallback,
	useState,
	useEffect,
} from 'react';
import {
	Animated,
	Platform,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { AdMobRewarded, AdMobBanner } from 'expo-ads-admob';
import {
	ID_BANNER_PRODUCTION,
	ID_REWARDED_PRODUCTION,
	ID_REWARDED_DEV,
	ID_BANNER_DEV,
	PURCHASE_MONTHLY,
	PURCHASE_YEARLY,
} from 'react-native-dotenv';
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useSerivces } from '@/hooks/useServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from 'react-native-iap';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { routeNames } from '@/navigation/types';
import {
	Container,
	CloseButton,
	scrollViewStyle,
	Title,
	Description,
	PurchaseContainer,
	ButtonLabel,
	PurchaseButton,
	PurchaseTitle,
	PurchaseDescription,
	ConainerAd,
	AdWarning,
} from '../purchase/styles';
import { ModalUpgrade } from '../modalUpgrade';
import { Modal } from '../modal';

interface IPurchaseUpgradeProps {
	translateY: Animated.Value;
	setIsPurchaselVisible: Dispatch<boolean>;
	enableFeature?(): void | Promise<void>;
}

export const PurchaseUpgrade: React.FC<IPurchaseUpgradeProps> = ({
	enableFeature = () => null,
	...props
}: IPurchaseUpgradeProps) => {
	const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const [isRewardAdLoding, setRewardAdLoding] = useState(false);
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();
	const { height } = useWindowDimensions();
	const { iapService, isPurchaseStoreConnected, isPremium } = useSerivces();
	const route = useRoute();
	const items = Platform.select({
		android: [PURCHASE_MONTHLY, PURCHASE_YEARLY],
	});

	const showModalUpgrade = useCallback(async () => {
		const showed = Boolean(
			JSON.parse(await AsyncStorage.getItem('@IsUpgradedShow')),
		);
		if (isPremium && !showed) {
			setUpgradeModalOpen(true);
		}
	}, [isPremium]);

	useEffect(() => {
		showModalUpgrade();
	}, [showModalUpgrade, isPremium]);

	useEffect(() => {
		if (isPurchaseStoreConnected && (subscriptions || [])?.length === 0) {
			iapService.getSubscriptions(items).then(setSubscriptions);
		}
	}, [
		iapService,
		isPurchaseStoreConnected,
		items,
		subscriptions,
		subscriptions.length,
	]);

	const purchaseSubcription = useCallback(
		async (id: string): Promise<void> => {
			try {
				await iapService.requestSubscription(id);
			} catch (error) {
				console.error(error);
			}
		},
		[iapService],
	);

	const isDev = Constants.isDevice && __DEV__;
	const initRewardAds = useCallback(async () => {
		setRewardAdLoding(true);
		const adUnitID = !isDev ? ID_REWARDED_PRODUCTION : ID_REWARDED_DEV;
		await AdMobRewarded.setAdUnitID(adUnitID);
		await AdMobRewarded.requestAdAsync();
		AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
			setRewardAdLoding(false);
			props.setIsPurchaselVisible(false);
		});
		AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
			setRewardAdLoding(false);
			props.setIsPurchaselVisible(false);
		});
		AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
			setRewardAdLoding(false);
			props.setIsPurchaselVisible(false);
			enableFeature();
		});
		await AdMobRewarded.showAdAsync();
	}, [enableFeature, isDev, props]);
	const adUnitID = !isDev ? ID_BANNER_PRODUCTION : ID_BANNER_DEV;
	return (
		<>
			<Container
				style={{
					transform: [{ translateY: props.translateY }],
				}}
				addPaddingTop
			>
				<CloseButton onPress={() => props.setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<AdMobBanner
					bannerSize="banner"
					adUnitID={adUnitID}
					servePersonalizedAds
					onDidFailToReceiveAdWithError={e =>
						console.log('onDidFailToReceiveAdWithError', e)
					}
				/>
				<Title>{t(TranslationsValues.upgrade_title)}</Title>
				<Description>{t(TranslationsValues.upgrade_description)}</Description>
				<ScrollView
					contentContainerStyle={scrollViewStyle.content}
					style={{ height }}
				>
					{route.name !== routeNames.AddTruck && (
						<PurchaseContainer key={shortid()}>
							<PurchaseTitle>
								{t(TranslationsValues.release_once)}
							</PurchaseTitle>
							<PurchaseDescription>
								{t(TranslationsValues.watch_video)}
							</PurchaseDescription>
							<PurchaseButton onPress={initRewardAds}>
								<ButtonLabel>{t(TranslationsValues.watch)}</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
					)}
					{(subscriptions ?? []).map((s, i) => (
						<PurchaseContainer key={shortid()} even={i % 2 === 0}>
							<PurchaseTitle>
								{s?.title ?? ''} {s?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>{s?.description ?? ''}</PurchaseDescription>
							<PurchaseButton onPress={() => purchaseSubcription(s?.productId)}>
								<ButtonLabel>
									{t(
										s.productId === PURCHASE_MONTHLY
											? TranslationsValues.subscribe_monthly
											: TranslationsValues.subscribe_yearly,
									)}
								</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
					))}
				</ScrollView>
			</Container>
			<ModalUpgrade
				isUpgradeModalOpen={isUpgradeModalOpen}
				setUpgradeModalOpen={setUpgradeModalOpen}
			/>
			<Modal visible={isRewardAdLoding} animationType="fade">
				<ConainerAd>
					<CloseButton
						style={{ top: 15, position: 'absolute' }}
						onPress={() => setRewardAdLoding(false)} // TODO set AsyncStoraged show true here!
					>
						<AntDesign name="close" size={24} color={theme.colors.text} />
					</CloseButton>
					<AdMobBanner
						bannerSize="mediumRectangle"
						adUnitID={adUnitID}
						servePersonalizedAds
						onDidFailToReceiveAdWithError={e =>
							console.log('onDidFailToReceiveAdWithError', e)
						}
					/>
					<AdWarning>{t(TranslationsValues.loading)}...</AdWarning>
					<ActivityIndicator color="#B63B34" size="large" />
					<AdMobBanner
						bannerSize="mediumRectangle"
						adUnitID={adUnitID}
						servePersonalizedAds
						onDidFailToReceiveAdWithError={e =>
							console.log('onDidFailToReceiveAdWithError', e)
						}
					/>
				</ConainerAd>
			</Modal>
		</>
	);
};
