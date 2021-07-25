import React, {
	useCallback,
	useEffect,
	useMemo,
	useContext,
	memo,
	Dispatch,
} from 'react';
import { Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import { Container, Name, Image } from './styles';

export interface IOptionItem {
	big_name: boolean;
	source: string;
	value: string;
	delay: number;
	index: number;
	source_light?: string;
	animationDone: boolean;
	setAniamtionDone: Dispatch<boolean>;
}

const OptionItem: React.FC<IOptionItem> = ({
	big_name,
	source,
	value,
	source_light,
	animationDone,
	setAniamtionDone,
	delay,
	index,
}: IOptionItem) => {
	const navigation = useNavigation();
	const scale = useMemo(() => new Animated.Value(0), []);
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	useEffect(() => {
		if (animationDone) {
			scale.setValue(1);
			return;
		}
		Animated.timing(scale, {
			toValue: 1,
			duration: 500,
			easing: Easing.elastic(1),
			useNativeDriver: true,
			delay,
		}).start(({ finished }) => {
			if (index === 14 && finished) {
				setAniamtionDone(true);
			}
		});
	}, [animationDone, delay, index, scale, setAniamtionDone]);

	const navigate = useCallback(() => {
		navigation.navigate(routeNames.AddOption, { option: value });
	}, [navigation, value]);

	const isDark = theme.name === 'dark';

	return (
		<Animated.View style={{ transform: [{ scale }] }}>
			<Container onPress={navigate}>
				<Image source={isDark ? source_light : source} resizeMode="contain" />
				<Name big_name={big_name}>{t(value)}</Name>
			</Container>
		</Animated.View>
	);
};

export default memo(OptionItem);
