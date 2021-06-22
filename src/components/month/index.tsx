import React, { useMemo, useState, useCallback } from 'react';
import { BillingItem } from '@/components/billingItem';
import { optionsObj } from './options';
import { Container, Month, Line, FlatList } from './styles';

interface IProps {
	month: string;
	monthNumber: number;
}

export const MonthTimeline: React.FC<IProps> = ({
	month,
	monthNumber,
}: IProps) => {
	const [isOpen, setIsOpen] = useState(new Date().getMonth() === monthNumber);

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
