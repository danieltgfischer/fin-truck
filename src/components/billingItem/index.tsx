import React, { useRef, useState } from 'react';
import { Modal, Animated, useWindowDimensions, Easing } from 'react-native';
import { format } from 'date-fns';
import usLocale from 'date-fns/locale/en-US';
import ptLocale from 'date-fns/locale/pt-BR';
import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Modal as StyledModal } from '@/components/modal';
import { useEffect } from 'react';
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

	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { locale: localeApp } = useSelector((state: IState) => state);
	const timelineOpacity = useRef(new Animated.Value(0)).current;
	const translateXInfo = useRef(new Animated.Value(width * 0.7)).current;

	useEffect(() => {
		Animated.timing(timelineOpacity, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
			delay,
		}).start();
		Animated.timing(translateXInfo, {
			toValue: 0,
			duration: 850,
			useNativeDriver: true,
			delay,
		}).start();
	}, [translateXInfo, timelineOpacity, delay]);

	const localeFormat =
		localeApp === 'pt-BR' ? "'Dia' d',' EEEE 'às ' HH:mm " : 'DD:MM a';
	const locale = localeApp === 'pt-BR' ? ptLocale : usLocale;

	return (
		<>
			<Container even={index % 2 === 0}>
				<Animated.View
					style={{
						opacity: timelineOpacity,
					}}
				>
					<TimelineContainer>
						<Line />
						<ImageContainer>
							<Image source={source} />
						</ImageContainer>
					</TimelineContainer>
				</Animated.View>
				<Animated.View
					style={{
						transform: [{ translateX: translateXInfo }],
					}}
				>
					<InfoContainer>
						<Date>{format(created_at, localeFormat, { locale })}</Date>
						<Value>R$ {value}</Value>
						<Description>{description}</Description>
					</InfoContainer>
				</Animated.View>
			</Container>
			<Modal visible={isEditModalVisible} animationType="slide">
				<EditBilling closeModal={() => setEditModalVisible(false)} />
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
