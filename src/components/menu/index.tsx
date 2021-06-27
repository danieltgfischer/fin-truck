import React, { useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
import { LanguageSwitch } from '../languageSwitch';
import { Container, ButtonIcon, Rotate, Label } from './styles';

interface IProps {
	isModalVisible: boolean;
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const Menu: React.FC<IProps> = ({
	isModalVisible,
	setIsModalVisible,
}: IProps) => {
	const { height } = useWindowDimensions();
	const translateY = useRef(new Animated.Value(height)).current;
	const rotate = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (isModalVisible) {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
			Animated.sequence([
				Animated.timing(rotate, {
					toValue: 1,
					duration: 500,
					delay: 500,
					useNativeDriver: true,
				}),
				Animated.timing(rotate, {
					toValue: -1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
			return;
		}
		Animated.timing(translateY, {
			toValue: height,
			duration: 500,
			useNativeDriver: true,
		}).start();
		rotate.setValue(0);
	}, [height, isModalVisible, rotate, translateY]);

	return (
		<Container
			style={{
				transform: [{ translateY }],
			}}
		>
			<ButtonIcon onPress={() => setIsModalVisible(false)}>
				<Rotate
					style={{
						transform: [
							{
								rotate: rotate.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: ['180deg', '0deg', '-50deg'],
								}),
							},
						],
					}}
				>
					<AntDesign name="setting" size={50} color="#ccc" />
				</Rotate>
			</ButtonIcon>
			<Label>{I18n.t(TranslationsValues.language)}:</Label>
			<LanguageSwitch />
		</Container>
	);
};
