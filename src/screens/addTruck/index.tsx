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
import { ToastAndroid } from 'react-native';
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
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
					name: Yup.string().required(I18n.t(TranslationsValues.name_required)),
					board: Yup.string().required(
						I18n.t(TranslationsValues.board_required),
					),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
				const { name, board } = data;
				const newTruck = await truckRepository.createTruck({ name, board });
				dispatch(addTruck(newTruck));
				formRef.current.setErrors({});
				reset();
				ToastAndroid.showWithGravityAndOffset(
					I18n.t(TranslationsValues.toast_add_truck, { name, board }),
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM,
					0,
					150,
				);
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
						label={I18n.t(TranslationsValues.add_name_truck_label)}
						returnKeyType="next"
						requiredLabel
						maxLength={16}
						onSubmitEditing={() => nextInputRef.current?.focus()}
					/>
					<Input
						name="board"
						label={I18n.t(TranslationsValues.add_board_truck_label)}
						maxLength={12}
						requiredLabel
						returnKeyType="send"
						onSubmitEditing={submit}
						ref={nextInputRef}
					/>
				</Form>
				<ButtonContainer>
					<Button onPress={navigate} buttonLabel={I18n.t('cancel')} />
					<Button onPress={submit} buttonLabel={I18n.t('add')} next />
				</ButtonContainer>
			</Container>
		</>
	);
};
