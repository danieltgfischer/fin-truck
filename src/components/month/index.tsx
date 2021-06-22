import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { BillingItem } from '@/components/billingItem';
import { optionsObj } from './options';
import { Container, Month, Line, FlatList } from './styles';

interface IProps {
	month: string;
	delay: number;
	monthNumber: number;
}

export const MonthTimeline: React.FC<IProps> = ({
	month,
	delay,
	monthNumber,
}: IProps) => {
	const [isOpen, setIsOpen] = useState(new Date().getMonth() === monthNumber);
	const translateYMonth = useMemo(() => new Animated.Value(-35), []);
	const opacity = useMemo(() => new Animated.Value(0), []);

	const data = useMemo(
		() => [
			{
				id: 1,
				option: 'shipping',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 2,
				option: 'taxes',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 3,
				option: 'tire',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 4,
				option: 'restaurant',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 5,
				option: 'restaurant',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 6,
				option: 'restaurant',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
			{
				id: 7,
				option: 'restaurant',
				value: 1000.52,
				description:
					'lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
				created_at: new Date(),
			},
		],
		[],
	);

	const renderItem = useCallback(
		({ item: { id, value, description, created_at, option }, index }) => {
			return (
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
			);
		},
		[],
	);

	return (
		<>
			<Container onPress={() => setIsOpen(!isOpen)}>
				<Line />
				<Month>{month}</Month>
				<Line />
			</Container>
			{isOpen && (
				<FlatList
					data={data}
					initialNumToRender={0}
					keyExtractor={item => String(item?.id)}
					renderItem={renderItem}
					nestedScrollEnabled
					maxToRenderPerBatch={1}
					onEndReachedThreshold={0.5}
				/>
			)}
		</>
	);
};
