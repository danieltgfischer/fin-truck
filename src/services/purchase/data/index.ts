import RNIap, {
	purchaseUpdatedListener,
	SubscriptionPurchase,
	PurchaseStateAndroid,
	Subscription,
	Purchase,
} from 'react-native-iap';
import { IInAppPurchase } from '../domain';

export class IAP implements IInAppPurchase {
	purchaseUpdateSubscription = null;

	purchaseErrorSubscription = null;

	async startConnectionIAP(): Promise<boolean> {
		const connection = await RNIap.initConnection();
		return connection;
	}

	async purchaseListner(): Promise<SubscriptionPurchase> {
		const ghosts = await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
		console.log(ghosts);
		let currentPurchse = null;
		this.purchaseUpdateSubscription = purchaseUpdatedListener(
			async (purchase: SubscriptionPurchase) => {
				console.log(purchase);
				const receipt = purchase.transactionReceipt;
				if (
					receipt &&
					purchase.purchaseStateAndroid === PurchaseStateAndroid.PURCHASED
				) {
					await RNIap.finishTransaction(purchase);
				}
				currentPurchse = purchase;
			},
		);
		return currentPurchse;
	}

	async getAvailablePurchases(): Promise<Purchase[]> {
		const purchases = await RNIap.getAvailablePurchases();
		return purchases;
	}

	async requestSubscription(sku: string): Promise<void> {
		await RNIap.requestSubscription(sku);
	}

	async getSubscriptions(skus: string[]): Promise<Subscription[]> {
		const subscriptions = await RNIap.getSubscriptions(skus);
		return subscriptions;
	}

	async endConnectionIAP(): Promise<void> {
		await RNIap.endConnection();
		if (this.purchaseUpdateSubscription) {
			this.purchaseUpdateSubscription.remove();
			this.purchaseUpdateSubscription = null;
		}
		if (this.purchaseErrorSubscription) {
			this.purchaseErrorSubscription.remove();
			this.purchaseErrorSubscription = null;
		}
	}
}
