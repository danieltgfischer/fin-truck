import { Truck, BillingOption } from '@/database/entities';

type Month = {
	[key: number]: BillingOption[];
};

type Year = {
	[key: number]: Month;
};

export type IValuesResume = {
	gains: number;
	costs: number;
	sub_total: number;
};

export interface ICountryCode {
	country_code: string;
}

export interface IAddYear {
	year: number;
}
export interface IResumeInfo {
	[key: number]: IValuesResume;
}

export interface IMonthResumeInfo {
	[key: number]: IResumeInfo;
}
export interface IUpdateYearResume {
	year: number;
	resume: IValuesResume;
}

export interface IUpdateMonthResume extends IUpdateYearResume {
	month: number;
}

type Currenty = {
	separator: string;
	precision: number;
	unit: string;
	delimiter: string;
};

type NamedCurrency = {
	CURRENCY_FORMAT: Currenty;
	code: string;
	currency: string;
};
export interface ILocace {
	country_code: string;
	'en-US': NamedCurrency;
	'pt-BR': NamedCurrency;
}

export interface IState {
	trucks: Truck[];
	locale: ILocace;
	theme: string;
	current_truck: Truck;
	total_years: number[];
	years: Year;
	monthResume: IMonthResumeInfo;
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

export interface IYears {
	total_years: number[];
}

export interface IMonth {
	month: number;
	year: number;
	billings: BillingOption[];
}

export interface ITimeline {
	yearResume: IValuesResume;
	monthResume: IValuesResume;
	monthBillings: BillingOption[];
}

export interface ITimelineAction extends ITimeline {
	month: number;
	year: number;
	total_years: number[];
}

export interface ITrucks {
	trucks: Truck[];
}

export interface ITheme {
	theme: string;
}

export enum ActionTypes {
	UPDATE_TRUCKS = 'UPDATE_TRUCKS',
	ADD_TRUCK = 'ADD_TRUCK',
	UPDATE_CURRENT_TRUCK = 'UPDATE_CURRENT_TRUCK',
	UPDATE_YEARS = 'UPDATE_YEARS',
	UPDATE_MONTH = 'UPDATE_MONTH',
	UPDATE_TIMELINE = 'UPDATE_TIMELINE',
	UPDATE_YEAR_RESUME = 'UPDATE_YEAR_RESUME',
	UPDATE_MONTH_RESUME = 'UPDATE_MONTH_RESUME',
	ADD_YEAR_IN_YEARS = 'ADD_YEAR_IN_YEARS',
	UPDATE_COUNTRY_CODE = 'UPDATE_COUNTRY_CODE',
	UPDATE_THEME = 'UPDATE_THEME',
}
