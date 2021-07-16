import React, {
	useEffect,
	useRef,
	SetStateAction,
	Dispatch,
	useState,
	useContext,
	useCallback,
} from 'react';
import {
	Animated,
	Platform,
	useWindowDimensions,
	ScrollView,
} from 'react-native';
import {
	consumeAllItemsAndroid,
	finishTransaction,
	Purchase as PurchaseProp,
	requestPurchase,
	useIAP,
} from 'react-native-iap';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { TranslationsValues } from '@/config/intl';
import { AntDesign } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { ThemeContext } from 'styled-components/native';
import Like from '@/animations/like.json';
import PremiumDark from '@/animations/premium_dark.json';
import PremiumLight from '@/animations/premium_light.json';
import { useSerivces } from '@/hooks/useServices';
import {
	Container,
	Title,
	PurchaseContainer,
	PurchaseDescription,
	PurchaseTitle,
	PurchaseButton,
	ButtonLabel,
	CloseButton,
	LikeContainer,
	LikeLabel,
	scrollViewStyle,
	UpgradeLabel,
	UpgradeContainer,
} from './styles';
import { Modal } from '../modal';

interface IProps {
	isPurchaselVisible: boolean;
	setIsPurchaselVisible: Dispatch<SetStateAction<boolean>>;
	purchasedFunctionCallback: Promise<void> | void;
	productId: string;
	upgradeId: string;
	donateId: string;
	upgrade?: boolean;
	donate?: boolean;
}

interface IAcc {
	upgradeItem?: PurchaseProp;
	purchaseItem?: PurchaseProp;
	donateId?: PurchaseProp;
}

