import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
export const scrollViewStyle = StyleSheet.create({
	content: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		width,
		minHeight: height,
		paddingHorizontal: 25,
		paddingTop: 5,
		paddingBottom: 30,
	},
});

export const Container = styled.View`
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: #fff;
	height: ${height}px;
`;

export const Title = styled.Text`
	color: #333;
	font-size: 32px;
	font-family: Semi_Bold;

	margin-top: 20px;
`;

export const ModalTitle = styled.Text`
	color: #333;
	font-size: 32px;
	font-family: Semi_Bold;
`;

export const Label = styled.Text`
	color: #fff;
`;

export const Paragraph = styled.Text`
	color: #333;
	position: relative;
	font-size: 24px;
	text-align: center;
	margin: 20px 0;
	padding: 0 15px;
	font-family: Italic;
`;

export const Span = styled.Text`
	font-family: Semi_Bold_Italic;
	color: #000;
	font-size: 24px;
	position: relative;
	border-bottom-width: 2px;
	border-bottom-color: #000;
	line-height: 23px;
`;

export const TouchableOpacity = styled.TouchableOpacity``;
export const ModalContainer = styled.View`
	background-color: #fff;
	height: 100%;
	align-items: center;
	padding: 50px 0;
`;

export const Image = styled.Image`
	margin: 20px 0 0;
`;

export const UseTermsContainer = styled.ScrollView``;

export const TermParagraph = styled.Text`
	font-family: Italic;
	font-size: 24px;
	color: #333;
`;

export const TermTitle = styled.Text`
	font-family: Semi_Bold;
	font-size: 24px;
	text-align: center;
	color: #333;
	align-self: flex-start;
	margin: 20px 0 5px;
`;
