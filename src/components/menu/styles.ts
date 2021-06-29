import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import { darken } from 'polished';

const { height, width } = Dimensions.get('window');

export const Container = styled(Animated.View)`
	position: absolute;
	height: ${height * 0.5}px;
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

export const ContainerSwitch = styled.View`
	width: 100%;
	padding: 0 5%;
	margin: 2% 0;
`;
