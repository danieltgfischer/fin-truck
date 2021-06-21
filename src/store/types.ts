import { Truck, BillingOption } from '@/database/entities';

export interface IState {
	trucks: Truck[];
	current_truck: Truck;
	locale: string;
	years: string[];
	[key: number]: BillingOption[];
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
	years: string[];
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
