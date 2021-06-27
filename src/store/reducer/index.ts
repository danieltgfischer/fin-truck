import * as Localization from 'expo-localization';
import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, IState } from '../types';

const locales = {
	'pt-BR': 'pt-BR',
	'en-US': 'en-US',
};

const country_code = Object.keys(locales).includes(Localization.locale)
	? locales[Localization.locale]
	: locales[1];

const INITIAL_STATE = {
	trucks: [],
	current_truck: null,
	locale: {
		country_code,
		'en-US': {
			code: 'en',
			CURRENCY_FORMAT: {
				separator: '.',
				precision: 2,
				unit: '$',
				delimiter: ',',
			},
		},
		'pt-BR': {
			code: 'pt',
			CURRENCY_FORMAT: {
				separator: ',',
				precision: 2,
				unit: 'R$',
				delimiter: '.',
			},
		},
	},
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
	monthResume: {},
	yearResume: {},
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
			case ActionTypes.ADD_YEAR_IN_YEARS: {
				const {
					payload: { year },
				} = action;
				draft.years = {
					...draft.years,
					[year]: { ...draft.years[year] },
				};
				break;
			}
			case ActionTypes.UPDATE_COUNTRY_CODE: {
				const {
					payload: { country_code },
				} = action;
				draft.locale.country_code = country_code;
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
				draft.monthResume[year][month] = monthResume;
				draft.yearResume[year] = yearResume;
				draft.total_years = total_years;
				break;
			}
			case ActionTypes.UPDATE_YEAR_RESUME: {
				const {
					payload: { year, resume },
				} = action;
				draft.yearResume = {
					...draft.yearResume,
					[year]: resume,
				};
				break;
			}
			case ActionTypes.UPDATE_MONTH_RESUME: {
				const {
					payload: { month, year, resume },
				} = action;
				draft.monthResume = {
					...draft.monthResume,
					[year]: {
						...draft.monthResume[year], // clone another months
						[month]: resume,
					},
				};
				break;
			}
			default:
				return draft;
		}
	});
};