export const Purchase: React.FC<IProps> = ({
	isPurchaselVisible,
	setIsPurchaselVisible,
	purchasedFunctionCallback,
	productId,
	upgradeId,
	donateId,
	upgrade = false,
	donate = false,
}: IProps) => {
	const [componentPurchases, setComponentPurchases] = useState<IAcc>({});
	const [isDonateThanksOpen, setDonateThanksOpen] = useState(false);
	const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const { height, width } = useWindowDimensions();
	const { t } = useTranslation();
	const { setIsPremium } = useSerivces();
	const { connected, products, getProducts, currentPurchase } = useIAP();
	const translateY = useRef(new Animated.Value(height)).current;
	const netInfo = useNetInfo();
	const theme = useContext(ThemeContext);
	const items = Platform.select({
		android: [
			'1_export_month_fin_truck',
			'1_premium_fin_truck',
			'1_add_truck_fin_truck',
			'1_export_year_fin_truck',
			'1_donate_fin_truck',

			// 'android.test.purchased',
			// 'android.test.refunded',
			// 'android.test.canceled',
			// 'android.test.item_unavailable',
		],
	});

	useEffect(() => {
		if (isPurchaselVisible) {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
			return;
		}
		Animated.timing(translateY, {
			toValue: height,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [height, isPurchaselVisible, translateY]);

	useEffect(() => {
		if (connected && products.length === 0) {
			getProducts(items);
			// consumeAllItemsAndroid();
		}
	}, [connected, getProducts, items, products.length]);

	useEffect(() => {
		if (products.length > 0) {
			const selectedPurchases: IAcc = {};
			products.forEach(p => {
				if (p.productId === productId) {
					selectedPurchases[productId] = p;
				}
				if (p.productId === upgradeId) {
					selectedPurchases[upgradeId] = p;
				}
				if (p.productId === donateId) {
					selectedPurchases[donateId] = p;
				}
			});
			setComponentPurchases(selectedPurchases);
		}
	}, [donateId, productId, products, upgradeId]);

	useEffect(() => {
		const checkCurrentPurchase = async (
			purchase?: PurchaseProp,
		): Promise<void> => {
			if (purchase) {
				const receipt = purchase.transactionReceipt;
				if (receipt)
					try {
						if (purchase.productId === donateId) {
							setDonateThanksOpen(true);
						}
						if (purchase.productId === upgradeId) {
							await finishTransaction(purchase, false);
							await AsyncStorage.setItem('@PremiumApp', JSON.stringify(true));
							setIsPremium(true);
							setUpgradeModalOpen(true);
							return;
						}
						const ackResult = await finishTransaction(purchase, true);
						console.log('ackResult', ackResult);
					} catch (ackErr) {
						console.error('ackErr', ackErr);
					}
			}
		};
		checkCurrentPurchase(currentPurchase);
	}, [currentPurchase, donateId, upgradeId]);

	const purchase = useCallback(
		(id: string): void => {
			const item = products.find(p => p.productId === id);
			if (item.type === 'inapp') requestPurchase(item.productId);
		},
		[products],
	);

	if (upgrade) {
		return (
			<>
				<Container
					style={{
						transform: [{ translateY }],
					}}
					contentContainerStyle={scrollViewStyle.content}
				>
					<CloseButton onPress={() => setIsPurchaselVisible(false)}>
						<AntDesign name="close" size={24} color={theme.colors.text} />
					</CloseButton>
					<Title>{t(TranslationsValues.help)}</Title>
					<ScrollView contentContainerStyle={scrollViewStyle.content}>
						<PurchaseContainer key={shortid()}>
							<PurchaseTitle>
								{componentPurchases[donateId]?.title ?? ''}{' '}
								{componentPurchases[donateId]?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>
								{componentPurchases[donateId]?.description ?? ''}
							</PurchaseDescription>
							<PurchaseButton>
								<ButtonLabel>{t(TranslationsValues.donate)}</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
						<PurchaseContainer key={shortid()} even>
							<PurchaseTitle>
								{componentPurchases[upgradeId]?.title ?? ''}{' '}
								{componentPurchases[upgradeId]?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>
								{componentPurchases[upgradeId]?.description ?? ''}
							</PurchaseDescription>
							<PurchaseButton>
								<ButtonLabel>{t(TranslationsValues.buy)}</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
					</ScrollView>
				</Container>
				<Modal visible={isDonateThanksOpen} animationType="fade">
					<LikeContainer>
						<CloseButton onPress={() => setDonateThanksOpen(false)}>
							<AntDesign name="close" size={35} color={theme.colors.text} />
						</CloseButton>
						<LottieView
							autoPlay
							loop
							source={Like}
							resizeMode="contain"
							autoSize
							style={{
								height: width * 0.5,
								width: width * 0.5,
								backgroundColor: theme.colors.background,
							}}
						/>
						<LikeLabel>{t(TranslationsValues.thanks)}</LikeLabel>
					</LikeContainer>
				</Modal>
				<Modal visible={isUpgradeModalOpen} animationType="fade">
					<UpgradeContainer>
						<CloseButton onPress={() => setUpgradeModalOpen(false)}>
							<AntDesign name="close" size={35} color={theme.colors.text} />
						</CloseButton>
						<LottieView
							autoPlay
							loop
							source={theme.name === 'dark' ? PremiumDark : PremiumLight}
							resizeMode="contain"
							style={{
								top: -15,
								height: width * 0.7,
								width: width * 0.7,
								margin: 0,
								padding: 0,
								backgroundColor: theme.colors.background,
							}}
						/>
						<UpgradeLabel>{t(TranslationsValues.upgrade_message)}</UpgradeLabel>
					</UpgradeContainer>
				</Modal>
			</>
		);
	}

	if (donate) {
		return (
			<>
				<Container
					style={{
						transform: [{ translateY }],
					}}
					contentContainerStyle={scrollViewStyle.content}
				>
					<CloseButton onPress={() => setIsPurchaselVisible(false)}>
						<AntDesign name="close" size={24} color={theme.colors.text} />
					</CloseButton>
					<Title>{t(TranslationsValues.help)}</Title>
					<ScrollView contentContainerStyle={scrollViewStyle.content}>
						<PurchaseContainer key={shortid()} even>
							<PurchaseTitle>
								{componentPurchases[donateId]?.title ?? ''}{' '}
								{componentPurchases[donateId]?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>
								{componentPurchases[donateId]?.description ?? ''}
							</PurchaseDescription>
							<PurchaseButton>
								<ButtonLabel>{t(TranslationsValues.donate)}</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
					</ScrollView>
				</Container>
				<Modal visible={isDonateThanksOpen} animationType="fade">
					<LikeContainer>
						<CloseButton onPress={() => setDonateThanksOpen(false)}>
							<AntDesign name="close" size={35} color={theme.colors.text} />
						</CloseButton>
						<LottieView
							autoPlay
							loop
							source={Like}
							resizeMode="contain"
							autoSize
							style={{
								height: width * 0.5,
								width: width * 0.5,
								backgroundColor: theme.colors.background,
							}}
						/>
						<LikeLabel>{t(TranslationsValues.thanks)}</LikeLabel>
					</LikeContainer>
				</Modal>
				<Modal visible={isUpgradeModalOpen} animationType="fade">
					<UpgradeContainer>
						<CloseButton onPress={() => setUpgradeModalOpen(false)}>
							<AntDesign name="close" size={35} color={theme.colors.text} />
						</CloseButton>
						<LottieView
							autoPlay
							loop
							source={theme.name === 'dark' ? PremiumDark : PremiumLight}
							resizeMode="contain"
							style={{
								top: -15,
								height: width * 0.7,
								width: width * 0.7,
								margin: 0,
								padding: 0,
								backgroundColor: theme.colors.background,
							}}
						/>
						<UpgradeLabel>{t(TranslationsValues.upgrade_message)}</UpgradeLabel>
					</UpgradeContainer>
				</Modal>
			</>
		);
	}

	return (
		<>
			<Container
				style={{
					transform: [{ translateY }],
				}}
				contentContainerStyle={scrollViewStyle.content}
			>
				<CloseButton onPress={() => setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.help)}</Title>
				<PurchaseContainer key={shortid()}>
					<PurchaseTitle>
						{componentPurchases[productId]?.title ?? ''}{' '}
						{componentPurchases[productId]?.localizedPrice ?? ''}
					</PurchaseTitle>
					<PurchaseDescription>
						{componentPurchases[productId]?.description ?? ''}
					</PurchaseDescription>
					<PurchaseButton>
						<ButtonLabel>{t(TranslationsValues.buy)}</ButtonLabel>
					</PurchaseButton>
				</PurchaseContainer>
				<PurchaseContainer key={shortid()} even>
					<PurchaseTitle>
						{componentPurchases[donateId]?.title ?? ''}{' '}
						{componentPurchases[donateId]?.localizedPrice ?? ''}
					</PurchaseTitle>
					{/* ANCHOR */}
					<PurchaseDescription>
						{componentPurchases[donateId]?.description ?? ''}
					</PurchaseDescription>
					<PurchaseButton onPress={() => purchase(donateId)}>
						<ButtonLabel>{t(TranslationsValues.donate)}</ButtonLabel>
					</PurchaseButton>
				</PurchaseContainer>
				<PurchaseContainer key={shortid()}>
					<PurchaseTitle>
						{componentPurchases[upgradeId]?.title ?? ''}{' '}
						{componentPurchases[upgradeId]?.localizedPrice ?? ''}
					</PurchaseTitle>
					<PurchaseDescription>
						{componentPurchases[upgradeId]?.description ?? ''}
					</PurchaseDescription>
					<PurchaseButton onPress={() => purchase(upgradeId)}>
						<ButtonLabel>{t(TranslationsValues.buy)}</ButtonLabel>
					</PurchaseButton>
				</PurchaseContainer>
			</Container>
			<Modal visible={isDonateThanksOpen} animationType="fade">
				<LikeContainer>
					<CloseButton onPress={() => setDonateThanksOpen(false)}>
						<AntDesign name="close" size={35} color={theme.colors.text} />
					</CloseButton>
					<LottieView
						autoPlay
						loop
						source={Like}
						resizeMode="contain"
						autoSize
						style={{
							height: width * 0.5,
							width: width * 0.5,
							backgroundColor: theme.colors.background,
						}}
					/>
					<LikeLabel>{t(TranslationsValues.thanks)}</LikeLabel>
				</LikeContainer>
			</Modal>
			<Modal visible={isUpgradeModalOpen} animationType="fade">
				<UpgradeContainer>
					<CloseButton onPress={() => setUpgradeModalOpen(false)}>
						<AntDesign name="close" size={35} color={theme.colors.text} />
					</CloseButton>
					<LottieView
						autoPlay
						loop
						source={theme.name === 'dark' ? PremiumDark : PremiumLight}
						resizeMode="contain"
						style={{
							top: -15,
							height: width * 0.7,
							width: width * 0.7,
							margin: 0,
							padding: 0,
							backgroundColor: theme.colors.background,
						}}
					/>
					<UpgradeLabel>{t(TranslationsValues.upgrade_message)}</UpgradeLabel>
				</UpgradeContainer>
			</Modal>
		</>
	);
};
