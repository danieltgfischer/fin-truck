import { BilliginRepository } from '@/services/database/repositories/billingRepository';
import { TruckRepository } from '@/services/database/repositories/truckRepository';
import { createContext } from 'react';

export interface ISerivcesConnectionContext {
	truckRepository: TruckRepository;
	billingRepository: BilliginRepository;
}

export const ServicesConnectionContext =
	createContext<ISerivcesConnectionContext>({} as ISerivcesConnectionContext);
