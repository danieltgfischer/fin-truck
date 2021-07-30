import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const scrollStyle = StyleSheet.create({
	content: {
		width,
		paddingBottom: height / 2,
		paddingTop: 25,
	},
	title: {
		paddingBottom: 25,
	},
});

export const ScrollView = styled.ScrollView``;

export const Container = styled.View`
	height: ${height}px;
	width: ${width}px;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: flex-start;
`;

export const Description = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 24px;
	font-family: Regular;
	padding: 0 15px 0 25px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
	font-family: Regular;
	padding: 0 15px 0 25px;
`;
