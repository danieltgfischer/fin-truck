import { BilliginRepository } from '@/services/database/repositories/billingRepository';
import { TruckRepository } from '@/services/database/repositories/truckRepository';
import { createContext, Dispatch } from 'react';

export interface ISerivcesConnectionContext {
	truckRepository: TruckRepository;
	billingRepository: BilliginRepository;
	isPremium: boolean;
	setIsPremium: Dispatch<boolean>;
	isItemsStoreConnected: boolean;
}

export const ServicesConnectionContext =
	createContext<ISerivcesConnectionContext>({} as ISerivcesConnectionContext);
