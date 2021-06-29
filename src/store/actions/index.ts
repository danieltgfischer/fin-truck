import { Truck } from '@/database/entities';
import * as Types from '../types';

export function addTruck(truck: Truck): Types.IAction<Types.ITruck> {
	return {
		type: Types.ActionTypes.ADD_TRUCK,
		payload: { truck },
	};
}

export function updateTrucks(trucks: Truck[]): Types.IAction<Types.ITrucks> {
	return {
		type: Types.ActionTypes.UPDATE_TRUCKS,
		payload: { trucks },
	};
}

export function updateCurrentTruck(truck: Truck): Types.IAction<Types.ITruck> {
	return {
		type: Types.ActionTypes.UPDATE_CURRENT_TRUCK,
		payload: { truck },
	};
}

export function updateYears(
	total_years: number[],
): Types.IAction<Types.IYears> {
	return {
		type: Types.ActionTypes.UPDATE_YEARS,
		payload: { total_years },
	};
}

export function updateMonth({
	month,
	billings,
	year,
}: Types.IMonth): Types.IAction<Types.IMonth> {
	return {
		type: Types.ActionTypes.UPDATE_MONTH,
		payload: { month, billings, year },
	};
}

export function addYearKeyAtYears({
	year,
}: Types.IAddYear): Types.IAction<Types.IAddYear> {
	return {
		type: Types.ActionTypes.ADD_YEAR_IN_YEARS,
		payload: { year },
	};
}

export function updateTimeline({
	monthBillings,
	monthResume,
	yearResume,
	month,
	year,
	total_years,
}: Types.ITimelineAction): Types.IAction<Types.ITimelineAction> {
	return {
		type: Types.ActionTypes.UPDATE_TIMELINE,
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

export function updateYearResume({
	resume,
	year,
}: Types.IUpdateYearResume): Types.IAction<Types.IUpdateYearResume> {
	return {
		type: Types.ActionTypes.UPDATE_YEAR_RESUME,
		payload: {
			resume,
			year,
		},
	};
}

export function updateMonthResume({
	resume,
	year,
	month,
}: Types.IUpdateMonthResume): Types.IAction<Types.IUpdateMonthResume> {
	return {
		type: Types.ActionTypes.UPDATE_MONTH_RESUME,
		payload: {
			resume,
			year,
			month,
		},
	};
}

export function updateCountryCode({
	country_code,
}: Types.ICountryCode): Types.IAction<Types.ICountryCode> {
	return {
		type: Types.ActionTypes.UPDATE_COUNTRY_CODE,
		payload: { country_code },
	};
}

export function updateTheme(theme: string): Types.IAction<Types.ITheme> {
	return {
		type: Types.ActionTypes.UPDATE_THEME,
		payload: { theme },
	};
}
