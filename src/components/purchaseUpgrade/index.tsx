import React, {
	Dispatch,
	useContext,
	useCallback,
	useState,
	useEffect,
} from 'react';
import { Animated, Platform, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useSerivces } from '@/hooks/useServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { consumeAllItemsAndroid, Subscription } from 'react-native-iap';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { routeNames } from '@/navigation/types';
import {
	Container,
	CloseButton,
	scrollViewStyle,
	Title,
	Description,
	PurchaseContainer,
	ButtonLabel,
	PurchaseButton,
	PurchaseTitle,
	PurchaseDescription,
} from '../purchase/styles';
import { ModalUpgrade } from '../modalUpgrade';

interface IPurchaseUpgradeProps {
	translateY: Animated.Value;
	setIsPurchaselVisible: Dispatch<boolean>;
}

export const PurchaseUpgrade: React.FC<IPurchaseUpgradeProps> = (
	props: IPurchaseUpgradeProps,
) => {
	const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();
	const { height } = useWindowDimensions();
	const { iapService, isPurchaseStoreConnected, isPremium } = useSerivces();
	const route = useRoute();

	const items = Platform.select({
		android: ['1_monthly_fin_truck', '1_yearly_fin_truck'],
	});

	const addPaddingTop = route.name !== routeNames.AddTruck;

	const showModalUpgrade = useCallback(async () => {
		const showed = Boolean(
			JSON.parse(await AsyncStorage.getItem('@IsUpgradedShow')),
		);
		if (isPremium && !showed) {
			setUpgradeModalOpen(true);
			await AsyncStorage.setItem('@IsUpgradedShow', JSON.stringify(true));
		}
	}, [isPremium]);

	useEffect(() => {
		showModalUpgrade();
	}, [showModalUpgrade]);

	useEffect(() => {
		// consumeAllItemsAndroid();
		if (isPurchaseStoreConnected && subscriptions.length === 0) {
			iapService.getSubscriptions(items).then(setSubscriptions);
		}
	}, [iapService, isPurchaseStoreConnected, items, subscriptions?.length]);

	const purchaseSubcription = useCallback(
		async (id: string): Promise<void> => {
			try {
				await iapService.requestSubscription(id);
			} catch (error) {
				console.error(error);
			}
		},
		[iapService],
	);

	return (
		<>
			<Container
				style={{
					transform: [{ translateY: props.translateY }],
				}}
				addPaddingTop={addPaddingTop}
			>
				<CloseButton onPress={() => props.setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.upgrade_title)}</Title>
				<Description>{t(TranslationsValues.upgrade_description)}</Description>
				<ScrollView
					contentContainerStyle={scrollViewStyle.content}
					style={{ height }}
				>
					{(subscriptions ?? []).map((s, i) => (
						<PurchaseContainer key={shortid()} even={i % 2 === 0}>
							<PurchaseTitle>
								{s?.title ?? ''} {s?.localizedPrice ?? ''}
							</PurchaseTitle>
							<PurchaseDescription>{s?.description ?? ''}</PurchaseDescription>
							<PurchaseButton onPress={() => purchaseSubcription(s?.productId)}>
								<ButtonLabel>
									{t(
										s.productId === '1_monthly_fin_truck'
											? TranslationsValues.subscribe_monthly
											: TranslationsValues.subscribe_yearly,
									)}
								</ButtonLabel>
							</PurchaseButton>
						</PurchaseContainer>
					))}
				</ScrollView>
			</Container>
			<ModalUpgrade
				isUpgradeModalOpen={isUpgradeModalOpen}
				setUpgradeModalOpen={setUpgradeModalOpen}
			/>
		</>
	);
};
