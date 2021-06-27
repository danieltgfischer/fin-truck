import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const flatListStyle = StyleSheet.create({
	content: { alignItems: 'center', width: '100%' },
});

export const FlatList = styled.FlatList`
	flex: 1;
`;

export const Container = styled.SafeAreaView`
	height: 100%;
	width: 100%;
	position: relative;
`;

export const HomeContainer = styled.View`
	height: 100%;
	width: 100%;
	background-color: #fff;
	padding: 20px 0 0;
`;

export const Title = styled.Text`
	color: #333;
	font-size: 24px;
	text-align: center;
	font-family: 'Italic';
`;

export const Footer = styled.View`
	flex-direction: row;
	position: relative;
	justify-content: space-between;
	align-items: center;
	height: 100px;
	padding: 15px 0 0;
`;

export const ButtonIcon = styled.TouchableOpacity`
	margin: 0 30px;
`;

export const FooterLabel = styled.Text`
	font-family: 'Italic';
	position: absolute;
	font-size: 18px;
	text-align: center;
	width: ${width * 0.55}px;
	left: 50px;
	top: -35px;
`;

export const EmptyCell = styled.View`
	width: 100px;
	height: 125px;
	background: transparent;
	margin: 3%;
`;

export const FooterAddContainer = styled.View`
	position: relative;
`;

export const CloseMenuContainer = styled.TouchableWithoutFeedback``;
