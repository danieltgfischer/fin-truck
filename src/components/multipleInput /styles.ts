import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
	display: flex;
	width: ${width}px;
	align-items: center;
`;

interface IFocus {
	isFocused: boolean;
}

export const Label = styled.Text<IFocus>`
	align-self: flex-start;
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 0 0 0 3%;
	color: ${({ isFocused, theme }) =>
		isFocused ? theme.colors.primary : theme.colors.text};
`;

export const TextInput = styled.TextInput`
	height: 100%;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.text};
	padding: 0 0 0 5px;
`;

export const TextInputContainer = styled.View<IFocus>`
	display: flex;
	width: 95%;
	height: 120px;
	border: 2px solid
		${({ isFocused, theme }) =>
			isFocused ? theme.colors.primary : theme.colors.text};
	margin: 3px 0 15px;
	border-radius: 7px;
`;
