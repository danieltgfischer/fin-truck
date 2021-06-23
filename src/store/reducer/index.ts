import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, IState } from '../types';

const INITIAL_STATE = {
	trucks: [],
	current_truck: null,
	locale: 'pt-BR',
	years: [],
	months: {
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
					payload: { years },
				} = action;
				draft.years = years;
				break;
			}
			case ActionTypes.UPDATE_MONTH: {
				const {
					payload: { month, billings },
				} = action;
				draft.months[month] = billings;
				break;
			}
			default:
				return draft;
		}
	});
};
