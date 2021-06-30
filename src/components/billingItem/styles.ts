import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

interface IContainer {
	even: boolean;
}

export const Container = styled.View<IContainer>`
	width: ${width}px;
	flex-direction: row;
	position: relative;
	align-items: flex-start;
	justify-content: flex-start;
	background: ${({ even, theme }) =>
		even ? theme.colors.background : theme.colors.secondary};
	padding: 20px 0;
`;

export const TimelineContainer = styled(Animated.View)`
	position: relative;
	align-items: center;
	width: ${width * 0.25}px;
	background: transparent;
`;

export const InfoContainer = styled(Animated.View)`
	position: relative;
	align-items: flex-start;
	top: 15px;
	padding: 20px 0 20px;
	width: ${width * 0.75}px;
	background: transparent;
`;

export const Line = styled.View`
	height: 100px;
	width: 1px;
	background-color: ${({ theme }) => theme.colors.text};
`;

interface IImage {
	source: string;
}

export const Image = styled.Image<IImage>`
	height: 45px;
	width: 45px;
`;

export const ImageContainer = styled.View`
	align-items: center;
	justify-content: center;
	border: 1px solid ${({ theme }) => theme.colors.text};
	padding: 10px;
	border-radius: 40px;
	margin: 10px 0;
`;

export const Date = styled.Text`
	position: relative;
	font-size: 18px;
	font-family: Semi_Bold;
	align-self: flex-start;
	top: -25px;
	left: -20px;
	color: ${({ theme }) => theme.colors.text};
`;
export const Value = styled.Text`
	font-family: Semi_Bold;
	position: relative;
	font-size: 22px;
	left: 5px;
	top: -15px;
	color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.Text`
	position: relative;
	text-align: left;
	color: ${({ theme }) => theme.colors.text};
	width: 100%;
	left: -15px;
	font-size: 18px;
	font-family: Regular;
	padding: 0 15px 0 25px;
	border-top-width: 1px;
	border-top-color: ${({ theme }) => theme.colors.text};
	margin: 0 5px;
	padding: 5px 0;
	flex: 1;
`;

export const ButtonIcon = styled.TouchableOpacity<IContainer>`
	justify-content: center;
	align-items: center;
	margin: 0 20px 0 0;
	padding: 5px 7px;
	elevation: 7;
	border-radius: 7px;
	background-color: ${({ even, theme }) =>
		even ? theme.colors.secondary : theme.colors.background};
	padding: 10px;
	z-index: 1;
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	top: 0;
	right: 0px;
	padding: 0 10px 0 0;
	top: -40px;
	width: 100%;
`;
