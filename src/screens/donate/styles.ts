import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
export const scrollViewStyle = StyleSheet.create({
	content: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		width,
		paddingHorizontal: 25,
		paddingTop: 5,
		paddingBottom: 30,
	},
});

export const Container = styled.View`
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: ${({ theme }) => theme.colors.background};

	height: ${height}px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
	font-family: Semi_Bold;
	margin-top: 20px;
`;

export const Paragraph = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	position: relative;
	font-size: 24px;
	text-align: center;
	margin: 20px 0;
	padding: 0 15px;
	font-family: Italic;
`;

export const BoldPix = styled.Text`
	font-family: Semi_Bold;
	color: ${({ theme }) => theme.colors.text};
`;
