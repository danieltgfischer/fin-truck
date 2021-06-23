import { Truck, BillingOption } from '@/database/entities';

type Month = {
	[key: number]: BillingOption[];
};

export interface IState {
	trucks: Truck[];
	current_truck: Truck;
	locale: string;
	years: number[];
	months: Month;
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
	years: number[];
}

export interface IMonth {
	month: number;
	billings: BillingOption[];
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
}
