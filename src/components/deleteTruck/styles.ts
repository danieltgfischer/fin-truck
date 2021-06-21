import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
	width: ${width * 0.95}px;
	height: ${height * 0.4}px;
	background-color: #fff;
	padding: 10% 0 0;
	justify-content: flex-start;
	border-radius: 7px;
`;

export const Label = styled.Text`
	color: #333;
	font-family: Regular;
	font-size: 20px;
	padding: 0 25px;
	text-align: left;
`;

export const Span = styled.Text`
	color: #333;
	font-family: Bold;
	font-size: 20px;
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	margin: 10% 0 0;
`;
