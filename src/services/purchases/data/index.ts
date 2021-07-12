import { TranslationsValues } from '@/config/intl';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';
import i18n from 'i18next';
import {
	connectAsync,
	disconnectAsync,
	getBillingResponseCodeAsync,
	getProductsAsync,
	IAPItemDetails,
	IAPQueryResponse,
	IAPResponseCode,
} from 'expo-in-app-purchases';
import { IPurchases } from '../domain';

export class IAP implements IPurchases {
	hasNetworkConnection = false;

	constructor() {
		this.init();
		this.verifyNetworkConnection();
	}

	init = async (): Promise<void> => {
		try {
			const responseCode = await getBillingResponseCodeAsync();
			if (responseCode === IAPResponseCode.OK) return;
			await connectAsync();
		} catch (error) {
			console.error(error);
		}
	};

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
				const products = await getProductsAsync(temList);
				if (products.responseCode === IAPResponseCode.OK) {
					return products;
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}
