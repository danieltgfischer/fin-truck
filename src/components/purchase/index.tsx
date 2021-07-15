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
	finishTransaction,
	Purchase as PurchaseProp,
	requestPurchase,
	useIAP,
	consumeAllItemsAndroid,
} from 'react-native-iap';
import shortid from 'shortid';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { TranslationsValues } from '@/config/intl';
import { AntDesign } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { ThemeContext } from 'styled-components/native';
import Like from '@/animations/like.json';
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
} from './styles';
import { Modal } from '../modal';

interface IProps {
	isPurchaselVisible: boolean;
	setIsPurchaselVisible: Dispatch<SetStateAction<boolean>>;
	setEnablePurchase: Dispatch<SetStateAction<boolean>>;
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
	setEnablePurchase,
	productId,
	upgradeId,
	donateId,
	upgrade = false,
	donate = false,
}: IProps) => {
	const [componentPurchases, setComponentPurchases] = useState<IAcc>({});
	const [isDonate, setIsDonate] = useState(false);
	const [isDonateThanksOpen, setDonateThanksOpen] = useState(false);
	const { height, width } = useWindowDimensions();
	const { t } = useTranslation();
	const {
		connected,
		products,
		getProducts,
		currentPurchase,
		getAvailablePurchases,
		availablePurchases,
		purchaseHistories,
	} = useIAP();
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
	console.log(availablePurchases.length);
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
		console.log(purchaseHistories);
	}, []);

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
	}, [currentPurchase, donateId]);

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
						<PurchaseContainer key={shortid()}>
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
			</>
		);
	}

	return (
		<>
			<Container
				style={{
					transform: [{ translateY }],
				}}
			>
				<CloseButton onPress={() => setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.help)}</Title>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
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
					<PurchaseContainer key={shortid()}>
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
		</>
	);
};
