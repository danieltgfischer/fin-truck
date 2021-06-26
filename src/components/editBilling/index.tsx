import React, { useCallback, useRef, useEffect, useContext } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { IState } from '@/store/types';
import Input from '@/components/input';
import MultiInput, { IInputRef } from '@/components/multipleInput ';

import { Button } from '@/components/button';
import { optionsObj } from '@/screens/truck/options';
import { updateTimeline } from '@/store/actions';
import { Animated, ToastAndroid } from 'react-native';
import { MonthInfoContext } from '@/contexts/montInfo';
import {
	Container,
	Form,
	Image,
	ButtonContainer,
	Title,
	scrollView,
} from './styles';

interface IData {
	value: string;
	description: string;
}

interface IProps {
	closeModal(): void;
	id: string;
	option: string;
	value: number;
	description: string;
}

export const EditBilling: React.FC<IProps> = ({
	closeModal,
	id,
	option,
	value,
	description,
}: IProps) => {
	const formRef = useRef<FormHandles>(null);
	const nextInputRef = useRef<IInputRef>(null);
	const warningOpacity = useRef(new Animated.Value(0)).current;
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { year, monthNumber } = useContext(MonthInfoContext);
	const { billingRepository } = useDatabaseConnection();
	const { source, label } = optionsObj[option];

	useEffect(() => {
		Animated.timing(warningOpacity, {
			toValue: 1,
			duration: 500,
			delay: 500,
			useNativeDriver: true,
		}).start();
	}, [warningOpacity]);

	useEffect(() => {
		formRef.current.setData({
			value: String(value),
			description,
		});
	}, [value, description]);

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

	const handleSubmit: SubmitHandler<IData> = useCallback(
		async (data: IData, { reset }) => {
			try {
				const schema = Yup.object().shape({
					value: Yup.string().required('O valor é obrigatório'),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
				const { value, description } = data;
				await billingRepository.editTruck({
					id,
					value: Number(value),
					description,
				});
				updateTimelineOnEdit();
				formRef.current.setErrors({});
				reset();
				closeModal();
				ToastAndroid.showWithGravityAndOffset(
					`Uma opção ${label} foi atualizada`,
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM,
					0,
					150,
				);
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
		[billingRepository, closeModal, id, label, updateTimelineOnEdit],
	);

	const submit = useCallback(() => {
		formRef.current?.submitForm();
	}, []);

	return (
		<Container ontentContainerStyle={scrollView.content}>
			<Title>Você está editando um registro para {label}</Title>
			<Image source={source} resizeMode="contain" />
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input
					name="value"
					label="Editar o valor para essa opção"
					numeric
					currency
					returnKeyType="next"
					maxLength={16}
					keyboardType="numeric"
					requiredLabel
					onSubmitEditing={() => nextInputRef.current?.focus()}
				/>
				<MultiInput
					name="description"
					label="Editar a descrição para esse valor"
					maxLength={60}
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
