import styled from 'styled-components/native';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width } = Dimensions.get('window');

export const Form = styled(UnForm)`
	align-items: center;
	justify-content: center;
`;

export const scrollView = StyleSheet.create({
	content: {
		alignItems: 'center',
	},
});

export const Container = styled.ScrollView`
	height: 100%;
	width: 100%;
	background-color: #fff;
	padding: 50px 0;
`;

export const Title = styled.Text`
	color: #000;
	font-size: 24px;
	text-align: center;
	font-family: Italic;
	padding: 0 25px;
	margin: 0 0 15px;
`;

export const Image = styled.Image`
	height: 80px;
	width: 80px;
	margin: 0 0 15px;
	align-self: center;
	margin: 0 0 15px;
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${width}px;
	margin: 32px 0;
`;
