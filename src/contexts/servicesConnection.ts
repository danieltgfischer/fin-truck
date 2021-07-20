import { BilliginRepository } from '@/services/database/repositories/billingRepository';
import { TruckRepository } from '@/services/database/repositories/truckRepository';
import { IInAppPurchase } from '@/services/purchase/domain';
import { createContext, Dispatch } from 'react';

export interface ISerivcesConnectionContext {
	truckRepository: TruckRepository;
	billingRepository: BilliginRepository;
	isPremium: boolean;
	setIsPremium: Dispatch<boolean>;
	isPurchaseStoreConnected: boolean;
	iapService: IInAppPurchase;
	isNetworkConnected: boolean;
}

export const ServicesConnectionContext =
	createContext<ISerivcesConnectionContext>({} as ISerivcesConnectionContext);
