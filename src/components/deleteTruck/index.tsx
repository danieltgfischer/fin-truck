import React, { useCallback } from 'react';
import { Button } from '@/components/button';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTruck, updateTrucks, updateYears } from '@/store/actions';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { IState } from '@/store/types';
import { ToastAndroid } from 'react-native';
import { Container, Label, ContainerButtons, Span } from './styles';

interface IProps {
	closeModal(): void;
}

export const DeleteTruck: React.FC<IProps> = ({ closeModal }: IProps) => {
	const navigation = useNavigation();
	const { truckRepository, billingRepository } = useDatabaseConnection();
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();

	const handleDeleteTruck = useCallback(async () => {
		const allBillings = await billingRepository.getAllBillingOptions({
			truckId: current_truck.id,
		});
		await billingRepository.deleteAllBillings(allBillings);
		await truckRepository.deleteTruck(current_truck.id);
		closeModal();
		const trucks = await truckRepository.getAllTrucks();
		dispatch(updateTrucks(trucks));
		navigation.navigate(routeNames.Home);
		ToastAndroid.showWithGravity(
			`O caminhão ${current_truck.name}/${current_truck.board} foi excluido`,
			ToastAndroid.LONG,
			ToastAndroid.CENTER,
		);
		dispatch(updateCurrentTruck(null));
		dispatch(updateYears([]));
	}, [
		billingRepository,
		closeModal,
		current_truck.board,
		current_truck.id,
		current_truck.name,
		dispatch,
		navigation,
		truckRepository,
	]);

	return (
		<Container>
			<Label>
				Você está prestes a excluir o caminhão <Span>{current_truck.name}</Span>
				.
			</Label>
			<Label>
				{' '}
				Todos registros desse caminhão serão apagados. Tem certeza disso?
			</Label>
			<ContainerButtons>
				<Button buttonLabel="Cancelar" onPress={closeModal} />
				<Button buttonLabel="Excluir" cancel onPress={handleDeleteTruck} />
			</ContainerButtons>
		</Container>
	);
};
