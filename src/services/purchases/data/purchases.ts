import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';
import {
	connectAsync,
	disconnectAsync,
	getProductsAsync,
	IAPItemDetails,
	IAPQueryResponse,
} from 'expo-in-app-purchases';
import { IPurchases } from '../domain';

interface INetworkMessages {
	networkError: string;
	networkOffiline: string;
}

export class IAP implements IPurchases {
	hasNetworkConnection = false;

	networkMessages: INetworkMessages;

	constructor(networkMessages: INetworkMessages) {
		this.verifyNetworkConnection();
		this.networkMessages = networkMessages;
	}

	async verifyNetworkConnection(): Promise<void> {
		try {
			const state = await NetInfo.fetch();
			if (!state.isConnected) {
				ToastAndroid.showWithGravity(
					this.networkMessages.networkOffiline,
					ToastAndroid.LONG,
					ToastAndroid.CENTER,
				);
				return;
			}
			this.hasNetworkConnection = state.isConnected;
		} catch (error) {
			ToastAndroid.showWithGravity(
				this.networkMessages.networkError,
				ToastAndroid.LONG,
				ToastAndroid.CENTER,
			);
		}
	}

	async getProducts(
		temList: string[],
	): Promise<IAPQueryResponse<IAPItemDetails>> {
		try {
			if (this.hasNetworkConnection) {
				await connectAsync();
				const products = await getProductsAsync(temList);
				await disconnectAsync();
				return products;
			}
		} catch (error) {
			console.error(error);
		}
	}
}
