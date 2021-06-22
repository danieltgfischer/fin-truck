import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import React, { useRef, useState, useEffect } from 'react';
import { Modal, Animated, useWindowDimensions } from 'react-native';
import { format } from 'date-fns';
import usLocale from 'date-fns/locale/en-US';
import ptLocale from 'date-fns/locale/pt-BR';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Modal as StyledModal } from '@/components/modal';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
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
}: IProps) => {
	const { width } = useWindowDimensions();
	const containerRef = useRef(0);
	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { locale: localeApp } = useSelector((state: IState) => state);
	const timelineOpacity = useRef(new Animated.Value(0)).current;
	const translateXInfo = useRef(new Animated.Value(width)).current;

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
		localeApp === 'pt-BR' ? "'Dia' d',' EEEE 'às ' HH:mm " : 'DD:MM a';
	const locale = localeApp === 'pt-BR' ? ptLocale : usLocale;

	return (
		<>
			<Container ref={containerRef} even={index % 2 === 0}>
				<TimelineContainer
					style={{
						opacity: timelineOpacity,
					}}
				>
					<Line />
					<ImageContainer>
						<Image source={source} />
					</ImageContainer>
				</TimelineContainer>
				<InfoContainer style={{ transform: [{ translateX: translateXInfo }] }}>
					<ContainerButtons>
						<ButtonIcon
							onPress={() => setEditModalVisible(!isEditModalVisible)}
						>
							<SimpleLineIcons name="pencil" size={20} color="#333" />
						</ButtonIcon>
						<ButtonIcon onPress={() => console.log('del')}>
							<FontAwesome5 name="trash-alt" size={20} color="#afafaf" />
						</ButtonIcon>
					</ContainerButtons>
					<Date>{format(created_at, localeFormat, { locale })}</Date>
					<Value>R$ {value}</Value>
					<Description>{description}</Description>
				</InfoContainer>
			</Container>
			<Modal visible={isEditModalVisible} animationType="slide">
				<EditBilling closeModal={() => setEditModalVisible(false)} id={id} />
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
					source={source}
				/>
			</StyledModal>
		</>
	);
};
