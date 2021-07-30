import { RootStackParamList, routeNames } from '@/navigation/types';
import { IState } from '@/store/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import licenses from './licenses';
import {
	Container,
	Title,
	LicenseName,
	Button,
	ScrollView,
	scrollStyle,
} from './styles';

type LicenseScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.License
>;

type Props = {
	navigation: LicenseScreenNavigationProp;
};

export const License: React.FC<Props> = ({ navigation }: Props) => {
	const { locale } = useSelector((state: IState) => state);

	const navigate = useCallback(
		(name, description) => {
			navigation.navigate(routeNames.LicenseDescription, { name, description });
		},
		[navigation],
	);

	return (
		<Container>
			<Title>Fin Truck</Title>
			<ScrollView contentContainerStyle={scrollStyle.content}>
				{licenses.map((l, index) => (
					<Button
						key={l.license}
						even={index % 2 === 0}
						onPress={() =>
							navigate(l.license, l.description(locale.country_code))
						}
					>
						<LicenseName>{l.license}</LicenseName>
					</Button>
				))}
			</ScrollView>
		</Container>
	);
};
