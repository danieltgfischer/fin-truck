import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { TruckItem } from '@/components/truckItem';
import { EmptyTrucks } from '@/components/emptyTrucks';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { IState } from '@/store/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateTrucks } from '@/store/actions';
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
import { Menu } from '@/components/menu';
import {
	ButtonIcon,
	Container,
	EmptyCell,
	FlatList,
	flatListStyle,
	Footer,
	FooterLabel,
	Title,
	FooterAddContainer,
	CloseMenuContainer,
} from './styles';

type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Home
>;

type Props = {
	navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
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

	useEffect(() => {
		const unsubscribe = navigation.addListener('blur', () => {
			setIsModalVisible(false);
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
		<CloseMenuContainer onPress={() => setIsModalVisible(false)}>
			<Container>
				<Title>{I18n.t(TranslationsValues.title_home)}:</Title>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={item => String(item.id)}
					contentContainerStyle={flatListStyle.content}
					numColumns={3}
					ListEmptyComponent={EmptyTrucks}
				/>
				<Footer>
					<FooterAddContainer>
						<FooterLabel>
							{I18n.t(TranslationsValues.button_label_home)}
						</FooterLabel>
						<ButtonIcon onPress={() => navigate(routeNames.AddTruck)}>
							<AntDesign name="pluscircle" size={50} color="#b63b34" />
						</ButtonIcon>
					</FooterAddContainer>
					<ButtonIcon onPress={() => setIsModalVisible(true)}>
						<AntDesign name="setting" size={50} color="#ccc" />
					</ButtonIcon>
				</Footer>
				<Menu
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
				/>
			</Container>
		</CloseMenuContainer>
	);
};
