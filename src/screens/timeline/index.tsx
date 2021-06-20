import React, { useEffect, useState } from 'react';
import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { YearTimeline } from '@/components/year';

import TimelineIcon from '@/icons/TimelineIcon.png';
import { Container, Image, SubHeader, Title, ScrollView } from './styles';

type ScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Timeline
>;

type Props = {
	navigation: ScreenNavigationProp;
};

export const Timeline: React.FC<Props> = ({ navigation }: Props) => {
	const [years, setYears] = useState(['2021', '2020']);
	const { current_truck } = useSelector((state: IState) => state);
	const title = current_truck?.name ?? '';

	useEffect(() => {
		navigation.setOptions({
			title,
		});
	}, [navigation, title]);

	return (
		<Container>
			<SubHeader>
				<Image source={TimelineIcon} resizeMode="contain" />
				<Title>{Localization.locale}</Title>
			</SubHeader>
			<ScrollView>
				{years && years.map(year => <YearTimeline year={year} key={year} />)}
			</ScrollView>
		</Container>
	);
};
