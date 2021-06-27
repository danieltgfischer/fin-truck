import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { height, width } = Dimensions.get('window');

export const Container = styled(Animated.View)`
	position: absolute;
	height: ${height * 0.4}px;
	width: ${width}px;
	background: #fff;
	bottom: 0;
	elevation: 15;
`;

export const ButtonIcon = styled.TouchableOpacity`
	margin: 0 30px;
`;

export const Rotate = styled(Animated.View)`
	width: 50px;
	height: 50px;
	align-self: flex-end;
	margin-top: 15px;
`;

export const Label = styled.Text`
	color: #333;
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 0 0 0 15px;
`;
