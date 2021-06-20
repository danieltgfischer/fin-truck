import React, { useRef, useCallback } from 'react';
import Input, { IInputRef } from '@/components/input';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTruck } from '@/store/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import AddTruckIcon from '@/icons/CreateTruckIcon.png';
import { Button } from '@/components/button';
import { Container, Image, Form, scrollView, ButtonContainer } from './styles';

interface IData {
	name: string;
	board: string;
}

type ScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.AddTruck
>;

type Props = {
	navigation: ScreenNavigationProp;
};

export const AddTruckScreen: React.FC<Props> = ({ navigation }: Props) => {
	const formRef = useRef<FormHandles>(null);
	const nextInputRef = useRef<IInputRef>(null);
	const dispatch = useDispatch();
	const { truckRepository } = useDatabaseConnection();

	const navigate = useCallback(() => {
		navigation.navigate(routeNames.Home);
	}, [navigation]);

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
				const newTruck = await truckRepository.createTruck({ name, board });
				dispatch(addTruck(newTruck));
				formRef.current.setErrors({});
				reset();
				navigate();
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
		[dispatch, navigate, truckRepository],
	);

	const submit = useCallback(() => {
		formRef.current.submitForm();
	}, []);

	return (
		<>
			<Container contentContainerStyle={scrollView.content}>
				<Image source={AddTruckIcon} />
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input
						name="name"
						label="Adicionar um nome para o caminhão"
						returnKeyType="next"
						requiredLabel
						maxLength={16}
						onSubmitEditing={() => nextInputRef.current?.focus()}
					/>
					<Input
						name="board"
						label="Adicionar a placa do caminhão"
						maxLength={12}
						requiredLabel
						returnKeyType="send"
						onSubmitEditing={submit}
						ref={nextInputRef}
					/>
				</Form>
				<ButtonContainer>
					<Button onPress={navigate} buttonLabel="Cancelar" />
					<Button onPress={submit} buttonLabel="Adicionar" next />
				</ButtonContainer>
			</Container>
		</>
	);
};
