import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
	align-items: center;
	width: ${width}px;
	flex-direction: row;
	align-items: flex-end;
`;
export const TimelineContainer = styled.View`
	align-items: center;
	align-self: flex-start;
	margin: 0 0 0 30px;
`;
export const Line = styled.View`
	height: 50px;
	width: 1px;
	background-color: #333;
`;

export const Image = styled.Image`
	height: 45px;
	width: 45px;
`;

export const ImageContainer = styled.View`
	align-items: center;
	justify-content: center;
	border: 1px solid #333;
	padding: 10px;
	border-radius: 40px;
	margin: 10px 0;
`;

export const InfoContainer = styled.View`
	position: relative;
	align-items: flex-start;
	flex: 1;
	margin: 0 0 0 5px;
`;

export const Date = styled.Text`
	position: relative;
	font-size: 18px;
	font-family: Semi_Bold;
	top: -5px;
	color: #333;
`;
export const Value = styled.Text`
	font-family: Semi_Bold;
	position: relative;
	align-self: center;
	font-size: 22px;
	left: -15px;
	color: #333;
`;

export const Description = styled.Text`
	text-align: center;
	color: #333;
	font-size: 16px;
	font-family: Regular;
	padding: 0 10px;
`;
