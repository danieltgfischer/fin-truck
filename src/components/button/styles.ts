import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	background-color: ${({ next }) => (next ? '#266B32' : '#fff')};
	padding: 8px 25px;
	border-radius: 7px;
	margin: 0 10px;
	elevation: 10;
`;

export const CancelButton = styled.TouchableOpacity`
	background-color: #ff4136;
	padding: 8px 25px;
	border-radius: 7px;
	margin: 0 10px;
	elevation: 10;
`;

export const ButtonLabel = styled.Text`
	color: ${({ next, cancel }) => (next || cancel ? '#fff' : '#333')};
	font-size: 24px;
	text-align: center;
	font-family: Semi_Bold;
`;
