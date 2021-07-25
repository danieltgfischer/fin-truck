import React, { useCallback, useEffect, useState, useContext } from 'react';
import { ListRenderItemInfo, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import shortid from 'shortid';
import { setTestDeviceIDAsync, AdMobBanner } from 'expo-ads-admob';
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
	const [isLoading, setLoading] = useState(true);
	const { trucks } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const { truckRepository, isPremium } = useSerivces();
	const { colors } = useContext(ThemeContext);
	const { t } = useTranslation();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			truckRepository?.getAllTrucks().then(response => {
				dispatch(updateTrucks(response));
				setLoading(false);
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

	useEffect(() => {
		setTestDeviceIDAsync('EMULATOR');
	}, []);

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
	const isDark = theme.name === 'dark';
	const adUnitID =
		Constants.isDevice && !__DEV__
			? 'ca-app-pub-9490699886096845/2625998185'
			: 'ca-app-pub-3940256099942544/6300978111';

	return (
		<Container>
			<CloseMenuContainer onPress={closeAll}>
				<HomeContainer>
					{!isPremium && (
						<AdMobBanner
							bannerSize="banner"
							adUnitID={adUnitID}
							servePersonalizedAds
							onDidFailToReceiveAdWithError={e =>
								console.log('onDidFailToReceiveAdWithError', e)
							}
						/>
					)}
					<Title>{t(TranslationsValues.title_home)}:</Title>
					{isLoading && (
						<ActivityIndicator
							style={{ flex: 1 }}
							color={isDark ? theme.colors.text : '#B63B34'}
							size="small"
						/>
					)}
					{!isLoading && (
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item: ITruckItemProps) => item.id}
							contentContainerStyle={flatListStyle.content}
							numColumns={3}
							columnWrapperStyle={flatListStyle.collumnWrapper}
							ListEmptyComponent={EmptyTrucks}
						/>
					)}
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
