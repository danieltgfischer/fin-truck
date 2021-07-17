import React, {
	useEffect,
	useRef,
	SetStateAction,
	Dispatch,
	useState,
	useCallback,
} from 'react';
import { Animated, Platform, useWindowDimensions } from 'react-native';
import {
	consumeAllItemsAndroid,
	purchaseUpdatedListener,
	flushFailedPurchasesCachedAsPendingAndroid,
	finishTransaction,
	Purchase as PurchaseProp,
	requestPurchase,
	useIAP,
	PurchaseError,
	ProductPurchase,
} from 'react-native-iap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSerivces } from '@/hooks/useServices';
import { PurchaseItem } from '../purchaseItem';
import { PurchaseDonate } from '../purchaseDonate';
import { PurchaseUpgrade } from '../purchaseUpgrade';

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

export interface IAcc {
	upgradeItem?: PurchaseProp;
	purchaseItem?: PurchaseProp;
	donateId?: PurchaseProp;
}

export const Purchase: React.FC<IProps> = ({
	upgrade = false,
	donate = false,
	...props
}: IProps) => {
	const [componentPurchases, setComponentPurchases] = useState<IAcc>({});
	const [isDonateThanksOpen, setDonateThanksOpen] = useState(false);
	const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const { height } = useWindowDimensions();
	const { setIsPremium } = useSerivces();
	const { connected, products, getProducts, currentPurchase } = useIAP();
	const translateY = useRef(new Animated.Value(height)).current;

	const items = Platform.select({
		android: [
			'1_export_month_fin_truck',
			'1_premium_fin_truck',
			'1_add_truck_fin_truck',
			'1_export_year_fin_truck',
			'1_donate_fin_truck',
		],
	});

	useEffect(() => {
		if (props.isPurchaselVisible) {
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
	}, [height, props.isPurchaselVisible, translateY]);

	useEffect(() => {
		if (connected && products.length === 0) {
			getProducts(items);
			// ANCHOR
			// consumeAllItemsAndroid();
		}
	}, [connected, getProducts, items, products.length]);

	useEffect(() => {
		if (products.length > 0) {
			const selectedPurchases: IAcc = {};
			products.forEach(p => {
				if (p.productId === props.productId) {
					selectedPurchases[props.productId] = p;
				}
				if (p.productId === props.upgradeId) {
					selectedPurchases[props.upgradeId] = p;
				}
				if (p.productId === props.donateId) {
					selectedPurchases[props.donateId] = p;
				}
			});
			setComponentPurchases(selectedPurchases);
		}
	}, [props.donateId, props.productId, products, props.upgradeId]);

	useEffect(() => {
		// TODO modal se upgrade for pendent
		// TODO liberar produto se está pendente a compra  no errorListner
		// TODO alterar mensagem de doação para recebemos sua doação
		// TODO deixar scroll no upgrade modal e melhorar estilo
		purchaseUpdatedListener((purchase: ProductPurchase) => {
			console.log(purchase);
		});
		// purchaseErrorListener((error: PurchaseError) => {})
	}, []);

	useEffect(() => {
		// ANCHOR
		const checkCurrentPurchase = async (
			purchase?: PurchaseProp,
		): Promise<void> => {
			if (purchase) {
				const receipt = purchase.transactionReceipt;
				if (receipt)
					try {
						if (purchase.productId === props.upgradeId) {
							await finishTransaction(purchase, false);
							await AsyncStorage.setItem('@PremiumApp', JSON.stringify(true));
							setIsPremium(true);
							setUpgradeModalOpen(true);
							return;
						}
						const ackResult = await finishTransaction(purchase, true);
						if (purchase.productId === props.donateId) {
							console.log(purchase.productId);
							setDonateThanksOpen(true);
						}
					} catch (ackErr) {
						console.error('ackErr', ackErr);
						const res = await flushFailedPurchasesCachedAsPendingAndroid();
						console.log(res);
					}
			}
		};
		checkCurrentPurchase(currentPurchase);
	}, [currentPurchase, props.donateId, setIsPremium, props.upgradeId]);

	const purchase = useCallback(
		(id: string): void => {
			const item = products.find(p => p.productId === id);
			if (item.type === 'inapp') requestPurchase(item.productId);
		},
		[products],
	);

	if (upgrade) {
		return (
			<PurchaseUpgrade
				translateY={translateY}
				setIsPurchaselVisible={props.setIsPurchaselVisible}
				isDonateThanksOpen={isDonateThanksOpen}
				donateId={props.donateId}
				upgradeId={props.upgradeId}
				purchase={purchase}
				isUpgradeModalOpen={isUpgradeModalOpen}
				setUpgradeModalOpen={setUpgradeModalOpen}
				setDonateThanksOpen={setDonateThanksOpen}
				componentPurchases={componentPurchases}
			/>
		);
	}

	if (donate) {
		return (
			<PurchaseDonate
				translateY={translateY}
				setIsPurchaselVisible={props.setIsPurchaselVisible}
				donateId={props.donateId}
				purchase={purchase}
				isDonateThanksOpen={isDonateThanksOpen}
				setDonateThanksOpen={setDonateThanksOpen}
				componentPurchases={componentPurchases}
			/>
		);
	}

	return (
		<PurchaseItem
			translateY={translateY}
			setIsPurchaselVisible={props.setIsPurchaselVisible}
			productId={props.productId}
			donateId={props.donateId}
			upgradeId={props.upgradeId}
			purchase={purchase}
			isDonateThanksOpen={isDonateThanksOpen}
			setDonateThanksOpen={setDonateThanksOpen}
			isUpgradeModalOpen={isUpgradeModalOpen}
			setUpgradeModalOpen={setUpgradeModalOpen}
			componentPurchases={componentPurchases}
		/>
	);
};
