import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { addYearKeyAtYears, updateYearResume } from '@/store/actions';
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
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
	const { locale, current_truck, yearResume, monthResume } = useSelector(
		(state: IState) => state,
	);
	const dispatch = useDispatch();
	const { billingRepository } = useDatabaseConnection();
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		const ac = new AbortController();
		billingRepository.getYearInfo(year, current_truck.id).then(resume => {
			setIsLoading(false);
			if (!monthResume[year]) {
				dispatch(addYearKeyAtYears({ year }));
				console.log(monthResume, year, monthResume[year]);
			}
			dispatch(updateYearResume({ year, resume }));
		});
		return () => ac.abort();
	}, [billingRepository, current_truck.id, dispatch, monthResume, year]);

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
						<Label>
							{I18n.t(TranslationsValues.total_gains, { value: year })}:
						</Label>
						<Value color="#85bb65">
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(
									gains,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
							)}
						</Value>
						<Label>
							{I18n.t(TranslationsValues.total_costs, { value: year })}:
						</Label>
						<Value color="#FF616D">
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(
									costs,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
							)}
						</Value>
						<Label> {I18n.t(TranslationsValues.subtotal)}:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{isLoading ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								I18n.toCurrency(
									sub_total,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
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
