import {
	IAPItemDetails,
	IAPQueryResponse,
	IAPResponseCode,
	InAppPurchase,
} from 'expo-in-app-purchases';

export interface IPurchases {
	verifyNetworkConnection(): Promise<void>;
	getProducts(temList: string[]): Promise<IAPQueryResponse<IAPItemDetails>>;
	init(): Promise<void>;
	// connect(): Promise<void>;
	// disconnect(): Promise<void>;
	// finishTransaction(
	// 	product: InAppPurchase,
	// 	consumeItem: boolean,
	// ): Promise<void>;
	// buyItem(productId: string): Promise<void>;
	// getResponseCode(): Promise<IAPResponseCode>;
}
