import { BilliginRepository } from '@/services/database/repositories/billingRepository';
import { TruckRepository } from '@/services/database/repositories/truckRepository';
import { IPurchases } from '@/services/purchases/domain';
import { createContext } from 'react';

export interface ISerivcesConnectionContext {
	truckRepository: TruckRepository;
	billingRepository: BilliginRepository;
	inAppPurchases: IPurchases;
}

export const ServicesConnectionContext =
	createContext<ISerivcesConnectionContext>({} as ISerivcesConnectionContext);
