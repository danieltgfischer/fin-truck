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
	const { current_truck, years, monthResume } = useSelector(
		(state: IState) => state,
	);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(new Date().getMonth() === monthNumber);

	const openMonth = useCallback(async () => {
		setIsLoading(true);
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

	const { gains, costs, sub_total } = useMemo(
		() =>
			monthYear[monthNumber] ?? {
				gains: null,
				costs: null,
				sub_total: null,
			},
		[monthNumber, monthYear],
	);

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
						<Label>Total de ganhos de {month}:</Label>
						<Value color="#00b300">
							{I18n.toCurrency(gains) || (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>Total de gastos de {month}:</Label>
						<Value color="#ff0000">
							{I18n.toCurrency(costs, {}) || (
								<ActivityIndicator color="#B63B34" size="small" />
							)}
						</Value>
						<Label>Subtotal:</Label>
						<Value color="#ff6600">
							{I18n.toCurrency(sub_total, {
								precision: 2,
								separator: ',',
								delimiter: '.',
								unit: 'R$ ',
								strip_insignificant_zeros: false,
							}) || <ActivityIndicator color="#B63B34" size="small" />}
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

export default memo(MonthTimeline);
