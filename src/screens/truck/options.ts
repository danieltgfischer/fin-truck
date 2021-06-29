interface IOption {
	value: string;
	label: string;
	source: string;
	source_light: string;
	big_name: boolean;
}
export interface IOptionsObj {
	[key: string]: IOption;
}

export const optionsObj: IOptionsObj = {
	shipping: {
		value: 'shipping',
		label: 'Frete',
		source: require('@/icons/shipping.png'),
		source_light: require('@/icons/shipping-light.png'),
		big_name: false,
	},
	diesel: {
		value: 'diesel',
		label: 'Diesel',
		source: require('@/icons/diesel.png'),
		source_light: require('@/icons/diesel-light.png'),
		big_name: false,
	},
	maintenance: {
		value: 'maintenance',
		label: 'Manutenção',
		source: require('@/icons/maintenance.png'),
		source_light: require('@/icons/maintenance-light.png'),
		big_name: true,
	},
	tire: {
		value: 'tire',
		label: 'Pneu',
		source: require('@/icons/tire.png'),
		source_light: require('@/icons/tire-light.png'),
		big_name: false,
	},
	tracking: {
		value: 'tracking',
		label: 'Rastreamento',
		source: require('@/icons/tracking.png'),
		source_light: require('@/icons/tracking-light.png'),
		big_name: true,
	},
	salary: {
		value: 'salary',
		label: 'Salário',
		source: require('@/icons/salary.png'),
		source_light: require('@/icons/salary-light.png'),
		big_name: false,
	},
	admExpenses: {
		value: 'admExpenses',
		label: 'Despesas Administrativas',
		source: require('@/icons/admExpenses.png'),
		source_light: require('@/icons/admExpenses-light.png'),
		big_name: true,
	},
	parcels: {
		value: 'parcels',
		label: 'Parcelas',
		source: require('@/icons/parcels.png'),
		source_light: require('@/icons/parcels-light.png'),
		big_name: false,
	},
	taxes: {
		value: 'taxes',
		label: 'Tributos',
		source: require('@/icons/taxes.png'),
		source_light: require('@/icons/taxes-light.png'),
		big_name: false,
	},
	insurance: {
		value: 'insurance',
		label: 'Seguro',
		source: require('@/icons/insurance.png'),
		source_light: require('@/icons/insurance-light.png'),
		big_name: false,
	},
	accountant: {
		value: 'accountant',
		label: 'Assessoria Contábil',
		source: require('@/icons/accountant.png'),
		source_light: require('@/icons/accountant-light.png'),
		big_name: true,
	},
	advance: {
		value: 'advance',
		label: 'Adiantamento',
		source: require('@/icons/advance.png'),
		source_light: require('@/icons/advance-light.png'),
		big_name: true,
	},
	toll: {
		value: 'toll',
		label: 'Pedágio',
		source: require('@/icons/toll.png'),
		source_light: require('@/icons/toll-light.png'),
		big_name: false,
	},
	restaurant: {
		value: 'restaurant',
		label: 'Restaurante',
		source: require('@/icons/restaurant.png'),
		source_light: require('@/icons/restaurant-light.png'),
		big_name: true,
	},
	others: {
		value: 'others',
		label: 'Outros',
		source: require('@/icons/others.png'),
		source_light: require('@/icons/others-light.png'),
		big_name: false,
	},
};
