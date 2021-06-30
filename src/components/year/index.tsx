import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import MonthTimeline from '@/components/month';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateYearResume } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const { billingRepository } = useDatabaseConnection();
	const [isOpen, setIsOpen] = useState(
		new Date().getFullYear() === Number(year),
	);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (Object.keys(yearResume).length === 0) {
				billingRepository.getYearInfo(year, current_truck.id).then(resume => {
					dispatch(updateYearResume({ year, resume }));
				});
			}
		}
		return () => {
			mounted = false;
			return mounted;
		};
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		monthResume,
		year,
		yearResume,
	]);

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

	const { currency } = locale[locale.country_code];

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
						<Label>{t(TranslationsValues.total_gains, { value: year })}:</Label>
						<Value color="#85bb65">
							{typeof gains !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(gains)
							)}
						</Value>
						<Label>{t(TranslationsValues.total_costs, { value: year })}:</Label>
						<Value color="#FF616D">
							{typeof costs !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(costs)
							)}
						</Value>
						<Label> {t(TranslationsValues.subtotal)}:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{typeof sub_total !== 'number' ? (
								<ActivityIndicator color="#B63B34" size="small" />
							) : (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(sub_total)
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
