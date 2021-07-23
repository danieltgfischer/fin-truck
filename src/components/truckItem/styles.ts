import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	width: 100px;
	height: 125px;
	elevation: 10;
	background: ${({ theme }) => theme.colors.secondary};
	/* margin: 3%; */
	align-items: center;
	justify-content: space-around;
	border-radius: 7px;
`;

export const Name = styled.Text`
	text-align: center;
	font-family: Bold;
	font-size: 15px;
	padding: 5px;
	color: ${({ theme }) => theme.colors.text};
`;

export const Board = styled.Text`
	text-align: center;
	font-family: Semi_Bold;
	color: ${({ theme }) => theme.colors.text};
	font-size: 15px;
`;

export const Image = styled.Image``;
