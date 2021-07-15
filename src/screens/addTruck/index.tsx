import React, { useRef, useCallback, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import Input, { IInputRef } from '@/components/input';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTruck } from '@/store/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { useSerivces } from '@/hooks/useServices';
import AddTruckIcon from '@/icons/CreateTruckIcon.png';
import { Button } from '@/components/button';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { Purchase } from '@/components/purchase';
import { IState } from '@/store/types';
import {
	Container,
	AddTruckContainer,
	Image,
	Form,
	scrollView,
	ButtonContainer,
} from './styles';

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
	const [isPurchaselVisible, setIsPurchaselVisible] = useState(false);
	const [enablePurchase, setEnablePurchase] = useState(false);
	const formRef = useRef<FormHandles>(null);
	const nextInputRef = useRef<IInputRef>(null);
	const { trucks } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { truckRepository } = useSerivces();
	const { t } = useTranslation();

	const navigate = useCallback(() => {
		navigation.navigate(routeNames.Home);
	}, [navigation]);
	const handleSubmit: SubmitHandler<IData> = useCallback(
		async (data: IData, { reset }) => {
			try {
				const schema = Yup.object().shape({
					name: Yup.string().required(t(TranslationsValues.name_required)),
					board: Yup.string().required(t(TranslationsValues.board_required)),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
				const { name, board } = data;
				// buy
				if (trucks.length > 0 && !enablePurchase) {
					setIsPurchaselVisible(true);
					return;
				}
				const newTruck = await truckRepository.createTruck({ name, board });
				dispatch(addTruck(newTruck));
				formRef.current.setErrors({});
				reset();
				ToastAndroid.showWithGravityAndOffset(
					t(TranslationsValues.toast_add_truck, { name, board }),
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
		[dispatch, enablePurchase, navigate, t, truckRepository, trucks.length],
	);

	const submit = useCallback(() => {
		formRef.current.submitForm();
	}, []);

	return (
		<Container>
			<AddTruckContainer contentContainerStyle={scrollView.content}>
				<Image source={AddTruckIcon} />
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input
						name="name"
						label={t(TranslationsValues.add_name_truck_label)}
						returnKeyType="next"
						requiredLabel
						maxLength={16}
						onSubmitEditing={() => nextInputRef.current?.focus()}
					/>
					<Input
						name="board"
						label={t(TranslationsValues.add_board_truck_label)}
						maxLength={12}
						requiredLabel
						returnKeyType="send"
						onSubmitEditing={submit}
						ref={nextInputRef}
					/>
				</Form>
				<ButtonContainer>
					<Button
						onPress={navigate}
						buttonLabel={t(TranslationsValues.cancel)}
					/>
					<Button
						onPress={submit}
						buttonLabel={t(TranslationsValues.add)}
						next
					/>
				</ButtonContainer>
			</AddTruckContainer>
			<Purchase
				productId="1_add_truck_fin_truck"
				upgradeId="1_premium_fin_truck"
				donateId="1_donate_fin_truck"
				// productId="android.test.purchased"
				// upgradeId="android.test.canceled"
				// donateId="android.test.refunded"
				setEnablePurchase={setEnablePurchase}
				isPurchaselVisible={isPurchaselVisible}
				setIsPurchaselVisible={setIsPurchaselVisible}
			/>
		</Container>
	);
};
