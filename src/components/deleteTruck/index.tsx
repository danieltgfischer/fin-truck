import React, { useCallback } from 'react';
import { Button } from '@/components/button';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTruck, updateTrucks, updateYears } from '@/store/actions';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { IState } from '@/store/types';
import { ToastAndroid } from 'react-native';
import { TranslationsValues } from '@/config/intl';
import I18n from 'i18n-js';
import { Container, Label, ContainerButtons, Span } from './styles';

interface IProps {
	closeModal(): void;
}

export const DeleteTruck: React.FC<IProps> = ({ closeModal }: IProps) => {
	const navigation = useNavigation();
	const { truckRepository, billingRepository } = useDatabaseConnection();
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { name, board } = current_truck;
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
		ToastAndroid.showWithGravityAndOffset(
			I18n.t(TranslationsValues.toast_delete_truck, { name, board }),
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			0,
			150,
		);
		dispatch(updateCurrentTruck(null));
		dispatch(updateYears([]));
	}, [
		billingRepository,
		board,
		closeModal,
		current_truck.id,
		dispatch,
		name,
		navigation,
		truckRepository,
	]);

	return (
		<Container>
			<Label>
				{I18n.t(TranslationsValues.delete_truck_warning)}{' '}
				<Span>{current_truck.name}</Span>.
			</Label>
			<Label> {I18n.t(TranslationsValues.delete_truck_warning2)}</Label>
			<ContainerButtons>
				<Button
					buttonLabel={I18n.t(TranslationsValues.cancel)}
					onPress={closeModal}
				/>
				<Button
					buttonLabel={I18n.t(TranslationsValues.delete)}
					cancel
					onPress={handleDeleteTruck}
				/>
			</ContainerButtons>
		</Container>
	);
};
