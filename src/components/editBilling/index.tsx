import React, { useCallback, useRef, useEffect } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { IState } from '@/store/types';
import Input, { IInputRef } from '@/components/input';
import EditTruckIcon from '@/icons/EditeIcon.png';
import { Button } from '@/components/button';
import { updateCurrentTruck } from '@/store/actions';
import {
	Container,
	Form,
	Image,
	ButtonContainer,
	Title,
	scrollView,
} from './styles';

interface IData {
	name: string;
	board: string;
}

interface IProps {
	closeModal(): void;
	id: string;
}

export const EditBilling: React.FC<IProps> = ({ closeModal, id }: IProps) => {
	const formRef = useRef<FormHandles>(null);
	const nextInputRef = useRef<IInputRef>(null);
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { truckRepository } = useDatabaseConnection();

	useEffect(() => {
		formRef.current.setData({
			name: current_truck.name,
			board: current_truck.board,
		});
	}, [current_truck.board, current_truck.name]);

	const handleSubmit: SubmitHandler<IData> = useCallback(
		async (data: IData, { reset }) => {
			try {
				const schema = Yup.object().shape({
					name: Yup.string().required('O nome é obrigatório'),
					board: Yup.string().required('A placa é obrigatório'),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
				const { name, board } = data;

				const updatedTruck = await truckRepository.editTruck({
					id: current_truck.id,
					name,
					board,
				});
				dispatch(updateCurrentTruck(updatedTruck));
				formRef.current.setErrors({});
				reset();
			} catch (error) {
				if (error instanceof Yup.ValidationError) {
					const errorMessages = {};
					error.inner.forEach(e => {
						errorMessages[e.path] = e.message;
					});
					formRef.current.setErrors(errorMessages);
				}
			}
		},
		[current_truck.id, dispatch, truckRepository],
	);

	const submit = useCallback(() => {
		formRef.current?.submitForm();
		closeModal();
	}, [closeModal]);

	return (
		<Container ontentContainerStyle={scrollView.content}>
			<Title>Você está editando o caminhão {current_truck.name}</Title>
			<Image source={EditTruckIcon} resizeMode="contain" />
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input
					name="name"
					label="Adicionar um nome para o caminhão"
					returnKeyType="next"
					maxLength={16}
					onSubmitEditing={() => nextInputRef.current?.focus()}
				/>
				<Input
					name="board"
					label="Adicionar a placa do caminhão"
					maxLength={12}
					returnKeyType="send"
					onSubmitEditing={submit}
					ref={nextInputRef}
				/>
			</Form>
			<ButtonContainer>
				<Button buttonLabel="Cancelar" onPress={closeModal} />
				<Button buttonLabel="Salvar" onPress={submit} next />
			</ButtonContainer>
		</Container>
	);
};
