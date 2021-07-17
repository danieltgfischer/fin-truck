import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { ModalLike } from '../modalLike';
import { ModalUpgrade } from '../modalUpgrade';
import {
	Container,
	CloseButton,
	scrollViewStyle,
	Title,
	PurchaseContainer,
	ButtonLabel,
	PurchaseButton,
	PurchaseTitle,
	PurchaseDescription,
} from '../purchase/styles';
import { IPurchaseUpgradeProps } from '../purchaseUpgrade';

export interface IPurchaseProps extends IPurchaseUpgradeProps {
	productId: string;
}

export const PurchaseItem: React.FC<IPurchaseProps> = (props: IPurchaseProps) => {
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();

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
				<Title>{t(TranslationsValues.help)}</Title>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
					<PurchaseContainer key={shortid()}>
						<PurchaseTitle>
							{props.componentPurchases[props.productId]?.title ?? ''}{' '}
							{props.componentPurchases[props.productId]?.localizedPrice ?? ''}
						</PurchaseTitle>
						<PurchaseDescription>
							{props.componentPurchases[props.productId]?.description ?? ''}
						</PurchaseDescription>
						<PurchaseButton>
							<ButtonLabel>{t(TranslationsValues.buy)}</ButtonLabel>
						</PurchaseButton>
					</PurchaseContainer>
					<PurchaseContainer key={shortid()} even>
						<PurchaseTitle>
							{props.componentPurchases[props.donateId]?.title ?? ''}{' '}
							{props.componentPurchases[props.donateId]?.localizedPrice ?? ''}
						</PurchaseTitle>
						{/* ANCHOR */}
						<PurchaseDescription>
							{props.componentPurchases[props.donateId]?.description ?? ''}
						</PurchaseDescription>
						<PurchaseButton onPress={() => props.purchase(props.donateId)}>
							<ButtonLabel>{t(TranslationsValues.donate)}</ButtonLabel>
						</PurchaseButton>
					</PurchaseContainer>
					<PurchaseContainer key={shortid()}>
						<PurchaseTitle>
							{props.componentPurchases[props.upgradeId]?.title ?? ''}{' '}
							{props.componentPurchases[props.upgradeId]?.localizedPrice ?? ''}
						</PurchaseTitle>
						<PurchaseDescription>
							{props.componentPurchases[props.upgradeId]?.description ?? ''}
						</PurchaseDescription>
						<PurchaseButton onPress={() => props.purchase(props.upgradeId)}>
							<ButtonLabel>{t(TranslationsValues.buy)}</ButtonLabel>
						</PurchaseButton>
					</PurchaseContainer>
				</ScrollView>
			</Container>
			<ModalLike
				isDonateThanksOpen={props.isDonateThanksOpen}
				setDonateThanksOpen={props.setDonateThanksOpen}
			/>
			<ModalUpgrade
				isUpgradeModalOpen={props.isUpgradeModalOpen}
				setUpgradeModalOpen={props.setUpgradeModalOpen}
			/>
		</>
	);
};
