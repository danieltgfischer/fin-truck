import { Truck } from '@/database/entities';
import {
	ActionTypes,
	IAction,
	ITruck,
	ITrucks,
	ILocale,
	IYears,
	IMonth,
} from '../types';

export function addTruck(truck: Truck): IAction<ITruck> {
	return {
		type: ActionTypes.ADD_TRUCK,
		payload: { truck },
	};
}

export function updateTrucks(trucks: Truck[]): IAction<ITrucks> {
	return {
		type: ActionTypes.UPDATE_TRUCKS,
		payload: { trucks },
	};
}

export function updateCurrentTruck(truck: Truck): IAction<ITruck> {
	return {
		type: ActionTypes.UPDATE_CURRENT_TRUCK,
		payload: { truck },
	};
}

export function updateLocale(locale: string): IAction<ILocale> {
	return {
		type: ActionTypes.UPDATE_LOCALE,
		payload: { locale },
	};
}

export function updateYears(years: string[]): IAction<IYears> {
	return {
		type: ActionTypes.UPDATE_YEARS,
		payload: { years },
	};
}

export function updateMonth({ month, billings }: IMonth): IAction<IMonth> {
	return {
		type: ActionTypes.UPDATE_MONTH,
		payload: { month, billings },
	};
}
