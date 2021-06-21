import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
	width: ${width}px;
	flex-direction: row;
	position: relative;
	align-items: flex-end;
	justify-content: flex-start;
	background: ${({ even }) => (even ? '#fff' : '#fafafa')};
	padding: 10px 0;
`;
export const TimelineContainer = styled.View`
	position: relative;
	align-items: center;
	width: ${width * 0.25}px;
	background: transparent;
`;

export const InfoContainer = styled.View`
	position: relative;
	align-items: center;
	top: 15px;
	padding: 15px 0 20px;
	width: ${width * 0.75}px;
	background: transparent;
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

export const Date = styled.Text`
	position: relative;
	font-size: 18px;
	font-family: Semi_Bold;
	align-self: flex-start;
	top: -30px;
	left: -10px;
	color: #333;
`;
export const Value = styled.Text`
	font-family: Semi_Bold;
	position: relative;
	align-self: center;
	font-size: 22px;
	top: -10px;
	color: #333;
`;

export const Description = styled.Text`
	position: relative;
	text-align: center;
	color: #333;
	width: 100%;
	top: -5px;
	font-size: 16px;
	font-family: Regular;
`;
