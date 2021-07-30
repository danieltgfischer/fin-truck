import { PURCHASE_MONTHLY, PURCHASE_YEARLY } from 'react-native-dotenv';
import { IAP } from '../data';

const sut = () => {
	return {
		iap: new IAP(),
	};
};

jest.mock('react-native-iap', () => ({
	initConnection: jest.fn(async () => {
		return Promise.resolve(true);
	}),
	endConnection: jest.fn(async () => {
		return Promise;
	}),
	getSubscriptions: jest.fn(async () =>
		Promise.resolve([
			{
				currency: 'BRL',
				description:
					'This amount will be charged monthly, you can cancel whenever you want.',
				freeTrialPeriodAndroid: 'P1W',
				iconUrl: '',
				introductoryPrice: '',
				introductoryPriceAsAmountAndroid: '0',
				introductoryPriceCyclesAndroid: '0',
				introductoryPricePeriodAndroid: '',
				localizedPrice: 'R$0.99',
				originalJson:
					'{"productId":"PURCHASE_MONTHLY","type":"subs","price":"R$0.99","price_amount_micros":990000,"price_currency_code":"BRL","title":"Monthly plan (Fin Truck)","description":"This amount will be charged monthly, you can cancel whenever you want.","subscriptionPeriod":"P1M","freeTrialPeriod":"P1W","skuDetailsToken":"AEuhp4Kh5iCX5mrVCjMzCzdQ-udDrolFhaDdD3xhdRlWswIR_jN42rALADkHqu7y6Zhc"}',
				originalPrice: '0.99',
				originalPriceAndroid: 'R$0.99',
				packageNameAndroid: '',
				price: '0.99',
				productId: PURCHASE_MONTHLY,
				subscriptionPeriodAndroid: 'P1M',
				title: 'Monthly plan (Fin Truck)',
				type: 'subs',
				typeAndroid: 'subs',
			},
			{
				currency: 'BRL',
				description:
					'This amount will be billed annually, you can cancel whenever you want.',
				freeTrialPeriodAndroid: 'P1W',
				iconUrl: '',
				introductoryPrice: '',
				introductoryPriceAsAmountAndroid: '0',
				introductoryPriceCyclesAndroid: '0',
				introductoryPricePeriodAndroid: '',
				localizedPrice: 'R$11.99',
				originalJson:
					'{"productId":"PURCHASE_YEARLY","type":"subs","price":"R$11.99","price_amount_micros":11990000,"price_currency_code":"BRL","title":"Annual Plan (Fin Truck)","description":"This amount will be billed annually, you can cancel whenever you want.","subscriptionPeriod":"P1Y","freeTrialPeriod":"P1W","skuDetailsToken":"AEuhp4JBSjdthFg3W7cqer7uzQfHwTXTT3G-lsnO48FyUtI5aY1UHPu1pWIK7DwEG0Lb"}',
				originalPrice: '11.99',
				originalPriceAndroid: 'R$11.99',
				packageNameAndroid: '',
				price: '11.99',
				productId: PURCHASE_YEARLY,
				subscriptionPeriodAndroid: 'P1Y',
				title: 'Annual Plan (Fin Truck)',
				type: 'subs',
				typeAndroid: 'subs',
			},
		]),
	),
}));

describe('Testing In App Purchase Serivce', () => {
	it('Ensure iap start connection', () => {
		const { iap } = sut();
		expect(iap.startConnectionIAP()).resolves.toBe(true);
	});

	it('Ensure iap finish connection', async () => {
		const { iap } = sut();
		await iap.startConnectionIAP();
		expect(iap.endConnectionIAP()).resolves.toBe(null);
		expect(iap.purchaseErrorSubscription).toBe(null);
		expect(iap.purchaseUpdateSubscription).toBe(null);
	});

	it('Ensure iap get all subscriptions', async () => {
		const { iap } = sut();
		expect(
			iap.getSubscriptions([PURCHASE_MONTHLY, PURCHASE_YEARLY]),
		).resolves.toHaveLength(2);
	});
});
