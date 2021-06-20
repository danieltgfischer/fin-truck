import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Month = styled.Text`
	color: #fff;
	background-color: #b63b34;
	padding: 2.5px 0;
	width: 50%;
	text-align: center;
	margin: 5px 0%;
	font-family: Regular;
	font-size: 18px;
`;

export const Line = styled.View`
	width: 15%;
	height: 1px;
	padding: 0 10%;
	background-color: #b63b34;
	margin: 0 2%;
`;

export const FlatList = styled.FlatList`
	padding: 25px 0 50px;
`;
