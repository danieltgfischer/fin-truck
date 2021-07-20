import React, { Dispatch, useContext, useState } from 'react';
import { Animated, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';
import { TranslationsValues } from '@/config/intl';
import { ThemeContext } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { ModalLike } from '../modalLike';
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

export interface IPurchaseDonateProps {
	translateY: Animated.Value;
}

export const PurchaseDonate: React.FC<IPurchaseDonateProps> = (
	props: IPurchaseDonateProps,
) => {
	const [isDonateThanksOpen, setDonateThanksOpen] = useState(false);

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
				<CloseButton onPress={() => null}>
					<AntDesign name="close" size={24} color={theme.colors.text} />
				</CloseButton>
				<Title>{t(TranslationsValues.help)}</Title>
				<ScrollView contentContainerStyle={scrollViewStyle.content}>
					<PurchaseContainer key={shortid()} even>
						{/* <PurchaseTitle>
							{props.componentPurchases[props.donateId]?.title ?? ''}{' '}
							{props.componentPurchases[props.donateId]?.localizedPrice ?? ''}
						</PurchaseTitle>
						<PurchaseDescription>
							{props.componentPurchases[props.donateId]?.description ?? ''}
						</PurchaseDescription>
						<PurchaseButton>
							<ButtonLabel>{t(TranslationsValues.donate)}</ButtonLabel>
						</PurchaseButton> */}
					</PurchaseContainer>
				</ScrollView>
			</Container>
			<ModalLike
				isDonateThanksOpen={isDonateThanksOpen}
				setDonateThanksOpen={setDonateThanksOpen}
			/>
		</>
	);
};
