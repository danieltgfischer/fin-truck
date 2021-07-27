import React, { useCallback, useMemo, useState, useContext } from 'react';
import { ListRenderItem, Modal } from 'react-native';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import shortid from 'shortid';
import OptionItem, { IOptionItem } from '@/components/optionItem';
import { routeNames, DrawerParamList } from '@/navigation/types';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import Timeline from '@/icons/Timeline.png';
import TimelineLight from '@/icons/TimelineLight.png';
import { EditTruck } from '@/components/editTruck';
import { Modal as StyledModal } from '@/components/modal';
import { DeleteTruck } from '@/components/deleteTruck';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import { useSerivces } from '@/hooks/useServices';
import { ModalConnection } from '@/components/modalConnection';
import { ID_BANNER_PRODUCTION, ID_BANNER_DEV } from 'react-native-dotenv';
import { Purchase } from '@/components/purchase';
import { AdMobBanner } from 'expo-ads-admob';
import {
	Container,
	FlatList,
	flatListStyle,
	Title,
	ButtonIcon,
	ContainerButtons,
	HistoryButton,
	HistoryLabel,
	Image,
	RightView,
} from './styles';
import { IOptionsObj, optionsObj } from './options';

type TruckScreenNavigationProp = StackNavigationProp<
	DrawerParamList,
	routeNames.Truck
>;

type Props = {
	navigation: TruckScreenNavigationProp;
};

export const TruckScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isModalConnectionVisible, setModalConnectionVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const [animationDone, setAniamtionDone] = useState(false);
	const { t } = useTranslation();
	const serviceCtx = useSerivces();
	const theme = useContext(ThemeContext);

	const renderItem: ListRenderItem<IOptionItem> = ({
		item: { source, big_name, value, source_light },
		index,
	}) => {
		return (
			<OptionItem
				source={source}
				source_light={source_light}
				big_name={big_name}
				value={value}
				animationDone={animationDone}
				setAniamtionDone={setAniamtionDone}
				index={index}
				delay={index * 150}
			/>
		);
	};

	const navigate = useCallback(
		path => {
			navigation.navigate(path);
		},
		[navigation],
	);

	const data: IOptionsObj[] = useMemo(
		() =>
			Object.keys(optionsObj).reduce((acc, curr) => {
				acc.push(optionsObj[curr]);
				return acc;
			}, []),
		[],
	);

	const openEditModal = useCallback(() => {
		if (
			(!serviceCtx.isNetworkConnected ||
				!serviceCtx.isPurchaseStoreConnected) &&
			!serviceCtx.isPremium
		) {
			setModalConnectionVisible(true);
			return;
		}
		if (!serviceCtx.isPremium) {
			serviceCtx.setIsPurchaselVisible(true);
			return;
		}
		setEditModalVisible(true);
	}, [serviceCtx]);

	const isDark = theme.name === 'dark';
	const adUnitID =
		Constants.isDevice && !__DEV__ ? ID_BANNER_PRODUCTION : ID_BANNER_DEV;

	return (
		<>
			<Container>
				<ContainerButtons>
					<HistoryButton onPress={() => navigate(routeNames.Timeline)}>
						<Image
							source={isDark ? TimelineLight : Timeline}
							resizeMode="contain"
						/>
						<HistoryLabel>{t('history')}</HistoryLabel>
					</HistoryButton>
					<RightView>
						<ButtonIcon onPress={openEditModal}>
							<SimpleLineIcons
								name="pencil"
								size={20}
								color={theme.colors.text}
							/>
						</ButtonIcon>
						<ButtonIcon onPress={() => setDeleteModalVisible(true)}>
							<FontAwesome5
								name="trash-alt"
								size={20}
								color={theme.colors.text}
							/>
						</ButtonIcon>
					</RightView>
				</ContainerButtons>
				<Title>{t('title_truck')}:</Title>
				<FlatList
					focusable
					data={data}
					renderItem={renderItem}
					keyExtractor={() => shortid()}
					contentContainerStyle={flatListStyle.content}
					numColumns={3}
					columnWrapperStyle={flatListStyle.collumnWrapper}
				/>
				{!serviceCtx.isPremium && animationDone && (
					<AdMobBanner
						style={{
							paddingTop: 15,
							alignSelf: 'center',
						}}
						bannerSize="banner"
						adUnitID={adUnitID}
						servePersonalizedAds
						onDidFailToReceiveAdWithError={e =>
							console.log('onDidFailToReceiveAdWithError', e)
						}
					/>
				)}
				<Purchase
					isPurchaselVisible={serviceCtx.isPurchaselVisible}
					setIsPurchaselVisible={serviceCtx.setIsPurchaselVisible}
					enableFeature={() => setEditModalVisible(true)}
				/>
			</Container>
			<Modal visible={isEditModalVisible} animationType="slide">
				<EditTruck closeModal={() => setEditModalVisible(false)} />
			</Modal>
			<StyledModal
				visible={isDeleteModalVisible}
				animationType="fade"
				statusBarTranslucent
				transparent
			>
				<DeleteTruck closeModal={() => setDeleteModalVisible(false)} />
			</StyledModal>
			<ModalConnection
				visible={isModalConnectionVisible}
				setIsVisible={setModalConnectionVisible}
			/>
		</>
	);
};
