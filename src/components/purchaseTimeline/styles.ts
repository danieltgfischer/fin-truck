import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');

export const scrollViewStyle = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		height,
	},
	upgradeScrollContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});

export const Container = styled.View`
	position: absolute;
	height: ${height}px;
	width: 100%;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
	align-items: center;
`;

export const ConainerAd = styled.View`
	align-items: center;
	justify-content: flex-start;
	background-color: ${({ theme }) => theme.colors.background};
	height: ${height * 0.95}px;
	width: ${width * 0.95}px;
`;

export const AdWarning = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 22px;
	font-family: Italic;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
	text-align: center;
	padding: 0 ${width * 0.15}px;
	margin: 5px 0;
	font-family: Regular;
`;

export const Description = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	margin: 5px 0;
	text-align: center;
	padding: 0 15px;
	font-family: Italic;
`;

interface IPContainer {
	even?: boolean;
}

export const PurchaseContainer = styled.View<IPContainer>`
	width: ${width}px;
	align-items: center;
	padding: 10px 20px;
	margin: 5px 0;
	background-color: ${({ even, theme }) =>
		even ? theme.colors.secondary : theme.colors.background};
`;

export const PurchaseTitle = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 22px;
	align-self: flex-start;
	font-family: Semi_Bold;
`;

export const PurchaseDescription = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	text-align: left;
	font-size: 20px;
	margin: 0 0 10px;
	font-family: Italic;
`;

export const PurchaseButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.buttons.next};
	padding: 5px 10px;
	border-radius: 5px;
	margin: 2px 0;
`;

export const ButtonLabel = styled.Text`
	color: #fff;
	font-family: Regular;
	font-size: 18px;
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 25px 15px 0;
	margin: 0 0 25px;
	z-index: 1;
	top: 5px;
	position: relative;
`;
