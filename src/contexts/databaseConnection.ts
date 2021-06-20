import { BilliginRepository } from '@/database/repositories/billingRepository';
import { TruckRepository } from '@/database/repositories/truckRepository';
import { createContext } from 'react';

export interface IDatabaseConnectionContext {
	truckRepository: TruckRepository;
	billingRepository: BilliginRepository;
}

export const DatabaseConnectionContext =
	createContext<IDatabaseConnectionContext>({} as IDatabaseConnectionContext);
