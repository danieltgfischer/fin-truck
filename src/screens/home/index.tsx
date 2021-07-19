import React, { useCallback, useEffect, useState, useContext } from 'react';
import { ListRenderItemInfo, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import shortid from 'shortid';
import { ITruckItemProps, TruckItem } from '@/components/truckItem';
import { EmptyTrucks } from '@/components/emptyTrucks';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { IState } from '@/store/types';
import { useSerivces } from '@/hooks/useServices';
import { updateTrucks } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { Menu } from '@/components/menu';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import {
	ButtonIcon,
	HomeContainer,
	EmptyCell,
	FlatList,
	flatListStyle,
	Footer,
	FooterLabel,
	Title,
	FooterAddContainer,
	CloseMenuContainer,
	Container,
} from './styles';

type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Home
>;

type Props = {
	navigation: HomeScreenNavigationProp;
};

export type ListRenderItem<ItemT> = (
	info: ListRenderItemInfo<ItemT>,
) => React.ReactElement | null;

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { trucks } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { truckRepository, isPremium } = useSerivces();
	const { colors } = useContext(ThemeContext);
	const { t } = useTranslation();

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
		if (trucks.length > 0) {
			const data = Array.from(trucks);
			const rows = Math.floor(data.length / columns);
			let lastRowElements = data.length - rows * columns;
			while (lastRowElements !== columns) {
				data.push({
					id: shortid(),
					name: `empty-${lastRowElements}`,
					empty: true,
				});
				lastRowElements += 1;
			}
			return data;
		}
		return [];
	}

	const renderItem: ListRenderItem<ITruckItemProps> = ({
		item: { name, board, id, ...item },
	}) => {
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

	const closeAll = useCallback(() => {
		setIsModalVisible(false);
	}, []);

	const data = trucks.length > 0 ? createRows(trucks, 3) : [];
	const isAndroid = Platform.OS === 'android';
	// TODO create message to sync upgrade purchase
	return (
		<Container>
			<CloseMenuContainer onPress={closeAll}>
				<HomeContainer>
					<Title>{t(TranslationsValues.title_home)}:</Title>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item: ITruckItemProps) => item.id}
						contentContainerStyle={flatListStyle.content}
						numColumns={3}
						ListEmptyComponent={EmptyTrucks}
					/>
					<Footer>
						<FooterAddContainer>
							<FooterLabel>
								{t(TranslationsValues.button_label_home)}
							</FooterLabel>
							<ButtonIcon onPress={() => navigate(routeNames.AddTruck)}>
								<AntDesign name="pluscircle" size={50} color={colors.primary} />
							</ButtonIcon>
						</FooterAddContainer>
						<ButtonIcon onPress={() => setIsModalVisible(true)}>
							<AntDesign name="setting" size={50} color="#ccc" />
						</ButtonIcon>
					</Footer>
				</HomeContainer>
			</CloseMenuContainer>
			<Menu
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Container>
	);
};
