import styled from 'styled-components/native';

export const Container = styled.View`
	height: 100%;
	width: 100%;
`;

export const ItemContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: baseline;
	width: 100%;
	padding: 15px 15px 10px;
	border: none;
	border-bottom-width: 1px;
	position: relative;
	border-color: #ccc;
	border-style: solid;
`;

export const ItemLabel = styled.Text`
	font-family: Semi_Bold;
	font-size: 26px;
	color: #333;
	padding: 0 0 0 10px;
`;

export const HeaderLabel = styled.Text`
	font-family: Bold;
	font-size: 30px;
	color: #b63b34;
	padding: 0 0 0 10px;
`;

export const Image = styled.Image`
	position: relative;
	top: -5px;
`;

export const HeaderContainer = styled.View`
	flex-direction: row;
	align-items: baseline;
	justify-content: center;
	width: 100%;
	padding: 15px 15px 10px;
	border: none;
	border-bottom-width: 1px;
	position: relative;
	border-color: #b63b34;
	border-style: solid;
`;
