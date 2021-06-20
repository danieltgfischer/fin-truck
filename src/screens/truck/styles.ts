import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width } = Dimensions.get('window');

export const flatListStyle = StyleSheet.create({
	content: { alignItems: 'center', width: '100%', paddingBottom: 50 },
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
	background-color: #fff;
`;

export const Title = styled.Text`
	color: #000;
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
	padding: 5px 7px;
	elevation: 7;
	border-radius: 7px;
	background-color: #fff;
`;

export const ContainerButtons = styled.View`
	flex-direction: row;
	width: ${width}px;
	justify-content: flex-end;
	margin: 10px 0 20px;
`;

export const Image = styled.Image`
	height: 50px;
	width: 50px;
`;
