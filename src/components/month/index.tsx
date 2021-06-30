import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { BillingItem } from '@/components/billingItem';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { IState } from '@/store/types';
import { updateMonth, updateMonthResume } from '@/store/actions';
import { MonthInfoContext } from '@/contexts/montInfo';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { optionsObj } from './options';
import {
	Container,
	Month,
	Line,
	FlatList,
	EmptyData,
	flatListStyle,
	SubHeader,
	Value,
	Label,
} from './styles';

interface IProps {
	month: string;
	monthNumber: number;
	year: number;
}

const MonthTimeline: React.FC<IProps> = ({
	month,
	monthNumber,
	year,
}: IProps) => {
	const { billingRepository } = useDatabaseConnection();
	const { current_truck, years, monthResume, locale } = useSelector(
		(state: IState) => state,
	);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(true);
	const thisYear = new Date();
	const [isOpen, setIsOpen] = useState(
		thisYear.getMonth() === monthNumber && thisYear.getFullYear() === year,
	);
	const [clld, setClld] = useState(false);

	const openMonth = useCallback(async () => {
		setIsLoading(true);
		setIsOpen(!isOpen);
		const billings = await billingRepository.getBillingOptionsByMonth({
			truckId: current_truck.id,
			month: monthNumber,
			year,
		});
		const resume = await billingRepository.getMonthInfo(
			year,
			current_truck.id,
			monthNumber,
		);
		dispatch(updateMonthResume({ resume, year, month: monthNumber }));
		dispatch(updateMonth({ year, month: monthNumber, billings }));
		setIsLoading(false);
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		isOpen,
		monthNumber,
		year,
	]);

	const callCurrentMonth = useCallback(async () => {
		if (new Date().getMonth() === monthNumber) {
			const billings = await billingRepository.getBillingOptionsByMonth({
				truckId: current_truck.id,
				month: monthNumber,
				year,
			});
			const resume = await billingRepository.getMonthInfo(
				year,
				current_truck.id,
				monthNumber,
			);
			dispatch(updateMonth({ year, month: monthNumber, billings }));
			dispatch(updateMonthResume({ resume, year, month: monthNumber }));
			setIsLoading(false);
		}
	}, [billingRepository, current_truck.id, dispatch, monthNumber, year]);

	useEffect(() => {
		if (!clld) {
			callCurrentMonth();
			setClld(true);
		}
	}, [callCurrentMonth, clld]);

	const renderItem = useCallback(
		({ item: { id, value, description, created_at, option }, index }) => {
			return (
				<MonthInfoContext.Provider value={{ monthNumber, year }}>
					<BillingItem
						{...{
							id,
							value,
							description,
							created_at,
							source: optionsObj[option].source,
							option,
							delay: index * 200,
							index,
						}}
					/>
				</MonthInfoContext.Provider>
			);
		},
		[monthNumber, year],
	);

	const data = useMemo(
		() => years[year][monthNumber] ?? [],
		[monthNumber, year, years],
	);

	const monthYear = useMemo(
		() =>
			monthResume[year] ?? {
				[month]: {},
			},
		[month, monthResume, year],
	);

	const { gains, costs, sub_total } = monthYear[monthNumber] ?? {
		gains: null,
		costs: null,
		sub_total: null,
	};

	const { currency } = locale[locale.country_code];

	return (
		<>
			<Container onPress={openMonth}>
				<Line />
				<Month>{month}</Month>
				<Line />
			</Container>
			{!isLoading && isOpen && data.length === 0 && (
				<EmptyData>{t(TranslationsValues.empty_month)}</EmptyData>
			)}
			{isLoading && isOpen && (
				<ActivityIndicator color="#B63B34" size="small" />
			)}
			{isOpen && !isLoading && data.length > 0 && (
				<>
					<SubHeader>
						<Label>
							{t(TranslationsValues.total_gains, { value: month })}:
						</Label>
						<Value color="#85bb65">
							{typeof gains === 'number' ? (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(gains)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>
							{t(TranslationsValues.total_costs, { value: month })}:
						</Label>
						<Value color="#FF616D">
							{typeof costs === 'number' ? (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(costs)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>{t(TranslationsValues.subtotal)}:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{typeof sub_total === 'number' ? (
								new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(sub_total)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
					</SubHeader>
					<FlatList
						contentContainerStyle={flatListStyle.content}
						data={data}
						keyExtractor={() => shortid()}
						renderItem={renderItem}
						nestedScrollEnabled
					/>
				</>
			)}
		</>
	);
};

export default MonthTimeline;
