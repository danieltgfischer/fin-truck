import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin: ${height * 0.05}px 0 0;
`;

export const Label = styled.Text`
	color: #ccc;
	font-size: 20px;
	padding: 0 10%;
	text-align: center;
`;
