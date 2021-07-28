import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ServicesConnectionContext } from '@/contexts/servicesConnection';
import { TruckRepository } from '@/services/database/repositories/truckRepository';
import { Truck, BillingOption } from '@/services/database/entities';
import { LoadingContainer } from '@/navigation/style';
import { BilliginRepository } from '@/services/database/repositories/billingRepository';
import light from '@/styles/themes/light';
import dark from '@/styles/themes/dark';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { ThemeProvider } from 'styled-components';
import { IAP } from '@/services/purchase/data';
import { useNetInfo } from '@react-native-community/netinfo';
import {
	Purchase,
	PurchaseStateAndroid,
	SubscriptionPurchase,
} from 'react-native-iap';
import { setTestDeviceIDAsync } from 'expo-ads-admob';

interface IProps {
	children: ReactNode;
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export const ServicesConnectionProvider: React.FC<IProps> = ({
	children,
}: IProps) => {
	const { theme } = useSelector((state: IState) => state);
	const [connection, setConnection] = useState<Connection | null>(null);
	const netInfo = useNetInfo();
	const iapService = useRef(new IAP()).current;
	const [isPurchaseStoreConnected, setIsPurchaseStoreConnected] =
		useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const [availablePurchases, setAvailablePurchases] = useState<Purchase[]>([]);
	const [isPurchaselVisible, setIsPurchaselVisible] = useState(false);

	// init connection with store android|ios
	useEffect(() => {
		setTestDeviceIDAsync('EMULATOR');
		try {
			if (netInfo.isConnected)
				iapService.startConnectionIAP().then(connection => {
					setIsPurchaseStoreConnected(connection);
				});
		} catch (error) {
			console.error(error);
		}
		return () => {
			try {
				if (netInfo.isConnected) iapService.endConnectionIAP();
			} catch (error) {
				console.error(error);
			}
		};
	}, [iapService, netInfo.isConnected]);

	// set user purchases
	const setUserPurchases = useCallback(async () => {
		try {
			const storeAvailablePurchases = await iapService.getAvailablePurchases();
			if (storeAvailablePurchases) {
				if (storeAvailablePurchases.length === 0) {
					await AsyncStorage.setItem('@IsUpgradedShow', JSON.stringify(false));
				}
				setAvailablePurchases(storeAvailablePurchases);
			}
		} catch (error) {
			console.error(error);
		}
	}, [iapService]);

	useEffect(() => {
		if (netInfo.isConnected && isPurchaseStoreConnected) {
			setUserPurchases();
		}
	}, [
		iapService,
		isPurchaseStoreConnected,
		netInfo.isConnected,
		setUserPurchases,
	]);

	const updatePremiumPlan = useCallback(async () => {
		if (netInfo.isConnected) {
			if (availablePurchases?.length === 0) {
				// is freemium or premium expire date was finished
				await AsyncStorage.setItem('@PremiumApp', JSON.stringify(false));
				setIsPremium(false);
				return;
			}
			const premiumValue = availablePurchases?.length > 0; // ANCHOR !IMPORTANT verify if is premium
			await AsyncStorage.setItem('@PremiumApp', JSON.stringify(premiumValue));
			setIsPremium(premiumValue);
		}
		// offline
		const premiumValue = Boolean(
			JSON.parse(await AsyncStorage.getItem('@PremiumApp')),
		);
		setIsPremium(premiumValue);
	}, [availablePurchases, netInfo.isConnected]);

	// verify if is premium every time app started
	useEffect(() => {
		updatePremiumPlan();
	}, [availablePurchases, updatePremiumPlan]);

	// set premium app on just purchased subscription
	useEffect(() => {
		if (isPurchaseStoreConnected) {
			try {
				iapService.purchaseListner(
					(currentPurchase: SubscriptionPurchase): void => {
						console.log('purchaseListner', currentPurchase);
						const enableApp =
							currentPurchase?.purchaseStateAndroid ===
								PurchaseStateAndroid.PENDING ||
							currentPurchase?.purchaseStateAndroid ===
								PurchaseStateAndroid.PURCHASED;
						if (enableApp) {
							AsyncStorage.setItem('@PremiumApp', JSON.stringify(true)).then(
								() => {
									setIsPremium(true);
									setIsPurchaselVisible(false);
								},
							);
						}
					},
				);
			} catch (error) {
				console.error(error);
			}
		}
	}, [iapService, isPurchaseStoreConnected]);

	const connect = useCallback(async () => {
		try {
			const createdConnection = await createConnection({
				type: 'expo',
				database: 'truck.db',
				driver: require('expo-sqlite'),
				entities: [Truck, BillingOption],
				synchronize: true,
			});
			setConnection(createdConnection);
		} catch (error) {
			if (error.name === 'AlreadyHasActiveConnectionError') {
				const existentConn = getConnectionManager().get('default');
				setConnection(existentConn);
				return;
			}
			throw new Error(error);
		}
	}, []);

	useEffect(() => {
		connect();
	}, [connect, connection]);

	const defaultTheme = theme === 'light' ? light : dark;

	if (!connection) {
		return (
			<ThemeProvider theme={defaultTheme}>
				<LoadingContainer>
					<ActivityIndicator color="#fff" size="large" />
				</LoadingContainer>
			</ThemeProvider>
		);
	}

	return (
		<ServicesConnectionContext.Provider
			value={{
				truckRepository: new TruckRepository(connection),
				billingRepository: new BilliginRepository(connection),
				iapService,
				isPremium,
				setIsPremium,
				isPurchaseStoreConnected,
				isNetworkConnected: netInfo.isConnected,
				isPurchaselVisible,
				setIsPurchaselVisible,
			}}
		>
			{children}
		</ServicesConnectionContext.Provider>
	);
};
