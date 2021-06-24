import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
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
	const { locale, current_truck } = useSelector((state: IState) => state);
	const { billingRepository } = useDatabaseConnection();

	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		billingRepository.getYearInfo(year, current_truck.id);
	}, [billingRepository, current_truck.id, year]);

	const months = useMemo(
		() => Object.keys(monthsNames).map(m => monthsNames[m]),
		[],
	);

	const toogleOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

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
						<Value color="#00b300">20000</Value>
						<Label>Total de gastos de {year}:</Label>
						<Value color="#ff0000">20000</Value>
						<Label>Subtotal:</Label>
						<Value color="#ff6600">{20000}</Value>
					</SubHeader>
					{months.map((m, i) => (
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
