import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
	display: flex;
	width: ${width}px;
	align-items: center;
`;

export const Label = styled.Text`
	align-self: flex-start;
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 0 0 0 3%;
	color: ${({ isFocused }) => (isFocused ? '#9b3b34' : '#333')};
`;

export const TextInput = styled.TextInput`
	height: 100%;
	font-size: 24px;
	color: #333;
`;

export const TextInputContainer = styled.View`
	display: flex;
	width: 95%;
	height: 120px;
	border: 2px solid ${({ isFocused }) => (isFocused ? '#9b3b34' : '#333')};
	margin: 3px 0 15px;
	border-radius: 7px;
`;
