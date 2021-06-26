import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
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
	Warning,
	scrollViewStyle,
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
	const { current_truck, total_years } = useSelector((state: IState) => state);
	const dispatch = useDispatch();
	const title = current_truck?.name ?? '';

	useEffect(() => {
		navigation.setOptions({
			title,
		});
	}, [navigation, title]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			billingRepository.getYears(current_truck.id).then(({ total_years }) => {
				dispatch(updateYears(total_years));
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
				<Title>Histórico</Title>
			</SubHeader>
			<ScrollView contentContainerStyle={scrollViewStyle.content}>
				{isLoading ? (
					<ActivityIndicator color="#B63B34" size="small" />
				) : (
					<>
						{total_years.length > 0 &&
							total_years.map(year => <YearTimeline year={year} key={year} />)}
						{total_years.length === 0 && (
							<Warning>Você não adicionou nenhum valor ainda.</Warning>
						)}
					</>
				)}
			</ScrollView>
		</Container>
	);
};
