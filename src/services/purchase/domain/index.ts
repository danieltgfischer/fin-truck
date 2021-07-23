import { Subscription, SubscriptionPurchase, Purchase } from 'react-native-iap';

export type ListnerCallback = {
	callback(SubscriptionPurchase): void;
};
export interface IInAppPurchase {
	startConnectionIAP(): Promise<boolean>;
	purchaseListner(callback: (arg: SubscriptionPurchase) => void): Promise<void>;
	requestSubscription(sku: string): Promise<void>;
	getSubscriptions(skus: string[]): Promise<Subscription[]>;
	endConnectionIAP(): Promise<void>;
	getAvailablePurchases(): Promise<Purchase[]>;
}
