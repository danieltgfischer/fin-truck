import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { YearTimeline } from '@/components/year';

import TimelineIcon from '@/icons/TimelineIcon.png';
import { useDatabaseConnection } from '@/hooks/useDatabse';
import { updateYears } from '@/store/actions';
import {
	Container,
	Image,
	SubHeader,
	Title,
	ScrollView,
	Warning,
} from './styles';

type ScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Timeline
>;

type Props = {
	navigation: ScreenNavigationProp;
};

export const Timeline: React.FC<Props> = ({ navigation }: Props) => {
	const { billingRepository, truckRepository } = useDatabaseConnection();
	const [isLoading, setIsLoading] = useState(true);
	const { current_truck, years } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const scrollTranslationY = useRef(0);

	const title = current_truck?.name ?? '';

	useEffect(() => {
		navigation.setOptions({
			title,
		});
	}, [navigation, title]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			billingRepository.getYears(current_truck.id).then(response => {
				dispatch(updateYears(response.years));
				setIsLoading(false);
			});
		});

		return unsubscribe;
	}, [
		billingRepository,
		current_truck.id,
		dispatch,
		navigation,
		truckRepository,
	]);

	return (
		<Container>
			<SubHeader>
				<Image source={TimelineIcon} resizeMode="contain" />
				<Title>{Localization.locale}</Title>
			</SubHeader>
			<ScrollView
				onScroll={event => {
					scrollTranslationY.current = event.nativeEvent.contentOffset.y;
				}}
			>
				{isLoading ? (
					<ActivityIndicator color="#B63B34" size="small" />
				) : (
					<>
						{years.length > 0 &&
							years.map(year => <YearTimeline year={year} key={year} />)}
						{years.length === 0 && (
							<Warning>Você não adicionou nenhum valor ainda.</Warning>
						)}
					</>
				)}
			</ScrollView>
		</Container>
	);
};
