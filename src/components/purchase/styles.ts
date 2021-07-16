import styled from 'styled-components/native';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');
const heightPurchase = height > 670 ? height * 1.2 : height * 1.8;

export const scrollViewStyle = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 5,
		minHeight: heightPurchase,
	},
});

export const Container = styled(Animated.ScrollView)`
	position: absolute;
	height: ${height}px;
	width: 100%;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
`;

export const LikeContainer = styled.View`
	align-items: center;
	justify-content: flex-start;
	height: ${height * 0.6}px;
	width: ${width * 0.9}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const LikeLabel = styled.Text`
	font-family: Italic;
	font-size: 32px;
	color: ${({ theme }) => theme.colors.text};
`;

export const UpgradeContainer = styled.View`
	align-items: center;
	justify-content: flex-start;
	height: ${height * 0.9}px;
	width: ${width * 0.9}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const UpgradeLabel = styled(LikeLabel)`
	font-size: 24px;
	text-align: center;
	padding: 0 5px;
	top: -35px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
	margin: 5px 0;
	font-family: Regular;
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
`;
