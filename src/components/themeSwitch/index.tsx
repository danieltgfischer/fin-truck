import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { darken, lighten } from 'polished';
import DarkTheme from '@/icons/DarkTheme.png';
import LightTheme from '@/icons/LightTheme.png';
import { IState } from '@/store/types';
import { updateTheme } from '@/store/actions';
import { Image, Container } from './styles';

export const ThemeSwitch: React.FC = () => {
	const { theme } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { colors } = useContext(ThemeContext);

	const [toggleTheme, setToggleTheme] = useState(theme === 'light');

	useEffect(() => {
		if (toggleTheme) {
			AsyncStorage.setItem('@Theme', 'light');
			dispatch(updateTheme('light'));
			return;
		}
		AsyncStorage.setItem('@Theme', 'dark');
		dispatch(updateTheme('dark'));
	}, [dispatch, toggleTheme]);

	const handleSwitchTheme = useCallback(async () => {
		setToggleTheme(!toggleTheme);
	}, [toggleTheme]);

	return (
		<Container>
			<Image source={DarkTheme} resizeMode="contain" />
			<Switch
				trackColor={{
					true: darken(0.05, colors.background),
					false: darken(0.1, '#0B4F6C'),
				}}
				thumbColor={toggleTheme ? '#ffe14d' : lighten(0.01, colors.background)}
				ios_backgroundColor="#3e3e3e"
				onValueChange={handleSwitchTheme}
				value={toggleTheme}
			/>
			<Image source={LightTheme} resizeMode="contain" />
		</Container>
	);
};
