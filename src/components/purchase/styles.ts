import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');

export const Container = styled(Animated.View)`
	position: absolute;
	height: ${height * 0.7}px;
	width: 100%;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
	align-items: center;
`;

export const PurchaseContainer = styled.View`
	width: ${width}px;
	align-items: center;
`;

export const Title = styled.Text`
	color: #333;
`;
