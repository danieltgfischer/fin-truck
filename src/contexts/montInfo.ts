import { createContext } from 'react';

export interface IMonthInfoContext {
	year: number;
	monthNumber: number;
}

export const MonthInfoContext = createContext<IMonthInfoContext>(
	{} as IMonthInfoContext,
);
