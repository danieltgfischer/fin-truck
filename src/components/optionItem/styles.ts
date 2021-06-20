import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	width: 110px;
	height: 125px;
	elevation: 10;
	background: #fff;
	margin: 8px;
	align-items: center;
	justify-content: center;
	border-radius: 7px;
`;

export const Name = styled.Text`
	text-align: center;
	font-family: Regular;
	font-size: ${({ big_name }) => (big_name ? '14px' : '20px')};
	padding: 5px;
	color: #333;
`;

export const Image = styled.Image`
	height: 54px;
	width: 54px;
`;
