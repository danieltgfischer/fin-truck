import React, { useCallback } from 'react';
import TrucksIcon from '@/icons/TrucksIconBlack.png';
import Timeline from '@/icons/TimelineBlack.png';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import I18n from 'i18n-js';
import { TranslationsValues } from '@/config/intl';
import { DrawerItem } from './DrawerItem';
import {
	Container,
	HeaderContainer,
	HeaderLabel,
	LanguageContainer,
} from './styles';
import { LanguageSwitch } from '../languageSwitch';

export const DrawerComponent: React.FC = () => {
	const navigation = useNavigation();

	const navigate = useCallback(
		path => {
			navigation.navigate(path);
		},
		[navigation],
	);

	return (
		<Container>
			<HeaderContainer>
				<HeaderLabel>MENU</HeaderLabel>
			</HeaderContainer>
			<DrawerItem
				source={TrucksIcon}
				name={I18n.t(TranslationsValues.trucks)}
				onPress={() => navigate(routeNames.Home)}
			/>
			<DrawerItem
				source={Timeline}
				name={I18n.t(TranslationsValues.history)}
				onPress={() => navigate(routeNames.Timeline)}
			/>
			<LanguageContainer>
				<LanguageSwitch />
			</LanguageContainer>
		</Container>
	);
};
