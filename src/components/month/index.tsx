import React, { useState, useCallback, useEffect, memo } from 'react';
import { BillingItem } from '@/components/billingItem';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { updateMonth } from '@/store/actions';
import { ActivityIndicator } from 'react-native';
import { MonthInfoContext } from '@/contexts/montInfo';
import { optionsObj } from './options';
import {
	Container,
	Month,
	Line,
	FlatList,
	EmptyData,
	flatListStyle,
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
	const { current_truck, years } = useSelector((state: IState) => state);
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

	const data = years[year][monthNumber] ?? [];

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
				<FlatList
					contentContainerStyle={flatListStyle.content}
					data={data}
					keyExtractor={item => String(item?.id)}
					renderItem={renderItem}
					nestedScrollEnabled
				/>
			)}
		</>
	);
};

export default MonthTimeline;
