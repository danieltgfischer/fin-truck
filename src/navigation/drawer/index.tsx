import React, { useEffect, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TruckScreen } from '@/screens/truck';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Ionicons } from '@expo/vector-icons';
import { MenuButton } from '@/navigation/style';
import { DrawerActions } from '@react-navigation/native';
import { DrawerComponent } from '@/components/drawer';
import { ThemeContext } from 'styled-components/native';
import { RootStackParamList, routeNames, DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();
type TruckScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.DrawerRoot
>;

type Props = {
	navigation: TruckScreenNavigationProp;
};

export const DrawerScreen: React.FC<Props> = ({ navigation }: Props) => {
	const { current_truck } = useSelector((state: IState) => state);
	const theme = useContext(ThemeContext);
	const title = current_truck?.name ?? '';

	const isDark = theme.name === 'dark';

	useEffect(() => {
		navigation.addListener('blur', () => {
			navigation.dispatch(DrawerActions.closeDrawer());
		});
		navigation.setOptions({
			title,
			headerLeft: () => (
				<MenuButton
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				>
					<Ionicons
						name="menu"
						size={30}
						color={isDark ? theme.colors.text : '#fff'}
					/>
				</MenuButton>
			),
		});

		navigation.addListener('focus', () => {
			navigation.setOptions({
				title,
				headerLeft: () => (
					<MenuButton
						onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
					>
						<Ionicons
							name="menu"
							size={30}
							color={isDark ? theme.colors.text : '#fff'}
						/>
					</MenuButton>
				),
			});
		});
	}, [navigation, title, current_truck, theme.colors.text, isDark]);

	return (
		<Drawer.Navigator
			drawerType="front"
			drawerContent={() => <DrawerComponent />}
			initialRouteName={routeNames.Truck}
		>
			<Drawer.Screen name={routeNames.Truck} component={TruckScreen} />
		</Drawer.Navigator>
	);
};
