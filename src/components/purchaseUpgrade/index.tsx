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
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useSerivces } from '@/hooks/useServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { consumeAllItemsAndroid, Subscription } from 'react-native-iap';
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
		android: ['1_monthly_fin_truck', '1_yearly_fin_truck'],
	});

	const addPaddingTop = route.name !== routeNames.AddTruck;

	const showModalUpgrade = useCallback(async () => {
		const showed = Boolean(
			JSON.parse(await AsyncStorage.getItem('@IsUpgradedShow')),
		);
		if (isPremium && !showed) {
			setUpgradeModalOpen(true);
			await AsyncStorage.setItem('@IsUpgradedShow', JSON.stringify(true));
		}
	}, [isPremium]);

	useEffect(() => {
		showModalUpgrade();
	}, [showModalUpgrade]);

	useEffect(() => {
		// consumeAllItemsAndroid();
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
		const adUnitID = !isDev
			? 'ca-app-pub-9490699886096845/2051283113'
			: 'ca-app-pub-3940256099942544/5224354917';
		await AdMobRewarded.setAdUnitID(adUnitID);
		await AdMobRewarded.requestAdAsync();
		AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
			setRewardAdLoding(false);
		});
		AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
			setRewardAdLoding(false);
		});
		AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
			setRewardAdLoding(false);
			props.setIsPurchaselVisible(false);
			enableFeature();
		});
		await AdMobRewarded.showAdAsync();
	}, [enableFeature, isDev, props]);
	const adUnitID = !isDev
		? 'ca-app-pub-9490699886096845/2625998185'
		: 'ca-app-pub-3940256099942544/6300978111';
	return (
		<>
			<Container
				style={{
					transform: [{ translateY: props.translateY }],
				}}
				addPaddingTop={addPaddingTop}
			>
				<AdMobBanner
					bannerSize="banner"
					adUnitID={adUnitID}
					servePersonalizedAds
					onDidFailToReceiveAdWithError={e =>
						console.log('onDidFailToReceiveAdWithError', e)
					}
				/>
				<CloseButton onPress={() => props.setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.upgrade_title)}</Title>
				<Description>{t(TranslationsValues.upgrade_description)}</Description>
				<ScrollView
					contentContainerStyle={scrollViewStyle.content}
					style={{ height }}
				>
					<PurchaseContainer key={shortid()}>
						<PurchaseTitle>Liberar uma vez</PurchaseTitle>
						<PurchaseDescription>
							Assista a um video de propaganda e desbloqueie esse recurso. É
							preciso assistir ao vídeo completo.
						</PurchaseDescription>
						<PurchaseButton onPress={initRewardAds}>
							<ButtonLabel>Assistir</ButtonLabel>
						</PurchaseButton>
					</PurchaseContainer>
					{(subscriptions ?? []).map((s, i) => (
						<PurchaseContainer key={shortid()} even={i % 2 === 0}>
							<PurchaseTitle>
								{s?.title ?? ''} {s?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>{s?.description ?? ''}</PurchaseDescription>
							<PurchaseButton onPress={() => purchaseSubcription(s?.productId)}>
								<ButtonLabel>
									{t(
										s.productId === '1_monthly_fin_truck'
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
					<AdWarning>Carregando Ads...</AdWarning>
					<ActivityIndicator color="#B63B34" size="large" />
				</ConainerAd>
			</Modal>
		</>
	);
};
