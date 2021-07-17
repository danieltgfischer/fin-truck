import React, { Dispatch, useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import { ThemeContext } from 'styled-components';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from '@/components/modal';
import Like from '@/animations/like.json';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { LikeContainer, LikeLabel, CloseButton } from './styles';

interface IModal {
	isDonateThanksOpen: boolean;
	setDonateThanksOpen: Dispatch<boolean>;
}

export const ModalLike: React.FC<IModal> = ({
	isDonateThanksOpen,
	setDonateThanksOpen,
}: IModal) => {
	const { width } = useWindowDimensions();
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();

	return (
		<Modal visible={isDonateThanksOpen} animationType="fade">
			<LikeContainer>
				<CloseButton onPress={() => setDonateThanksOpen(false)}>
					<AntDesign name="close" size={35} color={theme.colors.text} />
				</CloseButton>
				<LottieView
					autoPlay
					loop
					source={Like}
					resizeMode="contain"
					autoSize
					style={{
						height: width * 0.5,
						width: width * 0.5,
						backgroundColor: theme.colors.background,
					}}
				/>
				<LikeLabel>{t(TranslationsValues.thanks)}</LikeLabel>
			</LikeContainer>
		</Modal>
	);
};
