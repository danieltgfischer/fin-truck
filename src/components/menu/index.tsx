import React, { useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { Animated, Switch, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Brazil from '@/icons/brazil_flag.png';
import Usa from '@/icons/usa_flag.png';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { updateCountryCode } from '@/store/actions';
import { useCallback } from 'react';
import {
	Container,
	ButtonIcon,
	Rotate,
	Label,
	Image,
	LanguageContainer,
} from './styles';

interface IProps {
	isModalVisible: boolean;
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const Menu: React.FC<IProps> = ({
	isModalVisible,
	setIsModalVisible,
}: IProps) => {
	const { locale } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
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

	const toggleLanguage = useCallback(async () => {
		if (locale.country_code === 'en-US') {
			await AsyncStorage.setItem('@CountryCode', 'pt-BR');
			dispatch(updateCountryCode({ country_code: 'pt-BR' }));
			return;
		}
		await AsyncStorage.setItem('@CountryCode', 'en-US');
		dispatch(updateCountryCode({ country_code: 'en-US' }));
	}, [dispatch, locale.country_code]);

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
			<Label>Idioma:</Label>
			<LanguageContainer>
				<Image source={Usa} resizeMode="contain" />
				<Switch
					trackColor={{ false: '#41479b', true: '#fece3f' }}
					thumbColor={locale.country_code === 'pt-BR' ? '#4ba543' : '#ff4b55'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleLanguage}
					value={locale.country_code === 'pt-BR'}
				/>
				<Image source={Brazil} resizeMode="contain" />
			</LanguageContainer>
		</Container>
	);
};
