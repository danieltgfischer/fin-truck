import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
	width: ${width * 0.9}px;
	height: ${height * 0.4}px;
	background-color: #fff;
	padding: 10% 0 0;
	justify-content: flex-start;
	border-radius: 7px;
`;

export const Label = styled.Text`
	color: #333;
	font-family: Semi_Bold;
	font-size: 24px;
	text-align: center;
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	margin: 10% 0 0;
`;
