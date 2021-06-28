import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Fonts from '@expo-google-fonts/source-sans-pro';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import { HomeScreen } from '@/screens/home';
import { AddTruckScreen } from '@/screens/addTruck';
import { AddOptionScreen } from '@/screens/addOption';
import { Timeline } from '@/screens/timeline';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { useCallback } from 'react';
import { updateCountryCode } from '@/store/actions';
import { useTranslation } from 'react-i18next';
import { TranslationsValues } from '@/config/intl';
import { DrawerScreen } from '../drawer';
import { RootStackParamList, routeNames } from '../types';
import { LoadingContainer } from '../style';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
	const { locale } = useSelector((state: IState) => state);
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

	useEffect(() => {
		updateLanguage();
	}, [updateLanguage]);

	if (!fontsLoaded) {
		return (
			<LoadingContainer>
				<ActivityIndicator color="#fff" size="large" />
			</LoadingContainer>
		);
	}

	const options: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerTitleStyle: {
			color: '#fff',
			fontSize: 28,
			fontFamily: 'Italic',
		},
		headerTintColor: '#fff',
		headerStyle: {
			backgroundColor: '#b63b34',
			height: 115,
		},
	};

	return (
		<>
			<StatusBar style="light" backgroundColor="#b63b34" />
			<NavigationContainer>
				<Stack.Navigator initialRouteName={routeNames.Home}>
					<Stack.Screen
						name={routeNames.Home}
						component={HomeScreen}
						options={{
							title: 'HOME',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: '#fff', fontSize: 32 },
							headerStyle: {
								backgroundColor: '#b63b34',
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
		</>
	);
};
