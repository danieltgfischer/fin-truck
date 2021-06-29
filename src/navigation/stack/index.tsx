import React, { useEffect, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Fonts from '@expo-google-fonts/source-sans-pro';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import { HomeScreen } from '@/screens/home';
import { AddTruckScreen } from '@/screens/addTruck';
import { AddOptionScreen } from '@/screens/addOption';
import { Timeline } from '@/screens/timeline';
import { IState } from '@/store/types';
import { updateCountryCode, updateTheme } from '@/store/actions';
import { useTranslation } from 'react-i18next';
import { TranslationsValues } from '@/config/intl';
import light from '@/styles/themes/light';
import dark from '@/styles/themes/dark';
import { darken } from 'polished';
import { DrawerScreen } from '../drawer';
import { RootStackParamList, routeNames } from '../types';
import { LoadingContainer } from '../style';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
	const { locale, theme } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();

	const [fontsLoaded] = Fonts.useFonts({
		Light: Fonts.SourceSansPro_300Light,
		Light_Italic: Fonts.SourceSansPro_300Light_Italic,
		Regular: Fonts.SourceSansPro_400Regular,
		Italic: Fonts.SourceSansPro_400Regular_Italic,
		Semi_Bold: Fonts.SourceSansPro_600SemiBold,
		Semi_Bold_Italic: Fonts.SourceSansPro_600SemiBold_Italic,
		Bold: Fonts.SourceSansPro_700Bold,
	});

	const updateLanguage = useCallback(async () => {
		const country_code = await AsyncStorage.getItem('@CountryCode');
		if (!country_code) {
			try {
				await AsyncStorage.setItem('@CountryCode', locale.country_code);
			} catch (error) {
				console.warn(error);
			}
		}
		dispatch(updateCountryCode({ country_code }));
		i18n.changeLanguage(country_code);
	}, [dispatch, i18n, locale.country_code]);

	const updateAppTheme = useCallback(async () => {
		const storagedTheme = await AsyncStorage.getItem('@Theme');
		if (!storagedTheme) {
			try {
				await AsyncStorage.setItem('@Theme', 'light');
				dispatch(updateTheme('light'));
			} catch (error) {
				console.warn(error);
			}
		}
		dispatch(updateTheme(storagedTheme));
	}, [dispatch]);

	useEffect(() => {
		updateLanguage();
		updateAppTheme();
	}, [updateAppTheme, updateLanguage]);

	const defaultTheme = theme === 'light' ? light : dark;
	const isDark = theme === 'dark';
	const darkValue = isDark ? 0.2 : 0;

	if (!fontsLoaded) {
		return (
			<ThemeProvider theme={defaultTheme}>
				<LoadingContainer>
					<ActivityIndicator color={isDark ? '#fbfbff' : '#fff'} size="large" />
				</LoadingContainer>
			</ThemeProvider>
		);
	}

	const options: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerTitleStyle: {
			color: isDark ? '#fbfbff' : '#fff',

			fontSize: 28,
			fontFamily: 'Italic',
		},
		headerTintColor: isDark ? '#fbfbff' : '#fff',
		headerStyle: {
			backgroundColor: darken(darkValue, '#b63b34'),
			height: 115,
		},
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={routeNames.Home}>
					<Stack.Screen
						name={routeNames.Home}
						component={HomeScreen}
						options={{
							title: 'HOME',
							headerTitleAlign: 'center',
							headerTitleStyle: {
								color: isDark ? '#fbfbff' : '#fff',
								fontSize: 32,
							},
							headerStyle: {
								backgroundColor: darken(darkValue, '#b63b34'),
								height: 140,
							},
						}}
					/>
					<Stack.Screen
						name={routeNames.AddTruck}
						component={AddTruckScreen}
						options={{
							title: t(TranslationsValues.add_truck_header_title),
							...options,
						}}
					/>
					<Stack.Screen
						name={routeNames.AddOption}
						component={AddOptionScreen}
						options={{
							title: '',
							...options,
						}}
					/>
					<Stack.Screen
						name={routeNames.Timeline}
						component={Timeline}
						options={{
							title: '',
							...options,
						}}
					/>
					<Stack.Screen
						name={routeNames.DrawerRoot}
						component={DrawerScreen}
						options={options}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="light" backgroundColor={darken(darkValue, '#b63b34')} />
		</ThemeProvider>
	);
};
