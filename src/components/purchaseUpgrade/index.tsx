import React, { Dispatch, useContext, useCallback, useState } from 'react';
import { Animated, Platform, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useSerivces } from '@/hooks/useServices';
import { useEffect } from 'react';
import { consumeAllItemsAndroid, Subscription } from 'react-native-iap';
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
	const { iapService, isPurchaseStoreConnected, isPremium } = useSerivces();

	const items = Platform.select({
		android: ['1_monthly_fin_truck', '1_yearly_fin_truck'],
	});

	useEffect(() => {
		if (isPremium && !isUpgradeModalOpen) {
			setUpgradeModalOpen(true);
		}
	}, [isPremium, isUpgradeModalOpen]);

	console.log('rendered');

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
				contentContainerStyle={scrollViewStyle.content}
			>
				<CloseButton onPress={() => props.setIsPurchaselVisible(false)}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.upgrade_title)}</Title>
				<Description>{t(TranslationsValues.upgrade_description)}</Description>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
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
