import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
	flex: 1;
	height: ${height * 0.4}px;
	justify-content: center;
	align-items: center;
`;

export const Label = styled.Text`
	color: #bbbbbb;
	font-size: 20px;
	width: 80%;
	text-align: center;
`;
