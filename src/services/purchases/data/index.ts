import { TranslationsValues } from '@/config/intl';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';
import i18n from 'i18next';
import {
	connectAsync,
	disconnectAsync,
	getProductsAsync,
	IAPItemDetails,
	IAPQueryResponse,
} from 'expo-in-app-purchases';
import { IPurchases } from '../domain';

export class IAP implements IPurchases {
	hasNetworkConnection = false;

	constructor() {
		this.verifyNetworkConnection();
	}

	async verifyNetworkConnection(): Promise<void> {
		try {
			const state = await NetInfo.fetch();
			if (!state.isConnected) {
				ToastAndroid.showWithGravity(
					i18n.t(TranslationsValues.network_offline),
					ToastAndroid.LONG,
					ToastAndroid.CENTER,
				);
				return;
			}
			this.hasNetworkConnection = state.isConnected;
		} catch (error) {
			ToastAndroid.showWithGravity(
				i18n.t(TranslationsValues.network_error),
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
