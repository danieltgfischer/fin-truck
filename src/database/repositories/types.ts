import { BillingOption, Truck } from '../entities';

export interface ICreateBilling {
	value: number;
	description: string;
	created_at: Date;
	truck: Truck;
	option: string;
	month: number;
	year: number;
}

export interface IGetByMonth {
	truckId: string;
	month: number;
	year: number;
}

export interface IGetAll {
	truckId: string;
}

export interface IEditBillingOption {
	id: string;
	value: number;
	description: string;
}

export interface IYears {
	total_years: number[];
}

export interface IResumeInfo {
	gains: number;
	costs: number;
	sub_total: number;
}

export interface ITimelineUpdated {
	total_years: number[];
	yearResume: IResumeInfo;
	monthResume: IResumeInfo;
	monthBillings: BillingOption[];
}
