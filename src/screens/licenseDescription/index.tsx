import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useEffect } from 'react';
import {
	Container,
	Description,
	ScrollView,
	scrollStyle,
	Title,
} from './styles';

type LicenseDescriptionScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.LicenseDescription
>;

type Props = {
	route: {
		params: { name: string; description: string };
	};
	navigation: LicenseDescriptionScreenNavigationProp;
};

export const LicenseDescription: React.FC<Props> = ({
	route,
	navigation,
}: Props) => {
	const { name: title, description } = route.params;
	useEffect(() => {
		navigation.setOptions({
			title,
		});
	}, [navigation, title]);

	return (
		<Container>
			<ScrollView
				contentContainerStyle={scrollStyle.content}
				nestedScrollEnabled
			>
				<ScrollView horizontal contentContainerStyle={scrollStyle.title}>
					<Title>{title}</Title>
				</ScrollView>
				<Description>{description}</Description>
			</ScrollView>
		</Container>
	);
};
