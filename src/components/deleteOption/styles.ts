import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
	align-items: center;
	justify-content: flex-start;
	width: ${width * 0.95}px;
	height: ${height * 0.5}px;
	background-color: ${({ theme }) => theme.colors.background};
	padding: 5% 0 0;
	justify-content: flex-start;
	border-radius: 7px;
`;

interface IImage {
	source: string;
}
export const Image = styled.Image<IImage>`
	height: 80px;
	width: 80px;
	margin: 0 0 15px;
`;

export const Value = styled.Text`
	font-family: Semi_Bold;
	position: relative;
	align-self: center;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.text};
	margin: 15px 0 0;
`;

export const Label = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-family: Semi_Bold;
	padding: 0 15px;
	font-size: 20px;
	text-align: center;
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	margin: 20px 0 0;
`;

export const Description = styled.Text`
	position: relative;
	text-align: center;
	color: ${({ theme }) => theme.colors.text};
	width: 100%;
	font-size: 18px;
	font-family: Regular;
	padding: 0 15px 0 25px;
`;
