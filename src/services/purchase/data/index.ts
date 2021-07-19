import RNIap, {
	purchaseUpdatedListener,
	SubscriptionPurchase,
	PurchaseStateAndroid,
	Subscription,
} from 'react-native-iap';

export class IAP {
	purchaseUpdateSubscription = null;

	purchaseErrorSubscription = null;

	async initIAP(): Promise<void> {
		await RNIap.initConnection();
		await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
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
			},
		);
	}

	async requestSubscription(sku: string): Promise<void> {
		await RNIap.requestSubscription(sku);
	}

	async getSubscriptions(skus: string[]): Promise<Subscription[]> {
		const subscriptions = await RNIap.getSubscriptions(skus);
		return subscriptions;
	}

	async endIAP(): Promise<void> {
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
