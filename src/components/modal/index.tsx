import React, { ReactNode } from 'react';
import { ModalProps } from 'react-native';
import { Modal as StyledModal, Container } from './styles';

interface IProps {
	children: ReactNode;
	transparent?: boolean;
	visible: boolean;
	statusBarTranslucent?: boolean;
	animationType: 'none' | 'slide' | 'fade';
}

export type CModalProps = ModalProps & IProps;

export const Modal: React.FC<IProps> = ({ children, ...rest }: IProps) => (
	<StyledModal {...rest} transparent>
		<Container>{children}</Container>
	</StyledModal>
);
