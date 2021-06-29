import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import TruckIcon from '@/icons/TruckItemIcon.png';
import DarkTruckIcon from '@/icons/DarkTruckIcon.png';
import { routeNames } from '@/navigation/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch } from 'react-redux';
import { updateCurrentTruck } from '@/store/actions';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Board, Container, Name, Image } from './styles';

export interface ITruckItemProps {
	name: string;
	board: string;
	id: string;
	empty?: boolean;
}

export const TruckItem: React.FC<ITruckItemProps> = ({
	board,
	name,
	id,
}: ITruckItemProps) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { truckRepository } = useDatabaseConnection();
	const theme = useContext(ThemeContext);
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
			<Image source={theme.name === 'dark' ? DarkTruckIcon : TruckIcon} />
			<Board>{board}</Board>
		</Container>
	);
};
