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
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
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
	const { source, label, value: optionValue } = optionsObj[option];

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
					value: Yup.string().required(
						I18n.t(TranslationsValues.value_required),
					),
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
					I18n.t(TranslationsValues.toast_edit_option, {
						value: I18n.t(optionValue),
					}),
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
		[billingRepository, closeModal, id, optionValue, updateTimelineOnEdit],
	);

	const submit = useCallback(() => {
		formRef.current?.submitForm();
	}, []);

	return (
		<Container ontentContainerStyle={scrollView.content}>
			<Title>
				{I18n.t(TranslationsValues.edit_option_title, {
					value: I18n.t(optionValue),
				})}
			</Title>
			<Image source={source} resizeMode="contain" />
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input
					name="value"
					label={I18n.t(TranslationsValues.edit_option_value_label)}
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
					label={I18n.t(TranslationsValues.edit_option_description_label)}
					maxLength={60}
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
