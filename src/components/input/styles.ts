import styled from 'styled-components/native';
import { Dimensions, TextInput as TextInputNative } from 'react-native';

const { width } = Dimensions.get('window');

interface InputReference extends TextInputNative {
	value: string;
}

interface IFocus {
	isFocused: boolean;
}

export const Container = styled.View`
	display: flex;
	width: ${width}px;
	position: relative;
	align-items: center;
	margin: 10px 0 0;
`;

export const Label = styled.Text<IFocus>`
	align-self: flex-start;
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 0 0 0 3%;
	color: ${({ isFocused, theme }) =>
		isFocused ? theme.colors.primary : theme.colors.text};
`;

export const TextInputContainer = styled.View<IFocus>`
	display: flex;
	width: 95%;
	height: 50px;
	border: 2px solid
		${({ isFocused, theme }) =>
			isFocused ? theme.colors.primary : theme.colors.text};
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
