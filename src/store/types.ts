import { Truck, BillingOption } from '@/database/entities';

type Month = {
	[key: number]: BillingOption[];
};

type Year = {
	[key: number]: Month;
};

export type IResumeInfo = {
	gains: number;
	costs: number;
	sub_total: number;
};
export interface IState {
	trucks: Truck[];
	current_truck: Truck;
	locale: string;
	total_years: number[];
	years: Year;
	monthResume: IResumeInfo;
	yearResume: IResumeInfo;
	[key: number]: Month;
}

export interface IAction<T> {
	type: string;
	payload: T;
}

export interface ITruck {
	truck: Truck;
}

export interface ILocale {
	locale: string;
}

export interface IYears {
	total_years: number[];
}

export interface IMonth {
	month: number;
	year: number;
	billings: BillingOption[];
}

export interface ITimeline {
	yearResume: IResumeInfo;
	monthResume: IResumeInfo;
	monthBillings: BillingOption[];
}
export interface ITrucks {
	trucks: Truck[];
}

export enum ActionTypes {
	UPDATE_TRUCKS = 'UPDATE_TRUCKS',
	ADD_TRUCK = 'ADD_TRUCK',
	UPDATE_CURRENT_TRUCK = 'UPDATE_CURRENT_TRUCK',
	UPDATE_LOCALE = 'UPDATE_LOCALE',
	UPDATE_YEARS = 'UPDATE_YEARS',
	UPDATE_MONTH = 'UPDATE_MONTH',
	UPDATE_TIMELINE = 'UPDATE_TIMELINE',
}
