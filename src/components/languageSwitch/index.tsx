import React, { useEffect } from 'react';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Brazil from '@/icons/brazil_flag.png';
import Usa from '@/icons/usa_flag.png';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { updateCountryCode } from '@/store/actions';
import { useCallback } from 'react';
import { useState } from 'react';
import { Image, LanguageContainer } from './styles';

export const LanguageSwitch: React.FC = () => {
	const { locale } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const [toggleLanguage, setToggleLanguage] = useState(
		locale.country_code === 'pt-BR',
	);

	useEffect(() => {
		setToggleLanguage(locale.country_code === 'pt-BR');
	}, [locale.country_code]);

	useEffect(() => {
		if (toggleLanguage) {
			dispatch(updateCountryCode({ country_code: 'pt-BR' }));
			AsyncStorage.setItem('@CountryCode', 'pt-BR');
			return;
		}
		dispatch(updateCountryCode({ country_code: 'en-US' }));
		AsyncStorage.setItem('@CountryCode', 'en-US');
	}, [dispatch, locale.country_code, toggleLanguage]);

	const handleSwitchLanguage = useCallback(async () => {
		setToggleLanguage(!toggleLanguage);
	}, [toggleLanguage]);

	return (
		<LanguageContainer>
			<Image source={Usa} resizeMode="contain" />
			<Switch
				trackColor={{ false: '#41479b', true: '#fece3f' }}
				thumbColor={toggleLanguage ? '#4ba543' : '#ff4b55'}
				ios_backgroundColor="#3e3e3e"
				onValueChange={handleSwitchLanguage}
				value={toggleLanguage}
			/>
			<Image source={Brazil} resizeMode="contain" />
		</LanguageContainer>
	);
};
