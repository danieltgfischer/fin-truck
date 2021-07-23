import RNIap, {
	purchaseUpdatedListener,
	SubscriptionPurchase,
	PurchaseStateAndroid,
	Subscription,
	Purchase,
} from 'react-native-iap';
import { IInAppPurchase, ListnerCallback } from '../domain';

export class IAP implements IInAppPurchase {
	purchaseUpdateSubscription = null;

	purchaseErrorSubscription = null;

	async startConnectionIAP(): Promise<boolean> {
		try {
			const connection = await RNIap.initConnection();
			return connection;
		} catch (error) {
			console.error('startConnectionIAP', error);
		}
	}

	async purchaseListner(
		callback: (arg: SubscriptionPurchase) => void,
	): Promise<void> {
		try {
			await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
			this.purchaseUpdateSubscription = purchaseUpdatedListener(
				async (purchase: SubscriptionPurchase) => {
					const receipt = purchase.transactionReceipt;
					if (
						receipt &&
						purchase.purchaseStateAndroid === PurchaseStateAndroid.PURCHASED
					) {
						await RNIap.finishTransaction(purchase);
					}
					callback(purchase);
				},
			);
		} catch (error) {
			console.error('purchaseListner', error);
		}
	}

	async getAvailablePurchases(): Promise<Purchase[]> {
		try {
			const purchases = await RNIap.getAvailablePurchases();
			return purchases;
		} catch (error) {
			console.error('getAvailablePurchases', error);
		}
	}

	async requestSubscription(sku: string): Promise<void> {
		try {
			await RNIap.requestSubscription(sku);
		} catch (error) {
			console.log('requestSubscription', error);
		}
	}

	async getSubscriptions(skus: string[]): Promise<Subscription[]> {
		try {
			const subscriptions = await RNIap.getSubscriptions(skus);
			return subscriptions;
		} catch (error) {
			console.error('getSubscriptions', error);
		}
	}

	async endConnectionIAP(): Promise<void> {
		try {
			await RNIap.endConnection();
			if (this.purchaseUpdateSubscription) {
				this.purchaseUpdateSubscription.remove();
				this.purchaseUpdateSubscription = null;
			}
			if (this.purchaseErrorSubscription) {
				this.purchaseErrorSubscription.remove();
				this.purchaseErrorSubscription = null;
			}
		} catch (error) {
			console.log('endConnectionIAP', error);
		}
	}
}
