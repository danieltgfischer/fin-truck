import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');
const heightMenuContainer = height >= 592 ? height * 0.65 : height * 0.7;

export const Container = styled(Animated.View)`
	position: absolute;
	height: ${heightMenuContainer}px;
	width: 100%;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
`;

export const ButtonIcon = styled.TouchableOpacity`
	margin: 0 30px;
	width: 50px;
	height: 50px;
	align-self: flex-end;
`;

export const Rotate = styled(Animated.View)`
	width: 50px;
	height: 50px;
	align-self: flex-end;
	margin-top: 15px;
`;

export const Label = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 0 0 0 15px;
`;

export const ContainerMenu = styled.View`
	width: 100%;
	padding: 0 5%;
	margin: 2% 0;
`;

export const CancelSubscriptionButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.buttons.cancel};
	align-self: center;
	margin: 15px 0 25px;
	align-items: center;
	padding: 10px 20px;
	border-radius: 7px;
`;

export const LabelButton = styled.Text`
	color: #fafafa;
	font-size: 24px;
	font-family: Regular;
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 5px 15px 0;
	z-index: 1;
`;

export const CancelSubscriptionContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.background};
	width: ${width * 0.9}px;
	justify-content: space-around;
	height: ${height * 0.55}px;
`;

export const SubscriptionTitle = styled(Animated.Text)`
	color: ${({ theme }) => theme.colors.text};
	font-size: 28px;
	font-family: Regular;
	text-align: center;
	margin: 15px 0 0;
`;

export const Message = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Italic;
	text-align: center;
	padding: 25px 15px;
`;
