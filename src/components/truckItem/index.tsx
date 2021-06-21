import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import TruckIcon from '@/icons/TruckItemIcon.png';
import { routeNames } from '@/navigation/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch } from 'react-redux';
import { updateCurrentTruck } from '@/store/actions';
import { Board, Container, Name, Image } from './styles';

interface IProps {
	name: string;
	board: string;
	id: string;
}

export const TruckItem: React.FC<IProps> = ({ board, name, id }: IProps) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { truckRepository } = useDatabaseConnection();

	const navigate = useCallback(() => {
		navigation.navigate(routeNames.DrawerRoot);
	}, [navigation]);

	const updteCurrentTruck = useCallback(async () => {
		try {
			const truck = await truckRepository.getTruck(id);
			dispatch(updateCurrentTruck(truck));
			navigate();
		} catch (error) {
			console.error(error);
		}
	}, [dispatch, id, navigate, truckRepository]);

	return (
		<Container onPress={updteCurrentTruck}>
			<Name>{name}</Name>
			<Image source={TruckIcon} />
			<Board>{board}</Board>
		</Container>
	);
};
