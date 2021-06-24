import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, IState } from '../types';

const INITIAL_STATE = {
	trucks: [],
	current_truck: null,
	locale: 'pt-BR',
	total_years: [],
	years: {
		[new Date().getFullYear()]: {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: [],
			10: [],
			11: [],
		},
	},
	monthResume: {
		costs: 0,
		gains: 0,
		sub_total: 0,
	},
	yearResume: {
		costs: 0,
		gains: 0,
		sub_total: 0,
	},
};

export const truckReducer: Reducer<IState> = (
	state = INITIAL_STATE,
	action,
) => {
	return produce(state, draft => {
		switch (action.type) {
			case ActionTypes.ADD_TRUCK: {
				const { truck } = action.payload;
				draft.trucks.push(truck);
				break;
			}
			case ActionTypes.UPDATE_CURRENT_TRUCK: {
				const { payload } = action;
				draft.current_truck = payload.truck;
				break;
			}
			case ActionTypes.UPDATE_TRUCKS: {
				const {
					payload: { trucks },
				} = action;
				draft.trucks = trucks;
				break;
			}
			case ActionTypes.UPDATE_YEARS: {
				const {
					payload: { total_years },
				} = action;
				draft.total_years = total_years;
				break;
			}
			case ActionTypes.UPDATE_MONTH: {
				const {
					payload: { year, month, billings },
				} = action;
				draft.years[year][month] = billings;
				break;
			}
			case ActionTypes.UPDATE_TIMELINE: {
				const {
					payload: {
						monthBillings,
						monthResume,
						yearResume,
						month,
						year,
						total_years,
					},
				} = action;
				draft.years[year][month] = monthBillings;
				draft.monthResume = monthResume;
				draft.yearResume = yearResume;
				draft.total_years = total_years;
				break;
			}
			default:
				return draft;
		}
	});
};
