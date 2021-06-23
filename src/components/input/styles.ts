import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
	display: flex;
	width: ${width}px;
	position: relative;
	align-items: center;
	margin: 10px 0 0;
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
	padding: 0 0 0 5px;
`;

export const TextInputContainer = styled.View`
	display: flex;
	width: 95%;
	height: 50px;
	border: 2px solid ${({ isFocused }) => (isFocused ? '#9b3b34' : '#333')};
	margin: 3px 0 20px;
	border-radius: 7px;
`;

export const Error = styled.Text`
	color: #ff4136;
	font-size: 18px;
	position: absolute;
	bottom: -25px;
`;

export const Span = styled.Text`
	color: #ff4136;
`;
