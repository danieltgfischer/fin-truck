import React, {
	useRef,
	useCallback,
	useEffect,
	useState,
	useContext,
	useMemo,
} from 'react';
import {
	Modal,
	Animated,
	Dimensions,
	ToastAndroid,
	useWindowDimensions,
} from 'react-native';
import Input from '@/components/input';
import Constants from 'expo-constants';
import MultiInput, { IInputRef } from '@/components/multipleInput ';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { routeNames, RootStackParamList } from '@/navigation/types';
import { useSerivces } from '@/hooks/useServices';
import { Button } from '@/components/button';
import { IState } from '@/store/types';
import { RouteProp } from '@react-navigation/native';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { ID_BANNER_PRODUCTION, ID_BANNER_DEV } from 'react-native-dotenv';
import { ThemeContext } from 'styled-components/native';
import { AdMobBanner } from 'expo-ads-admob';
import * as _ from './styles';
import { optionsObj } from './options';
import { monthsNames } from './months';

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
	const { billingRepository, isPremium } = useSerivces();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const { height } = useWindowDimensions();

	const title = current_truck?.name ?? '';
	const option = route?.params?.option ?? '';
	const { value } = optionsObj[option];

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
			// const date = new Date(2022, 0, 1);
			const date = new Date();
			const monthNumber = date.getMonth();
			const monthName = monthsNames[monthNumber][locale.country_code];
			await billingRepository.createBillingOption({
				value: data?.value,
				description: data?.description ?? '',
				created_at: date,
				truck: current_truck,
				option,
				month: monthNumber,
				monthName,
				year: date.getFullYear(),
			});
			ToastAndroid.showWithGravityAndOffset(
				t(TranslationsValues.toast_add_option, { value: t(value) }),
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
		locale.country_code,
		navigate,
		option,
		t,
		value,
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
				const schema = Yup.object().shape({
					value: Yup.string().required(t(TranslationsValues.value_required)),
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
		[animate, createBillingOption, step, t],
	);

	const openHelp = useCallback(() => {
		formRef.current.reset();
		setModalVisible(true);
	}, []);

	const submit = useCallback(() => {
		formRef.current.submitForm();
	}, []);

	const { currency } = locale[locale.country_code];
	const isDark = theme.name === 'dark';
	const adUnitID =
		Constants.isDevice && !__DEV__ ? ID_BANNER_PRODUCTION : ID_BANNER_DEV;

	return (
		<>
			<_.Container contentContainerStyle={_.scrollView.content}>
				{!isPremium && (
					<AdMobBanner
						style={{
							maxWidth: '100%',
						}}
						bannerSize="banner"
						adUnitID={adUnitID}
						servePersonalizedAds
						onDidFailToReceiveAdWithError={e =>
							console.log('onDidFailToReceiveAdWithError', e)
						}
					/>
				)}
				<_.ButtonHeaderContainer>
					<_.IconButton onPress={openHelp}>
						<Feather
							name="help-circle"
							size={24}
							color={isDark ? theme.colors.text : '#b63b34'}
						/>
					</_.IconButton>
				</_.ButtonHeaderContainer>
				<_.Header>
					<_.Image
						source={
							isDark
								? optionsObj[option].source_light
								: optionsObj[option].source
						}
						resizeMode="contain"
					/>
					<_.Title>{t(value)}</_.Title>
				</_.Header>
				<_.AnimetadeContainer>
					<Animated.View
						style={{
							transform: [{ translateX: translateXForm }],
						}}
					>
						<_.Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								numeric
								name="value"
								label={t(TranslationsValues.add_option_value_label)}
								returnKeyType="next"
								maxLength={16}
								currency
								keyboardType="numeric"
								requiredLabel
								onSubmitEditing={() => nextInputRef.current?.focus()}
							/>
							<MultiInput
								name="description"
								label={t(TranslationsValues.add_option_description_label)}
								maxLength={60}
								ref={nextInputRef}
							/>
						</_.Form>
					</Animated.View>
					<_.ReviewContainer
						style={{
							transform: [{ translateX: translateXReview }],
						}}
					>
						<_.Title>{t(TranslationsValues.review_title)}:</_.Title>
						<_.ValueContainer>
							<_.Label>{t(TranslationsValues.value)}:</_.Label>
							<_.Value>
								{new Intl.NumberFormat(locale.country_code, {
									style: 'currency',
									currency,
								}).format(data?.value)}
							</_.Value>
						</_.ValueContainer>
						<_.DescriptionContainer>
							<_.LabelDescription>
								{t(TranslationsValues.description)}:
							</_.LabelDescription>
							<_.Description>
								{data?.description
									? data?.description
									: t(TranslationsValues.empty_description)}
							</_.Description>
						</_.DescriptionContainer>
					</_.ReviewContainer>
				</_.AnimetadeContainer>
				<_.ButtonContainer>
					<Button
						onPress={goBack}
						buttonLabel={
							step > 0
								? t(TranslationsValues.edit)
								: t(TranslationsValues.cancel)
						}
					/>
					<Button
						onPress={submit}
						buttonLabel={
							step > 0 ? t(TranslationsValues.save) : t(TranslationsValues.add)
						}
						next
					/>
				</_.ButtonContainer>
				{!isPremium && height > 810 && (
					<AdMobBanner
						style={{
							top: 20,
						}}
						bannerSize="largeBanner"
						adUnitID={adUnitID}
						servePersonalizedAds
						onDidFailToReceiveAdWithError={e =>
							console.log('onDidFailToReceiveAdWithError', e)
						}
					/>
				)}
			</_.Container>
			<Modal visible={isModalVisible} animationType="fade" statusBarTranslucent>
				<_.ModalContainer contentContainerStyle={_.scrollView.modalContainer}>
					<_.Title>{t(value)}</_.Title>
					<_.ModalImage
						resizeMode="stretch"
						source={
							isDark
								? optionsObj[option].source_light
								: optionsObj[option].source
						}
					/>
					{!isPremium && (
						<AdMobBanner
							style={{
								marginBottom: 10,
							}}
							bannerSize="largeBanner"
							adUnitID={adUnitID}
							servePersonalizedAds
							onDidFailToReceiveAdWithError={e =>
								console.log('onDidFailToReceiveAdWithError', e)
							}
						/>
					)}
					<_.ModalDescription>{t(`${value}_description`)}</_.ModalDescription>
					<Button
						onPress={() => setModalVisible(!isModalVisible)}
						buttonLabel={t(TranslationsValues.close)}
					/>
				</_.ModalContainer>
			</Modal>
		</>
	);
};
