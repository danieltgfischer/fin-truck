import React, { useCallback, useMemo, useState, useContext } from 'react';
import { ListRenderItem, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import shortid from 'shortid';
import { IOptionItem, OptionItem } from '@/components/optionItem';
import { routeNames, DrawerParamList } from '@/navigation/types';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import Timeline from '@/icons/Timeline.png';
import TimelineLight from '@/icons/TimelineLight.png';
import { EditTruck } from '@/components/editTruck';
import { Modal as StyledModal } from '@/components/modal';
import { DeleteTruck } from '@/components/deleteTruck';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
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
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { t } = useTranslation();
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
		setEditModalVisible(true);
	}, []);

	const isDark = theme.name === 'dark';

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
					data={data}
					renderItem={renderItem}
					keyExtractor={() => shortid()}
					contentContainerStyle={flatListStyle.content}
					numColumns={3}
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
		</>
	);
};
