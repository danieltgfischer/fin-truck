import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { useIAP, initConnection } from 'react-native-iap';
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

interface IProps {
	children: ReactNode;
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export const ServicesConnectionProvider: FC<IProps> = ({
	children,
}: IProps) => {
	const { theme } = useSelector((state: IState) => state);
	const [connection, setConnection] = useState<Connection | null>(null);
	const [isPurchasesCalled, setPurchasesCalled] = useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const { getAvailablePurchases, connected, availablePurchases } = useIAP();
	const updateIsPremium = useCallback(async () => {
		// if (!connected) initConnection();
		const premiumValueStoraged = JSON.parse(
			await AsyncStorage.getItem('@PremiumApp'),
		);
		if (premiumValueStoraged) {
			setIsPremium(premiumValueStoraged);
			return;
		}
		if (connected && !isPurchasesCalled) {
			getAvailablePurchases();
			setPurchasesCalled(true);
			const premiumValue = availablePurchases.some(p => {
				console.log(p);
				return p.productId === '1_premium_fin_truck';
			});
			await AsyncStorage.setItem('@PremiumApp', JSON.stringify(premiumValue));
			setIsPremium(premiumValue);
			return;
		}
		setIsPremium(Boolean(premiumValueStoraged));
	}, [availablePurchases, connected, getAvailablePurchases, isPurchasesCalled]);

	useEffect(() => {
		updateIsPremium();
	}, [updateIsPremium]);

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
				isPremium,
				setIsPremium,
			}}
		>
			{children}
		</ServicesConnectionContext.Provider>
	);
};
