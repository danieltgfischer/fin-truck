import React, { useCallback, useContext } from 'react';
import { Button } from '@/components/button';
import { useSerivces } from '@/hooks/useServices';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeline } from '@/store/actions';
import { optionsObj } from '@/screens/truck/options';
import { ToastAndroid } from 'react-native';
import { IState } from '@/store/types';
import { MonthInfoContext } from '@/contexts/montInfo';
import { TranslationsValues } from '@/config/intl';

import { useTranslation } from 'react-i18next';
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
	const { billingRepository } = useSerivces();
	const { current_truck } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { value: optionValue } = optionsObj[option];
	const { year, monthNumber } = useContext(MonthInfoContext);
	const { t } = useTranslation();

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
			t(TranslationsValues.toast_delete_option, {
				value: t(optionValue),
			}),
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			0,
			150,
		);
	}, [billingRepository, closeModal, id, optionValue, t, updateTimelineOnEdit]);

	return (
		<Container>
			<Image source={source} resizeMode="contain" />
			<Label>{t(TranslationsValues.delete_option_title)}</Label>
			<Value>R$ {value}</Value>
			<Description>{description}</Description>
			<ContainerButtons>
				<Button
					buttonLabel={t(TranslationsValues.cancel)}
					onPress={closeModal}
				/>
				<Button
					buttonLabel={t(TranslationsValues.delete)}
					cancel
					onPress={handleDeleteOption}
				/>
			</ContainerButtons>
		</Container>
	);
};
