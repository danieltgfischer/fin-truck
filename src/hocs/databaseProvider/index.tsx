import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { DatabaseConnectionContext } from '@/contexts/databaseConnection';
import { TruckRepository } from '@/database/repositories/truckRepository';
import { Truck, BillingOption } from '@/database/entities';
import { LoadingContainer } from '@/navigation/style';
import { BilliginRepository } from '@/database/repositories/billingRepository';

interface IProps {
	children: ReactNode;
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export const DatabaseConnectionProvider: FC<IProps> = ({
	children,
}: IProps) => {
	const [connection, setConnection] = useState<Connection | null>(null);

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

	if (!connection) {
		return (
			<LoadingContainer>
				<ActivityIndicator color="#fff" size="large" />
			</LoadingContainer>
		);
	}

	return (
		<DatabaseConnectionContext.Provider
			value={{
				truckRepository: new TruckRepository(connection),
				billingRepository: new BilliginRepository(connection),
			}}
		>
			{children}
		</DatabaseConnectionContext.Provider>
	);
};
