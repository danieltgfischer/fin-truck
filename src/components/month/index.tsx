import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import I18n from 'i18n-js';
import { BillingItem } from '@/components/billingItem';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { IState } from '@/store/types';
import { updateMonth, updateMonthResume } from '@/store/actions';
import { MonthInfoContext } from '@/contexts/montInfo';
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
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(new Date().getMonth() === monthNumber);

	const openMonth = useCallback(async () => {
		setIsOpen(!isOpen);
		const billings = await billingRepository.getBillingOptionsByMonth({
			truckId: current_truck.id,
			month: monthNumber,
			year,
		});
		dispatch(updateMonth({ year, month: monthNumber, billings }));
		setIsLoading(false);
		const resume = await billingRepository.getMonthInfo(
			year,
			current_truck.id,
			monthNumber,
		);
		dispatch(updateMonthResume({ resume, year, month: monthNumber }));
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		isOpen,
		monthNumber,
		year,
	]);

	useEffect(() => {
		if (new Date().getMonth() === monthNumber) {
			setIsLoading(true);
			billingRepository
				.getBillingOptionsByMonth({
					truckId: current_truck.id,
					month: monthNumber,
					year,
				})
				.then(billings => {
					dispatch(updateMonth({ year, month: monthNumber, billings }));
					setIsLoading(false);
				});
			billingRepository
				.getMonthInfo(year, current_truck.id, monthNumber)
				.then(resume => {
					dispatch(updateMonthResume({ resume, year, month: monthNumber }));
				});
		}
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		isOpen,
		monthNumber,
		openMonth,
		year,
	]);

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

	return (
		<>
			<Container onPress={openMonth}>
				<Line />
				<Month>{month}</Month>
				<Line />
			</Container>
			{!isLoading && isOpen && data.length === 0 && (
				<EmptyData>Você não registrou nenhum valor nesse mês</EmptyData>
			)}
			{isLoading && isOpen && (
				<ActivityIndicator color="#B63B34" size="small" />
			)}
			{isOpen && !isLoading && data.length > 0 && (
				<>
					<SubHeader>
						<Label>Total de ganhos de {year}:</Label>
						<Value color="#85bb65">
							{gains || gains === 0 ? (
								I18n.toCurrency(
									gains,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>Total de gastos de {year}:</Label>
						<Value color="#FF616D">
							{costs || costs === 0 ? (
								I18n.toCurrency(
									costs,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>Subtotal:</Label>
						<Value color={sub_total > 0 ? '#369200' : '#cE1212'}>
							{sub_total || sub_total === 0 ? (
								I18n.toCurrency(
									sub_total,
									locale[locale.country_code].CURRENCY_FORMAT,
								)
							) : (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
					</SubHeader>
					<FlatList
						contentContainerStyle={flatListStyle.content}
						data={data}
						keyExtractor={item => String(item?.id)}
						renderItem={renderItem}
						nestedScrollEnabled
					/>
				</>
			)}
		</>
	);
};

export default MonthTimeline;
