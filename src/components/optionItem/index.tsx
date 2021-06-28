import React, { useCallback, FC, useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { useTranslation } from 'react-i18next';
import { Container, Name, Image } from './styles';

interface IProps {
	big_name: boolean;
	source: string;
	value: string;
	delay: number;
}

export const OptionItem: FC<IProps> = ({
	big_name,
	source,
	value,
	delay,
}: IProps) => {
	const navigation = useNavigation();
	const scale = useMemo(() => new Animated.Value(0), []);
	const { t } = useTranslation();

	useEffect(() => {
		Animated.timing(scale, {
			toValue: 1,
			duration: 500,
			easing: Easing.elastic(1),
			useNativeDriver: true,
			delay,
		}).start();
	}, [delay, scale]);

	const navigate = useCallback(() => {
		navigation.navigate(routeNames.AddOption, { option: value });
	}, [navigation, value]);

	return (
		<Animated.View style={{ transform: [{ scale }] }}>
			<Container onPress={navigate}>
				<Image source={source} resizeMode="contain" />
				<Name big_name={big_name}>{t(value)}</Name>
			</Container>
		</Animated.View>
	);
};
