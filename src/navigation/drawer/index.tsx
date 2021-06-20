import React, { useEffect } from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { TruckScreen } from '@/screens/truck';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Ionicons } from '@expo/vector-icons';
import { MenuButton } from '@/navigation/style';
import { DrawerActions } from '@react-navigation/native';
import { DrawerComponent } from '@/components/drawer';
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
	const title = current_truck?.name ?? '';

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
					<Ionicons name="menu" size={30} color="#fff" />
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
						<Ionicons name="menu" size={30} color="#fff" />
					</MenuButton>
				),
			});
		});
	}, [navigation, title, current_truck]);

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
