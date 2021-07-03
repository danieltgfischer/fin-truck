import styled from 'styled-components/native';
import { ModalProps } from 'react-native';

export const Modal = styled.Modal<ModalProps>`
	background-color: transparent;
`;

export const Container = styled.View`
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	height: 100%;
`;
