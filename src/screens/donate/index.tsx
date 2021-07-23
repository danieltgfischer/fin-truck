import React, { useState, useCallback } from 'react';
import { ScrollView, Clipboard } from 'react-native';
import { Button } from '@/components/button';
import { ModalLike } from '@/components/modalLike';
import { Container, Title, Paragraph, BoldPix } from './styles';

export const Donate: React.FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);

	const copyText = useCallback(async () => {
		Clipboard.setString('pix_fin_truck');
		setModalVisible(true);
	}, []);

	return (
		<>
			<ScrollView>
				<Container>
					<Title>Precisamos de você</Title>
					<Paragraph>
						Olá amigo!{'\n'} Se nosso aplicativo está sendo útil para você e
						está te ajudando a organizar seus gastos e ganhos faça um PIX para o
						Fin Truck e ajude a melhorar nosso aplicativo.{'\n'}
					</Paragraph>
					<Paragraph>
						<BoldPix>PIX:</BoldPix> pix_fin_truck
					</Paragraph>
					<Button next buttonLabel="Copiar PIX" onPress={copyText} />
				</Container>
			</ScrollView>
			<ModalLike
				isDonateThanksOpen={isModalVisible}
				setDonateThanksOpen={setModalVisible}
			/>
		</>
	);
};
