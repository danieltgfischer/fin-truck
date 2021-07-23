import { createContext, Dispatch } from 'react';

export interface ITimelineModalContext {
	setModalConnectionVisible: Dispatch<boolean>;
	setIsPurchaselVisible: Dispatch<boolean>;
}

export const TimelineModalContext = createContext<ITimelineModalContext>(
	{} as ITimelineModalContext,
);
