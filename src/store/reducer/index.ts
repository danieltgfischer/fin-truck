import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, IState } from '../types';

const INITIAL_STATE = {
	trucks: [],
	current_truck: null,
	locale: 'pt-BR',
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
			default:
				return draft;
		}
	});
};
