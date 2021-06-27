import React, { useCallback, useRef, useEffect } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import I18n from 'i18n-js';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { IState } from '@/store/types';
import Input, { IInputRef } from '@/components/input';
import EditTruckIcon from '@/icons/EditeIcon.png';
import { Button } from '@/components/button';
import { updateCurrentTruck } from '@/store/actions';
import { TranslationsValues } from '@/config/intl';
import { ToastAndroid } from 'react-native';
import {
	Container,
	Form,
	Image,
	ButtonContainer,
	Title,
	Span,
	scrollView,
} from './styles';

interface IData {
	name: string;
	board: string;
}

interface IProps {
	closeModal(): void;
}

export const EditTruck: React.FC<IProps> = ({ closeModal }: IProps) => {
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
					name: Yup.string().required(I18n.t(TranslationsValues.name_required)),
					board: Yup.string().required(
						I18n.t(TranslationsValues.board_required),
					),
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
				ToastAndroid.showWithGravityAndOffset(
					I18n.t(TranslationsValues.toast_edit_truck, { name, board }),
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM,
					0,
					150,
				);
				closeModal();
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
		[closeModal, current_truck.id, dispatch, truckRepository],
	);

	const submit = useCallback(() => {
		formRef.current?.submitForm();
	}, []);

	return (
		<Container ontentContainerStyle={scrollView.content}>
			<Title>
				{I18n.t(TranslationsValues.editing_truck_title)}{' '}
				<Span>{current_truck.name}</Span>
			</Title>
			<Image source={EditTruckIcon} resizeMode="contain" />
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input
					name="name"
					label={I18n.t(TranslationsValues.edit_truck_name_label)}
					returnKeyType="next"
					maxLength={16}
					onSubmitEditing={() => nextInputRef.current?.focus()}
				/>
				<Input
					name="board"
					label={I18n.t(TranslationsValues.edit_truck_board_label)}
					maxLength={12}
					returnKeyType="send"
					onSubmitEditing={submit}
					ref={nextInputRef}
				/>
			</Form>
			<ButtonContainer>
				<Button
					buttonLabel={I18n.t(TranslationsValues.cancel)}
					onPress={closeModal}
				/>
				<Button
					buttonLabel={I18n.t(TranslationsValues.save)}
					onPress={submit}
					next
				/>
			</ButtonContainer>
		</Container>
	);
};