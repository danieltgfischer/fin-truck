import React, {
	useRef,
	useCallback,
	useEffect,
	useState,
	useMemo,
} from 'react';
import { Modal, Animated, Dimensions, ToastAndroid } from 'react-native';
import Input from '@/components/input';
import MultiInput, { IInputRef } from '@/components/multipleInput ';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { Button } from '@/components/button';
import { IState } from '@/store/types';
import { RouteProp } from '@react-navigation/native';
import I18n from 'i18n-js';
import * as Styled from './styles';
import { optionsObj } from './options';

interface IData {
	value: number;
	description: string;
}

type ScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.AddOption
>;

type AddOptionScreenRouteProp = RouteProp<
	RootStackParamList,
	routeNames.AddOption
>;

type Props = {
	navigation: ScreenNavigationProp;
	route: AddOptionScreenRouteProp;
};

export const AddOptionScreen: React.FC<Props> = ({
	navigation,
	route,
}: Props) => {
	const { width } = Dimensions.get('window');
	const [isModalVisible, setModalVisible] = useState(false);
	const [step, setStep] = useState(0);
	const [formState, setFormState] = useState({});
	const { current_truck, locale } = useSelector((state: IState) => state);
	const formRef = useRef<FormHandles>(null);
	const nextInputRef = useRef<IInputRef>(null);
	const translateXForm = useRef(new Animated.Value(0)).current;
	const translateXReview = useRef(new Animated.Value(width)).current;
	const { billingRepository } = useDatabaseConnection();
	const title = current_truck?.name ?? '';
	const option = route?.params?.option ?? '';
	const { title: label } = optionsObj[option];
	useEffect(() => {
		navigation.addListener('focus', () => {
			navigation.setOptions({
				title,
			});
		});
	}, [navigation, title, current_truck]);

	useEffect(() => {
		formRef.current?.setData(formState);
	}, [formState, step, isModalVisible]);

	const navigate = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const goBack = useCallback(() => {
		if (step > 0) {
			Animated.timing(translateXForm, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
			Animated.timing(translateXReview, {
				toValue: width,
				duration: 500,
				useNativeDriver: true,
			}).start();
			setStep(0);
			return;
		}
		navigation.goBack();
	}, [navigation, step, translateXForm, translateXReview, width]);

	// do not remove deps
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const data = useMemo(() => formRef?.current?.getData(), [formState]);

	const createBillingOption = useCallback(async () => {
		try {
			const date = new Date();
			await billingRepository.createBillingOption({
				value: data?.value,
				description: data?.description ?? '',
				created_at: date,
				truck: current_truck,
				option,
				month: date.getMonth(),
				year: date.getFullYear(),
			});
			ToastAndroid.showWithGravityAndOffset(
				`Você registrou um valor em ${label}`,
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
				0,
				150,
			);
			formRef.current.reset();
			navigate();
		} catch (error) {
			throw new Error(error);
		}
	}, [
		billingRepository,
		current_truck,
		data?.description,
		data?.value,
		label,
		navigate,
		option,
	]);

	const animate = useCallback(() => {
		Animated.timing(translateXForm, {
			toValue: -width,
			duration: 500,
			useNativeDriver: true,
		}).start();
		Animated.timing(translateXReview, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [translateXForm, translateXReview, width]);

	const handleSubmit: SubmitHandler<IData> = useCallback(
		async (data: IData) => {
			if (step > 0) {
				createBillingOption();
				return;
			}
			try {
				console.log(data);
				const schema = Yup.object().shape({
					value: Yup.string().required('O valor é obrigatório'),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
				setFormState(formRef.current.getData());
				formRef.current.setErrors({});
				animate();
				setStep(1);
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
		[animate, createBillingOption, step],
	);

	const submit = useCallback(() => {
		formRef.current.submitForm();
	}, []);
	const countryCode = locale.country_code.split('-')[0];
	return (
		<>
			<Styled.Container contentContainerStyle={Styled.scrollView.content}>
				<Styled.ButtonHeaderContainer>
					<Styled.IconButton onPress={() => setModalVisible(!isModalVisible)}>
						<Feather name="help-circle" size={24} color="#b63b34" />
					</Styled.IconButton>
				</Styled.ButtonHeaderContainer>
				<Styled.Header>
					<Styled.Image
						source={optionsObj[option].source}
						resizeMode="contain"
					/>
					<Styled.Title>{optionsObj[option].title}</Styled.Title>
				</Styled.Header>
				<Styled.AnimetadeContainer>
					<Animated.View
						style={{
							transform: [{ translateX: translateXForm }],
						}}
					>
						<Styled.Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								numeric
								name="value"
								label="Adicione um valor para essa opção"
								returnKeyType="next"
								maxLength={16}
								currency
								keyboardType="numeric"
								requiredLabel
								onSubmitEditing={() => nextInputRef.current?.focus()}
							/>
							<MultiInput
								name="description"
								label="Adicione uma descrição para esse valor"
								maxLength={60}
								ref={nextInputRef}
							/>
						</Styled.Form>
					</Animated.View>
					<Styled.ReviewContainer
						style={{
							transform: [{ translateX: translateXReview }],
						}}
					>
						<Styled.Title>
							Por favor, revise se os valores estão corretos antes de adicionar:
						</Styled.Title>
						<Styled.ValueContainer>
							<Styled.Label>Valor:</Styled.Label>
							<Styled.Value>
								{I18n.toCurrency(
									data?.value,
									locale[countryCode].CURRENCY_FORMAT,
								)}
							</Styled.Value>
						</Styled.ValueContainer>
						<Styled.DescriptionContainer>
							<Styled.LabelDescription>Descrição:</Styled.LabelDescription>
							<Styled.Description>
								{data?.description
									? data?.description
									: 'Nenhuma descrição adicionada'}
							</Styled.Description>
						</Styled.DescriptionContainer>
					</Styled.ReviewContainer>
				</Styled.AnimetadeContainer>
				<Styled.ButtonContainer>
					<Button
						onPress={goBack}
						buttonLabel={step > 0 ? 'Editar' : 'Cancelar'}
					/>
					<Button
						onPress={submit}
						buttonLabel={step > 0 ? 'Salvar' : 'Adicionar'}
						next
					/>
				</Styled.ButtonContainer>
			</Styled.Container>
			<Modal visible={isModalVisible} animationType="fade">
				<Styled.ModalContainer>
					<Styled.Title>{optionsObj[option].title}</Styled.Title>
					<Styled.ModalImage
						source={optionsObj[option].source}
						resizeMode="stretch"
					/>
					<Styled.ModalDescription>
						{optionsObj[option].description}
					</Styled.ModalDescription>
					<Button
						onPress={() => setModalVisible(!isModalVisible)}
						buttonLabel="Fechar"
					/>
				</Styled.ModalContainer>
			</Modal>
		</>
	);
};
