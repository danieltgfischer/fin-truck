import React, {
	useEffect,
	useRef,
	SetStateAction,
	Dispatch,
	useState,
} from 'react';
import { Animated, Platform, useWindowDimensions } from 'react-native';
import { TranslationsValues } from '@/config/intl';
import shortid from 'shortid';
import { useTranslation } from 'react-i18next';
import { IAP } from '@/services/purchases/data';
import { useMemo } from 'react';
import { IAPItemDetails } from 'expo-in-app-purchases';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSerivces } from '@/hooks/useServices';
import { Container, Title, PurchaseContainer } from './styles';

interface IProps {
	isPurchaselVisible: boolean;
	setIsPurchaselVisible: Dispatch<SetStateAction<boolean>>;
	productId: string;
	upgradeId: string;
	donateId: string;
	upgrade?: boolean;
	donate?: boolean;
}

interface IAcc {
	upgradeItem?: IAPItemDetails;
	purchaseItem?: IAPItemDetails;
}

export const Purchase: React.FC<IProps> = ({
	isPurchaselVisible,
	setIsPurchaselVisible,
	productId,
	upgradeId,
	donateId,
	upgrade = false,
	donate = false,
}: IProps) => {
	const [componentPurchases, setComponentPurchases] = useState<IAcc>({});
	const { height } = useWindowDimensions();
	const { t } = useTranslation();
	const translateY = useRef(new Animated.Value(height)).current;
	const { inAppPurchases } = useSerivces();
	const netInfo = useNetInfo();

	const items = Platform.select({
		android: [
			// '1_export_month_fin_truck',
			// '1_premium_fin_truck',
			// '1_add_truck_fin_truck',
			// '1_export_year_fin_truck',
			// '1_donate_fin_truck',
			'android.test.purchased',
			'android.test.refunded',
			'android.test.canceled',
			'android.test.item_unavailable',
		],
	});

	useEffect(() => {
		if (netInfo.isConnected && isPurchaselVisible) {
			inAppPurchases.getProducts(items).then(response => {
				if (Object.keys(componentPurchases)?.length === 0) {
					if (response?.results.length > 0) {
						const componentPurchases: IAcc = {
							[productId]: null,
							[upgradeId]: null,
							[donateId]: null,
						};
						response?.results?.forEach(p => {
							if (p.productId === productId) {
								componentPurchases[productId] = p;
							} else if (p.productId === upgradeId) {
								componentPurchases[upgradeId] = p;
							}
						});
						setComponentPurchases(componentPurchases);
					}
				}
			});
		}
	}, [
		inAppPurchases,
		items,
		productId,
		componentPurchases,
		upgradeId,
		netInfo.isConnected,
		isPurchaselVisible,
		donateId,
	]);

	useEffect(() => {
		// if (isPurchaselVisible) {
		Animated.timing(translateY, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
		return;
		// }
		Animated.timing(translateY, {
			toValue: height,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [height, isPurchaselVisible, translateY]);
	console.log(componentPurchases);
	return (
		<Container
			style={{
				transform: [{ translateY }],
			}}
		>
			<PurchaseContainer key={shortid()}>
				<Title>{componentPurchases[upgradeId]?.title}</Title>
			</PurchaseContainer>
			<PurchaseContainer key={shortid()}>
				<Title>{componentPurchases[productId]?.title}</Title>
			</PurchaseContainer>
		</Container>
	);
};
