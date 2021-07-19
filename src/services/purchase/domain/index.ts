import { Subscription, SubscriptionPurchase, Purchase } from 'react-native-iap';

export interface IInAppPurchase {
	startConnectionIAP(): Promise<boolean>;
	purchaseListner(): Promise<SubscriptionPurchase>;
	requestSubscription(sku: string): Promise<void>;
	getSubscriptions(skus: string[]): Promise<Subscription[]>;
	endConnectionIAP(): Promise<void>;
	getAvailablePurchases(): Promise<Purchase[]>;
}
