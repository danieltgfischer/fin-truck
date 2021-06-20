import React, { ReactNode } from 'react';
import { Modal as StyledModal, Container } from './styles';

interface IProps {
	children: ReactNode;
	transparent?: boolean;
	visible: boolean;
	statusBarTranslucent?: boolean;
	animationType: string;
}

export const Modal: React.FC<IProps> = ({ children, ...rest }: IProps) => (
	<StyledModal {...rest}>
		<Container>{children}</Container>
	</StyledModal>
);
