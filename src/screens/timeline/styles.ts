import { lighten } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const scrollViewStyle = StyleSheet.create({
	content: {
		paddingBottom: 25,
	},
});

export const Container = styled.SafeAreaView`
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.background};
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
	background-color: ${({ theme }) => theme.colors.background};
	elevation: 1;
`;

export const Image = styled.Image`
	height: 60px;
	width: 60px;
	position: relative;
	left: -50px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	position: relative;
	left: -15px;
	font-size: 36px;
	font-family: Semi_Bold;
`;

export const Warning = styled.Text`
	color: ${({ theme }) => theme.colors.empty_warning};
	font-size: 20px;
	font-family: Italic;
	text-align: center;
	padding: 0 15%;
`;
