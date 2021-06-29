import styled from 'styled-components/native';

export const DrawerContainer = styled.TouchableWithoutFeedback`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.View`
	justify-content: space-between;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};
	width: 100%;
`;

export const DrawerContentContainer = styled.View`
	justify-content: space-between;
	height: 100%;
`;

export const ItemContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: baseline;
	width: 100%;
	padding: 15px 15px 10px;
	border: none;
	border-bottom-width: 1px;
	position: relative;
	border-color: ${({ theme }) =>
		theme.name === 'dark' ? theme.colors.text : '#ccc'};
	border-style: solid;
`;

export const ButtonIcon = styled.TouchableOpacity`
	margin: 0 30px;
`;

export const MenuButtonsContainer = styled.View`
	width: 100%;
`;

export const MenuConfigContainer = styled.View`
	width: 100%;
`;

export const ItemLabel = styled.Text`
	font-family: Semi_Bold;
	font-size: 26px;
	color: ${({ theme }) => theme.colors.text};
	padding: 0 0 0 10px;
`;

export const HeaderLabel = styled.Text`
	font-family: Bold;
	font-size: 30px;
	color: #b63b34;
	padding: 0 0 0 10px;
`;

interface IImage {
	source: string;
}

export const Image = styled.Image<IImage>`
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
	border-color: #ccc;
	border-style: solid;
`;

export const LanguageContainer = styled.View`
	width: 100%;
`;
