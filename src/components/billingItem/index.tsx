import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Modal, Animated, useWindowDimensions } from 'react-native';
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
	delay: number;
	index: number;
}

export const BillingItem: React.FC<IProps> = ({
	value,
	description,
	created_at,
	id,
	source,
	delay,
	index,
	option,
}: IProps) => {
	const { width } = useWindowDimensions();
	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { locale } = useSelector((state: IState) => state);
	const { t } = useTranslation();
	const timelineOpacity = useRef(new Animated.Value(0)).current;
	const translateXInfo = useRef(new Animated.Value(width)).current;
	const theme = useContext(ThemeContext);

	useEffect(() => {
		Animated.timing(timelineOpacity, {
			toValue: 1,
			duration: 2500,
			useNativeDriver: true,
			delay,
		}).start();
		Animated.timing(translateXInfo, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
			delay,
		}).start();
	}, [translateXInfo, timelineOpacity, delay]);
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
				<TimelineContainer
					style={{
						opacity: timelineOpacity,
					}}
				>
					<Line />
					<ImageContainer>
						<Image source={source} resizeMode="contain" />
					</ImageContainer>
				</TimelineContainer>
				<InfoContainer style={{ transform: [{ translateX: translateXInfo }] }}>
					<ContainerButtons>
						<ButtonIcon
							even={index % 2 === 0}
							onPress={() => setEditModalVisible(!isEditModalVisible)}
						>
							<SimpleLineIcons
								name="pencil"
								size={20}
								color={theme.colors.text}
							/>
						</ButtonIcon>
						<ButtonIcon
							onPress={() => setDeleteModalVisible(true)}
							even={index % 2 === 0}
						>
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
			<Modal visible={isEditModalVisible} animationType="slide">
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
