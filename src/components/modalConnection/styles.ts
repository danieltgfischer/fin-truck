import styled from 'styled-components/native';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const scrollViewStyle = StyleSheet.create({
	content: {
		alignItems: 'center',
		minHeight: height,
	},
});

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background};
	height: ${height * 0.95}px;
	width: ${width * 0.9}px;
	padding: 5px 0 0;
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 5px 15px 0;
	z-index: 1;
	align-items: center;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 28px;
	font-family: Regular;
	text-align: center;
`;

export const Dot = styled.View`
	height: 10px;
	width: 10px;
	border-radius: 10px;
	margin: 0 10px 0 0;
	background-color: ${({ theme }) => theme.colors.text};
`;

export const Message = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Italic;
	text-align: center;
	padding: 25px 15px;
`;

export const Label = styled.Text`
	font-family: Semi_Bold;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.text};
`;

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 0 0 0 ${width * 0.1}px;
	width: ${width}px;
`;

export const ObservationTitle = styled(Animated.Text)`
	color: ${({ theme }) => theme.colors.text};
	font-size: 28px;
	font-family: Regular;
	text-align: center;
	margin: 15px 0 0;
`;
