import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateYearResume } from '@/store/actions';
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

	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		billingRepository.getYearInfo(year, current_truck.id).then(resume => {
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
						<Value color="#00b300">
							{gains || <ActivityIndicator color="#B63B34" size="small" />}
						</Value>
						<Label>Total de gastos de {year}:</Label>
						<Value color="#ff0000">
							{costs || <ActivityIndicator color="#B63B34" size="small" />}
						</Value>
						<Label>Subtotal:</Label>
						<Value color="#ff6600">
							{sub_total || <ActivityIndicator color="#B63B34" size="small" />}
						</Value>
					</SubHeader>
					{months.map(m => (
						<MonthTimeline
							month={m[locale]}
							year={year}
							key={m[locale]}
							monthNumber={m.monthNumber}
						/>
					))}
				</>
			)}
		</Container>
	);
};
