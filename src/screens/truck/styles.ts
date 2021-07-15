import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width } = Dimensions.get('window');

export const flatListStyle = StyleSheet.create({
	content: {
		alignItems: 'center',
		width: '100%',
		paddingBottom: 50,
		paddingTop: 25,
	},
});

export const FlatList = styled.FlatList`
	flex: 1;
`;

export const Form = styled(UnForm)`
	align-items: center;
`;

export const Container = styled.SafeAreaView`
	display: flex;
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 24px;
	text-align: center;
	font-family: Italic;
	padding: 0 15px;
	margin: 0 0 15px;
`;

export const ButtonIcon = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	margin: 0 20px 0 0;
	padding: 10px;
	elevation: 7;
	border-radius: 7px;
	background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	width: ${width}px;
	justify-content: space-between;
	margin: 10px 0 20px;
	position: relative;
`;

export const RightView = styled.View`
	flex-direction: row;
`;

export const Image = styled.Image`
	height: 25px;
	width: 25px;
`;

export const HistoryButton = styled.TouchableOpacity`
	flex-direction: row;
	elevation: 10;
	align-items: center;
	padding: 5px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.secondary};
	border-radius: 7px;
	margin: 0 0 0 20px;
`;

export const HistoryLabel = styled.Text`
	font-family: Regular;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.text};
`;
