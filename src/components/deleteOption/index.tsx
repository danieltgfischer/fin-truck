import React, { useCallback, useContext } from 'react';
import { Button } from '@/components/button';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeline } from '@/store/actions';
import { optionsObj } from '@/screens/truck/options';
import { ToastAndroid } from 'react-native';
import { IState } from '@/store/types';
import { MonthInfoContext } from '@/contexts/montInfo';
import {
	Container,
	Label,
	ContainerButtons,
	Image,
	Value,
	Description,
} from './styles';

interface IProps {
	closeModal(): void;
	id: string;
	source: string;
	description: string;
	value: number;
	option: string;
}

export const DeleteOption: React.FC<IProps> = ({
	closeModal,
	id,
	source,
	description,
	value,
	option,
}: IProps) => {
	const { billingRepository } = useDatabaseConnection();
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { label } = optionsObj[option];
	const { year, monthNumber } = useContext(MonthInfoContext);

	const updateTimelineOnEdit = useCallback(async () => {
		try {
			const { monthBillings, monthResume, yearResume, total_years } =
				await billingRepository.getTimelineYearAndMonthUpdated(
					current_truck.id,
					monthNumber,
					year,
				);
			dispatch(
				updateTimeline({
					monthBillings,
					monthResume,
					yearResume,
					total_years,
					year,
					month: monthNumber,
				}),
			);
		} catch (error) {
			throw new Error(error);
		}
	}, [billingRepository, current_truck.id, dispatch, monthNumber, year]);

	const handleDeleteOption = useCallback(async () => {
		await billingRepository.deleteBilling(id);
		closeModal();
		updateTimelineOnEdit();
		ToastAndroid.showWithGravityAndOffset(
			`Uma opção ${label} foi excluida`,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			0,
			150,
		);
	}, [billingRepository, closeModal, id, label, updateTimelineOnEdit]);

	return (
		<Container>
			<Image source={source} />
			<Label>
				Você está prestes a excluir este registro. Tem certeza disso?
			</Label>
			<Value>R$ {value}</Value>
			<Description>{description}</Description>
			<ContainerButtons>
				<Button buttonLabel="Cancelar" onPress={closeModal} />
				<Button buttonLabel="Excluir" cancel onPress={handleDeleteOption} />
			</ContainerButtons>
		</Container>
	);
};
