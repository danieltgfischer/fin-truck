import React, { useCallback } from 'react';
import TrucksIcon from '@/icons/TrucksIcon.png';
import Timeline from '@/icons/Timeline.png';
import { useNavigation } from '@react-navigation/native';
import { routeNames } from '@/navigation/types';
import { DrawerItem } from './DrawerItem';
import { Container, HeaderContainer, HeaderLabel } from './styles';

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
				name="Caminhões"
				onPress={() => navigate(routeNames.Home)}
			/>
			<DrawerItem
				source={Timeline}
				name="Histórico"
				onPress={() => navigate(routeNames.Timeline)}
			/>
		</Container>
	);
};
