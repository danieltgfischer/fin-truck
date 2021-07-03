import React, { useCallback, useContext, useState, useEffect } from 'react';
import TrucksIcon from '@/icons/TrucksIcon.png';
import Timeline from '@/icons/Timeline.png';
import { useNavigation } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { routeNames } from '@/navigation/types';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components/native';
import { ButtonIcon } from '@/navigation/style';
import { AntDesign } from '@expo/vector-icons';
import { DrawerItem } from './DrawerItem';
import { Menu } from '../menu';
import {
	DrawerContainer,
	HeaderContainer,
	HeaderLabel,
	MenuButtonsContainer,
	Container,
	MenuConfigContainer,
	DrawerContentContainer,
} from './styles';

export const DrawerComponent: React.FC = () => {
	const navigation = useNavigation();
	const { t } = useTranslation();
	const theme = useContext(ThemeContext);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const isDrawerOpen = useIsDrawerOpen();

	useEffect(() => {
		if (!isDrawerOpen) {
			setIsModalVisible(false);
		}
	}, [isDrawerOpen]);

	const navigate = useCallback(
		path => {
			navigation.navigate(path);
		},
		[navigation],
	);

	const isDark = theme.name === 'dark';

	return (
		<Container>
			<DrawerContainer onPress={() => setIsModalVisible(false)}>
				<DrawerContentContainer>
					<MenuButtonsContainer>
						<HeaderContainer>
							<HeaderLabel>MENU</HeaderLabel>
						</HeaderContainer>
						<DrawerItem
							source={TrucksIcon}
							name={t(TranslationsValues.trucks)}
							onPress={() => navigate(routeNames.Home)}
						/>
						<DrawerItem
							source={Timeline}
							name={t(TranslationsValues.history)}
							onPress={() => navigate(routeNames.Timeline)}
						/>
					</MenuButtonsContainer>
					<MenuConfigContainer>
						<ButtonIcon onPress={() => setIsModalVisible(true)}>
							<AntDesign
								name="setting"
								size={50}
								color={isDark ? theme.colors.text : '#ccc'}
							/>
						</ButtonIcon>
					</MenuConfigContainer>
				</DrawerContentContainer>
			</DrawerContainer>
			<Menu
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Container>
	);
};
