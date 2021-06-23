import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { TruckItem } from '@/components/truckItem';
import { EmptyTrucks } from '@/components/emptyTrucks';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { IState } from '@/store/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateTrucks } from '@/store/actions';
import {
	ButtonIcon,
	Container,
	EmptyCell,
	FlatList,
	flatListStyle,
	Footer,
	FooterLabel,
	Title,
} from './styles';

type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Home
>;

type Props = {
	navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
	const { trucks } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { truckRepository } = useDatabaseConnection();
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			truckRepository?.getAllTrucks().then(response => {
				dispatch(updateTrucks(response));
			});
		});

		return unsubscribe;
	}, [dispatch, navigation, truckRepository]);

	function createRows(trucks, columns) {
		const data = Array.from(trucks);
		const rows = Math.floor(data.length / columns);
		let lastRowElements = data.length - rows * columns;
		while (lastRowElements !== columns) {
			data.push({
				id: `empty-${lastRowElements}`,
				name: `empty-${lastRowElements}`,
				empty: true,
			});
			lastRowElements += 1;
		}
		return data;
	}

	const renderItem = ({ item: { name, board, id, ...item } }) => {
		if (item?.empty) {
			return <EmptyCell />;
		}
		return <TruckItem board={board} name={name} id={id} />;
	};

	const navigate = useCallback(
		path => {
			navigation.navigate(path);
		},
		[navigation],
	);
	const data = trucks.length > 0 ? createRows(trucks, 3) : [];
	return (
		<Container>
			<Title>Caminhões adicionados:</Title>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => String(item.id)}
				contentContainerStyle={flatListStyle.content}
				numColumns={3}
				ListEmptyComponent={EmptyTrucks}
			/>
			<Footer>
				<ButtonIcon onPress={() => navigate(routeNames.AddTruck)}>
					<AntDesign name="pluscircle" size={50} color="#b63b34" />
				</ButtonIcon>
				<FooterLabel>Toque aqui para adicionar um caminhão</FooterLabel>
			</Footer>
		</Container>
	);
};
