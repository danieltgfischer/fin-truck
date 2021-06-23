import React, { useCallback, useMemo, useState } from 'react';
import { Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OptionItem } from '@/components/optionItem';
import { routeNames, DrawerParamList } from '@/navigation/types';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import Timeline from '@/icons/Timeline.png';
import { EditForm } from '@/components/editForm';
import { Modal as StyledModal } from '@/components/modal';
import { DeleteTruck } from '@/components/deleteTruck';
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
import { optionsObj } from './options';

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

	const renderItem = ({ item: { label, source, big_name, value }, index }) => {
		return (
			<OptionItem
				source={source}
				label={label}
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

	const data = useMemo(
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

	return (
		<>
			<Container>
				<ContainerButtons>
					<HistoryButton onPress={() => navigate(routeNames.Timeline)}>
						<Image source={Timeline} resizeMode="contain" />
						<HistoryLabel>Histórico</HistoryLabel>
					</HistoryButton>
					<RightView>
						<ButtonIcon onPress={openEditModal}>
							<SimpleLineIcons name="pencil" size={20} color="#333" />
						</ButtonIcon>
						<ButtonIcon onPress={() => setDeleteModalVisible(true)}>
							<FontAwesome5 name="trash-alt" size={20} color="#afafaf" />
						</ButtonIcon>
					</RightView>
				</ContainerButtons>
				<Title>Escolha qual opção deseja adicionar à contabilidade:</Title>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={item => String(item.label)}
					contentContainerStyle={flatListStyle.content}
					numColumns={3}
				/>
			</Container>
			<Modal visible={isEditModalVisible} animationType="slide">
				<EditForm closeModal={() => setEditModalVisible(false)} />
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
