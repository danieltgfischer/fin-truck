import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import React, { useState, useContext, useCallback } from 'react';
import { Modal } from 'react-native';
import { format } from 'date-fns';
import usLocale from 'date-fns/locale/en-US';
import ptLocale from 'date-fns/locale/pt-BR';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Modal as StyledModal } from '@/components/modal';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import { TimelineModalContext } from '@/contexts/timelineModal';
import { useSerivces } from '@/hooks/useServices';
import { EditBilling } from '../editBilling';
import { DeleteOption } from '../deleteOption';
import {
	Container,
	TimelineContainer,
	Line,
	Image,
	InfoContainer,
	ImageContainer,
	Date,
	Description,
	Value,
	ButtonIcon,
	ContainerButtons,
} from './styles';

interface IProps {
	value: number;
	description: string;
	created_at: Date;
	source: string;
	id: string;
	option: string;
	index: number;
}

export const BillingItem: React.FC<IProps> = ({
	value,
	description,
	created_at,
	id,
	source,
	index,
	option,
}: IProps) => {
	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { locale } = useSelector((state: IState) => state);
	const { t } = useTranslation();
	const { isNetworkConnected, isPremium, isPurchaseStoreConnected } =
		useSerivces();
	const theme = useContext(ThemeContext);
	const timelineCtx = useContext(TimelineModalContext);

	const editBilling = useCallback(() => {
		if ((!isNetworkConnected || !isPurchaseStoreConnected) && !isPremium) {
			timelineCtx.setModalConnectionVisible(true);
			return;
		}
		if (!isPremium) {
			timelineCtx.setIsPurchaselVisible(true);
			return;
		}
		setEditModalVisible(true);
	}, [isNetworkConnected, isPremium, isPurchaseStoreConnected, timelineCtx]);

	const deleteBilling = useCallback(() => {
		if ((!isNetworkConnected || !isPurchaseStoreConnected) && !isPremium) {
			timelineCtx.setModalConnectionVisible(true);
			return;
		}
		if (!isPremium) {
			timelineCtx.setIsPurchaselVisible(true);
			return;
		}
		setDeleteModalVisible(true);
	}, []);

	const localeFormat =
		locale.country_code === 'pt-BR'
			? "'Dia' d',' EEEE 'às' HH:mm "
			: "'Day' d',' EEEE 'at' HH:mm aaaa";
	const dateLocale = locale.country_code === 'pt-BR' ? ptLocale : usLocale;
	const descriptionWithValue =
		description !== '' ? description : t(TranslationsValues.empty_description);
	const { currency } = locale[locale.country_code];

	return (
		<>
			<Container even={index % 2 === 0}>
				<TimelineContainer>
					<Line />
					<ImageContainer>
						<Image source={source} resizeMode="contain" />
					</ImageContainer>
				</TimelineContainer>
				<InfoContainer>
					<ContainerButtons>
						<ButtonIcon even={index % 2 === 0} onPress={editBilling}>
							<SimpleLineIcons
								name="pencil"
								size={20}
								color={theme.colors.text}
							/>
						</ButtonIcon>
						<ButtonIcon onPress={deleteBilling} even={index % 2 === 0}>
							<FontAwesome5
								name="trash-alt"
								size={20}
								color={theme.colors.text}
							/>
						</ButtonIcon>
					</ContainerButtons>
					<Date>
						{format(created_at, localeFormat, { locale: dateLocale })}
					</Date>
					<Value>
						{new Intl.NumberFormat(locale.country_code, {
							style: 'currency',
							currency,
						}).format(value)}
					</Value>
					<Description>{descriptionWithValue}</Description>
				</InfoContainer>
			</Container>
			<Modal
				visible={isEditModalVisible}
				animationType="slide"
				statusBarTranslucent
			>
				<EditBilling
					closeModal={() => setEditModalVisible(false)}
					id={id}
					option={option}
					value={value}
					description={description}
				/>
			</Modal>
			<StyledModal
				visible={isDeleteModalVisible}
				animationType="fade"
				statusBarTranslucent
				transparent
			>
				<DeleteOption
					closeModal={() => setDeleteModalVisible(false)}
					id={id}
					value={value}
					option={option}
					description={description}
					source={source}
				/>
			</StyledModal>
		</>
	);
};
