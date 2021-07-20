import styled from 'styled-components/native';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');
const heightPurchase = height > 670 ? height : height * 1.2;

export const scrollViewStyle = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		minHeight: heightPurchase,
		height,
	},
	upgradeScrollContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: height * 0.6,
	},
	upgradScroll: {
		top: -75,
	},
});

export const Container = styled(Animated.ScrollView)`
	position: absolute;
	height: ${height}px;
	width: 100%;
	padding: 115px 0 0;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
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
	padding: 5px 15px 0;
	z-index: 1;
`;
