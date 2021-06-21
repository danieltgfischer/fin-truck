import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
	align-items: center;
	justify-content: center;
	background-color: #fafafa;
	flex: 1;
`;
export const SubHeader = styled.View`
	flex-direction: row;
	width: ${width}px;
	justify-content: center;
	align-items: baseline;
	margin: 0 0 20px;
	padding: 20px 0;
	position: relative;
	background-color: #fff;
	elevation: 1;
`;

export const Image = styled.Image`
	height: 60px;
	width: 60px;
	position: relative;
	left: -50px;
`;

export const Title = styled.Text`
	color: #333;
	position: relative;
	left: -15px;
	font-size: 36px;
	font-family: Semi_Bold_Italic;
`;

export const ScrollView = styled.ScrollView``;

export const Warning = styled.Text`
	color: #ccc;
	font-size: 20px;
	font-family: Semi_Bold_Italic;
	text-align: center;
	padding: 0 20%;
`;
