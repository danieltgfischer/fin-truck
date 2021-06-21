import styled from 'styled-components/native';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width } = Dimensions.get('window');

export const scrollView = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 50,
		paddingVertical: 10,
		paddingBottom: 20,
	},
});

export const Container = styled.ScrollView`
	display: flex;
	height: 100%;
	width: 100%;
	background-color: #fff;
`;

export const Image = styled.Image`
	height: 60px;
	width: 70px;
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${width}px;
	margin: 32px 0 0;
`;

export const Form = styled(UnForm)`
	align-items: center;
`;

export const IconButton = styled.TouchableOpacity`
	padding: 5px 10px;
	background-color: #fff;
	elevation: 7;
	border-radius: 7px;
	margin: 0 15px 0 0;
`;

export const ButtonHeaderContainer = styled.View`
	width: ${width}px;
	flex-direction: row;
	justify-content: flex-end;
	padding-top: 5px;
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
`;
export const Title = styled.Text`
	font-family: Semi_Bold;
	font-size: 24px;
	color: #333;
	margin: 0 0 0 15px;
`;

export const ModalContainer = styled.View`
	background-color: #fff;
	height: 100%;
	align-items: center;
	padding: 50px 0;
`;

export const ModalImage = styled.Image`
	margin: 20px 0;
`;

export const ModalDescription = styled.Text`
	text-align: center;
	font-family: Regular;
	font-size: 20px;
	padding: 0 5%;
	margin: 0 0 10%;
`;

export const ReviewContainer = styled(Animated.View)`
	padding: 15px 0 0;
	align-items: center;
	width: ${width}px;
`;

export const ValueContainer = styled.View`
	flex-direction: row;
	align-items: flex-end;
	width: 95%;
	height: 50px;
	border: 2px solid transparent;
	margin: 24px 0 2px;
	border-radius: 7px;
`;

export const Label = styled.Text`
	font-size: 18px;
	font-family: Bold;
	color: #000;
`;

export const LabelDescription = styled.Text`
	align-self: flex-start;
	font-size: 18px;
	font-family: Bold;
	color: #000;
`;

export const DescriptionContainer = styled.View`
	display: flex;
	width: 95%;
	height: 125px;
	border: 2px solid transparent;
	margin: 0 0 10px;
	border-radius: 7px;
`;

export const Value = styled.Text`
	font-family: Regular;
	font-size: 24px;
	margin: 0 0 0 5px;
`;

export const Description = styled.Text`
	font-family: Regular;
	font-size: 18px;
	height: 90px;
	width: 90%;
	color: #333;
	border: 1px solid #ccc;
	align-self: center;
	padding: 5px 0 0 5px;
`;

export const AnimetadeContainer = styled.View`
	position: relative;
`;

export const Warning = styled.Text`
	font-family: Regular;
	font-size: 16px;
	text-align: center;
	color: #333;
`;

export const Span = styled.Text`
	font-family: Bold;
	font-size: 16px;
	text-align: center;
	color: #222;
`;
