import { Button } from '@/components/button';
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import { TranslationsValues } from '@/config/intl';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from '@/icons/CreateTruckIcon.png';
import { RootStackParamList, routeNames } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import {
	Container,
	Span,
	Title,
	Paragraph,
	TouchableOpacity,
	ModalContainer,
	ModalTitle,
	Image,
	scrollViewStyle,
	UseTermsContainer,
	TermTitle,
	TermParagraph,
} from './styles';

type WlecomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	routeNames.Welcome
>;

type Props = {
	navigation: WlecomeScreenNavigationProp;
};

export const Welcome: React.FC<Props> = ({ navigation }: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [isUseTermsChecked, setUseTerms] = useState(false);
	const { t } = useTranslation();

	const next = useCallback(async () => {
		try {
			await AsyncStorage.setItem('@UseTerms', JSON.stringify(true));
			navigation.navigate(routeNames.Home);
		} catch (error) {
			console.warn(error);
		}
	}, [navigation]);

	return (
		<>
			<Container>
				<Image source={Icon} />
				<Title>{t(TranslationsValues.welcome)}</Title>
				<Paragraph>
					{t(TranslationsValues.welcome_paragraph)}
					<TouchableOpacity onPress={() => setModalVisible(true)}>
						<Span> {t(TranslationsValues.use_term)}</Span>
					</TouchableOpacity>
					.{'\n'}
					{t(TranslationsValues.enjoy)}
				</Paragraph>
				<BouncyCheckbox
					style={{ marginBottom: 15 }}
					size={25}
					fillColor="#b63b34"
					unfillColor="#fff"
					text={t(TranslationsValues.term_checkbox_label)}
					iconStyle={{ borderColor: '#b63b34', borderRadius: 5 }}
					textStyle={{ fontFamily: 'Regular', fontSize: 24 }}
					onPress={(isChecked: boolean) => {
						setUseTerms(isChecked);
					}}
				/>
				<Button
					next
					disabled={!isUseTermsChecked}
					buttonLabel={t(TranslationsValues.continue)}
					onPress={next}
				/>
			</Container>
			<Modal
				visible={isModalVisible}
				animationType="slide"
				statusBarTranslucent
			>
				<ModalContainer>
					<ModalTitle>{t(TranslationsValues.modal_terms_title)}</ModalTitle>
					<UseTermsContainer contentContainerStyle={scrollViewStyle.content}>
						<TermTitle>What is Lorem Ipsum?</TermTitle>
						<TermParagraph>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industries standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</TermParagraph>
						<TermTitle>Why do we use it?</TermTitle>
						<TermParagraph>
							It is a long established fact that a reader will be distracted by
							the readable content of a page when looking at its layout. The
							point of using Lorem Ipsum is that it has a more-or-less normal
							distribution of letters, as opposed to using Content here, content
							here, making it look like readable English. Many desktop
							publishing packages and web page editors now use Lorem Ipsum as
							their default model text, and a search for lorem ipsum will
							uncover many web sites still in their infancy. Various versions
							have evolved over the years, sometimes by accident, sometimes on
							purpose (injected humour and the like).
						</TermParagraph>
					</UseTermsContainer>
					<Button
						onPress={() => setModalVisible(!isModalVisible)}
						buttonLabel={t(TranslationsValues.close)}
					/>
				</ModalContainer>
			</Modal>
		</>
	);
};
