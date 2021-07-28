import React, {
	Dispatch,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import { ThemeContext } from 'styled-components';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from '@/components/modal';
import PremiumDark from '@/animations/premium_dark.json';
import PremiumLight from '@/animations/premium_light.json';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import {
	UpgradeContainer,
	UpgradeDescription,
	UpgradeTitle,
	UpgradeLabel,
	UpgradeRow,
	Dot,
	CloseButton,
	scrollViewStyle,
} from './styles';

interface IModal {
	isUpgradeModalOpen: boolean;
	setUpgradeModalOpen: Dispatch<boolean>;
}

export const ModalUpgrade: React.FC<IModal> = ({
	isUpgradeModalOpen,
	setUpgradeModalOpen,
}: IModal) => {
	const [isSharable, setSherable] = useState(false);
	const { width } = useWindowDimensions();
	const theme = useContext(ThemeContext);
	const { t } = useTranslation();

	useEffect(() => {
		Sharing.isAvailableAsync().then(available => setSherable(available));
	}, []);

	const closeModal = useCallback(async () => {
		await AsyncStorage.setItem('@IsUpgradedShow', JSON.stringify(true));
		setUpgradeModalOpen(false);
	}, [setUpgradeModalOpen]);

	return (
		<Modal visible={isUpgradeModalOpen} animationType="fade">
			<UpgradeContainer>
				<CloseButton onPress={closeModal}>
					<AntDesign name="close" size={35} color={theme.colors.text} />
				</CloseButton>
				<LottieView
					autoPlay
					loop
					source={theme.name === 'dark' ? PremiumDark : PremiumLight}
					resizeMode="cover"
					autoSize
					style={{
						top: -15,
						height: width * 0.7,
						width: width * 0.7,
						margin: 0,
						padding: 0,
						backgroundColor: theme.colors.background,
					}}
				/>
				<ScrollView
					style={scrollViewStyle.upgradScroll}
					contentContainerStyle={scrollViewStyle.upgradeScrollContent}
				>
					<UpgradeTitle>{t(TranslationsValues.congrats)}</UpgradeTitle>
					<UpgradeDescription>
						{t(TranslationsValues.upgrade_message)}
					</UpgradeDescription>
					<UpgradeRow>
						<Dot />
						<UpgradeLabel>
							{t(TranslationsValues.upgrade_feature1)}
						</UpgradeLabel>
					</UpgradeRow>
					{isSharable && (
						<>
							<UpgradeRow>
								<Dot />
								<UpgradeLabel>
									{t(TranslationsValues.upgrade_feature2)}
								</UpgradeLabel>
							</UpgradeRow>
							<UpgradeRow>
								<Dot />
								<UpgradeLabel>
									{t(TranslationsValues.upgrade_feature3)}
								</UpgradeLabel>
							</UpgradeRow>
						</>
					)}
					<UpgradeRow>
						<Dot />
						<UpgradeLabel>
							{t(TranslationsValues.upgrade_feature4)}
						</UpgradeLabel>
					</UpgradeRow>
				</ScrollView>
			</UpgradeContainer>
		</Modal>
	);
};
