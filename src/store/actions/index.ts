import { Truck } from '@/database/entities';
import {
	ActionTypes,
	IAction,
	ITruck,
	ITrucks,
	ILocale,
	IYears,
	IMonth,
	ITimeline,
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

export function updateYears(total_years: number[]): IAction<IYears> {
	return {
		type: ActionTypes.UPDATE_YEARS,
		payload: { total_years },
	};
}

export function updateMonth({
	month,
	billings,
	year,
}: IMonth): IAction<IMonth> {
	return {
		type: ActionTypes.UPDATE_MONTH,
		payload: { month, billings, year },
	};
}

interface ITimelineAction extends ITimeline {
	month: number;
	year: number;
	total_years: number[];
}

export function updateTimeline({
	monthBillings,
	monthResume,
	yearResume,
	month,
	year,
	total_years,
}: ITimelineAction): IAction<ITimelineAction> {
	return {
		type: ActionTypes.UPDATE_TIMELINE,
		payload: {
			monthBillings,
			monthResume,
			yearResume,
			month,
			year,
			total_years,
		},
	};
}
