import { Truck } from '@/database/entities';
import { ActionTypes, IAction, ITruck, ITrucks, ILocale } from '../types';

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

export function updateLOCALE(locale: string): IAction<ILocale> {
	return {
		type: ActionTypes.UPDATE_LOCALE,
		payload: { locale },
	};
}
