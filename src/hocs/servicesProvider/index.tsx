import React, {
	FC,
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

interface IProps {
	children: ReactNode;
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export const ServicesConnectionProvider: FC<IProps> = ({
	children,
}: IProps) => {
	const { theme } = useSelector((state: IState) => state);
	const [connection, setConnection] = useState<Connection | null>(null);

	const iapService = useRef(new IAP()).current;
	const [isPurchaseStoreConnected, setIsPurchaseStoreConnected] =
		useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const [availablePurchases, setAvailablePurchases] = useState([]);

	useEffect(() => {
		try {
			iapService.startConnectionIAP().then(connection => {
				setIsPurchaseStoreConnected(connection);
			});
		} catch (error) {
			console.error(error);
		}
		return () => {
			iapService.endConnectionIAP();
		};
	}, [iapService]);

	const updateStorageIsPremium = useCallback(async () => {
		const premiumValue = availablePurchases?.some(p => {
			return p.productId === '1_monthly_fin_truck';
		});
		await AsyncStorage.setItem('@PremiumApp', JSON.stringify(premiumValue));
		setIsPremium(premiumValue);
	}, [availablePurchases]);

	useEffect(() => {
		const setUserPurchases = async () => {
			try {
				const storeAvailablePurchases =
					await iapService.getAvailablePurchases();
				setAvailablePurchases(storeAvailablePurchases);
			} catch (error) {
				console.error(error);
			}
		};
		if (isPurchaseStoreConnected) {
			setUserPurchases();
		}
	}, [iapService, isPurchaseStoreConnected]);

	useEffect(() => {
		if (availablePurchases.length > 0) updateStorageIsPremium();
	}, [availablePurchases.length, updateStorageIsPremium]);

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
			}}
		>
			{children}
		</ServicesConnectionContext.Provider>
	);
};
