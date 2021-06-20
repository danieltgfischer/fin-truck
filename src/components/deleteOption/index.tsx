import React, { useCallback } from 'react';
import { Button } from '@/components/button';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch } from 'react-redux';
import { updateCurrentTruck } from '@/store/actions';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { Container, Label, ContainerButtons, Image, Value } from './styles';

interface IProps {
	closeModal(): void;
	id: string;
	source: string;
	value: number;
}

export const DeleteOption: React.FC<IProps> = ({
	closeModal,
	id,
	source,
	value,
}: IProps) => {
	const navigation = useNavigation();
	const { billingRepository } = useDatabaseConnection();
	const dispatch = useDispatch();

	const handleDeleteOption = useCallback(async () => {
		await billingRepository.deleteBilling(id);
		closeModal();
		// dispatch(updateTrucks(trucks)); TODO
		navigation.navigate(routeNames.Home);
		dispatch(updateCurrentTruck(null));
	}, [billingRepository, closeModal, dispatch, id, navigation]);

	return (
		<Container>
			<Image source={source} />
			<Label>Você está prestes a excluir este registro.</Label>
			<Label> Tem certeza disso?</Label>
			<Value>R$ {value}</Value>
			<ContainerButtons>
				<Button buttonLabel="Cancelar" onPress={closeModal} />
				<Button buttonLabel="Excluir" cancel onPress={handleDeleteOption} />
			</ContainerButtons>
		</Container>
	);
};
