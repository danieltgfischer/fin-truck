import styled from 'styled-components/native';
import { Dimensions, TextInput as TextInputNative } from 'react-native';
import RNCurrencyInput, {
	CurrencyInputProps,
} from 'react-native-currency-input';

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
		isFocused ? theme.colors.secondary : theme.colors.text};
`;

export const TextInput = styled.TextInput<InputReference>`
	height: 100%;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.text};
	padding: 0 0 0 5px;
`;

export const CurrencyInput = styled(RNCurrencyInput)<CurrencyInputProps>`
	height: 100%;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.text};
	padding: 0 0 0 5px;
`;

export const TextInputContainer = styled.View<IFocus>`
	display: flex;
	width: 95%;
	height: 50px;
	border: 2px solid
		${({ isFocused, theme }) =>
			isFocused ? theme.colors.secondary : theme.colors.text};
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
