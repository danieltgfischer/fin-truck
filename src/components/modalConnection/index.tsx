import React, { Dispatch, useContext, useRef } from 'react';
import { Animated, ScrollView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { TranslationsValues } from '@/config/intl';
import { useEffect } from 'react';
import { Modal } from '../modal';
import {
	Container,
	CloseButton,
	Title,
	Dot,
	Message,
	Row,
	Label,
	ObservationTitle,
	scrollViewStyle,
} from './styles';

interface IProps {
	visible: boolean;
	setIsVisible: Dispatch<boolean>;
}

export const ModalConnection: React.FC<IProps> = (props: IProps) => {
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					useNativeDriver: true,
					toValue: 1,
					duration: 1000,
				}),
				Animated.timing(opacity, {
					useNativeDriver: true,
					toValue: 0,
					duration: 1000,
				}),
			]),
		).start();
	}, [opacity]);

	const connectionStore = Platform.select({
		android: t(TranslationsValues.play_store_warning),
		ios: t(TranslationsValues.apple_store_warning),
	});

	return (
		<Modal visible={props.visible} animationType="fade">
			<Container>
				<CloseButton onPress={() => props.setIsVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
					<Title>{t(TranslationsValues.warning)}</Title>
					<Message>{t(TranslationsValues.connection_message)}</Message>
					<Row>
						<Dot />
						<Label>{t(TranslationsValues.network_warning)}</Label>
					</Row>
					<Row>
						<Dot />
						<Label>{connectionStore}</Label>
					</Row>
					<ObservationTitle
						style={{
							opacity,
						}}
					>
						{t(TranslationsValues.attention)}:
					</ObservationTitle>
					<Message style={{ paddingTop: 5 }}>
						{t(TranslationsValues.offline_message)}
					</Message>
				</ScrollView>
			</Container>
		</Modal>
	);
};
