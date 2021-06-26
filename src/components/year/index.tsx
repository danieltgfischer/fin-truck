import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateYearResume } from '@/store/actions';
import I18n from 'i18n-js';
import { monthsNames } from './months';
import {
	Container,
	Year,
	Line,
	Button,
	SubHeader,
	Label,
	Value,
} from './styles';

interface IProps {
	year: number;
}

export const YearTimeline: React.FC<IProps> = ({ year }: IProps) => {
	const { locale, current_truck, yearResume } = useSelector(
		(state: IState) => state,
	);
	const dispatch = useDispatch();
	const { billingRepository } = useDatabaseConnection();
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		billingRepository.getYearInfo(year, current_truck.id).then(resume => {
			setIsLoading(false);
			dispatch(updateYearResume({ year, resume }));
		});
	}, [billingRepository, current_truck.id, dispatch, year]);

	const months = useMemo(
		() => Object.keys(monthsNames).map(m => monthsNames[m]),
		[],
	);

	const toogleOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);
	const { gains, costs, sub_total } = yearResume[year] ?? {
		gains: null,
		costs: null,
		sub_total: null,
	};

	const countryCode = locale.country_code.split('-')[0];
	return (
		<Container>
			<Button onPress={toogleOpen}>
				<Line />
				<Year>{year}</Year>
				<Line />
			</Button>
			{isOpen && (
				<>
					<SubHeader>
						<Label>Total de ganhos de {year}:</Label>
						<Value color="#85bb65">
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(gains, locale[countryCode].CURRENCY_FORMAT)
							)}
						</Value>
						<Label>Total de gastos de {year}:</Label>
						<Value color="#FF616D">
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(costs, locale[countryCode].CURRENCY_FORMAT)
							)}
						</Value>
						<Label>Subtotal:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(sub_total, locale[countryCode].CURRENCY_FORMAT)
							)}
						</Value>
					</SubHeader>
					{months.map(m => (
						<MonthTimeline
							month={m[locale.country_code]}
							year={year}
							key={m[locale.country_code]}
							monthNumber={m.monthNumber}
						/>
					))}
				</>
			)}
		</Container>
	);
};
