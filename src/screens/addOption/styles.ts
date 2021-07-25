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
	modalContainer: {
		alignItems: 'center',
		height: '100%',
		paddingVertical: 50,
	},
});

export const Container = styled.ScrollView`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
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
	position: relative;
	top: 15px;
	align-items: center;
`;

export const IconButton = styled.TouchableOpacity`
	padding: 5px 10px;
	background-color: ${({ theme }) => theme.colors.secondary};
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
	color: ${({ theme }) => theme.colors.text};
	margin: 0 0 0 15px;
`;

export const ModalContainer = styled.ScrollView`
	background-color: ${({ theme }) => theme.colors.background};
`;

export const ModalImage = styled.Image`
	margin: 20px 0;
`;

export const ModalDescription = styled.Text`
	text-align: center;
	font-family: Regular;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.text};
	padding: 0 5%;
	margin: 0 0 10%;
`;

export const ReviewContainer = styled(Animated.View)`
	position: absolute;
	padding: 15px 0 0;
	align-items: center;
	width: ${width}px;
	margin: 16px 0 0;
	top: -10px;
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
	color: ${({ theme }) => theme.colors.text};
`;

export const LabelDescription = styled.Text`
	align-self: flex-start;
	font-size: 18px;
	font-family: Bold;
	color: ${({ theme }) => theme.colors.text};
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
	color: ${({ theme }) => theme.colors.text};
	font-size: 24px;
	margin: 0 0 0 5px;
`;

export const Description = styled.Text`
	font-family: Regular;
	font-size: 18px;
	height: 90px;
	width: 90%;
	color: ${({ theme }) => theme.colors.text};
	border: 1px solid #ccc;
	align-self: center;
	padding: 5px 0 0 5px;
	margin: 10px 0 0;
`;

export const AnimetadeContainer = styled(Animated.View)`
	position: relative;
`;
