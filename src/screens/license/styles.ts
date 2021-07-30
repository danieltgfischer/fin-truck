import { lighten } from 'polished';
import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const scrollStyle = StyleSheet.create({
	content: {
		width,
		paddingBottom: 25,
	},
});

export const ScrollView = styled.ScrollView``;

export const Container = styled.View`
	height: ${height}px;
	width: ${width}px;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: flex-start;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 32px;
	margin: 15px 0;
`;

interface IButton {
	even: boolean;
}

export const Button = styled.TouchableOpacity<IButton>`
	width: ${width}px;
	margin: 10px 0 0;
	padding: 15px 5px;
	justify-content: flex-start;
	background-color: ${({ theme, even }) =>
		even ? theme.colors.background : lighten(0.05, theme.colors.background)};
`;

export const LicenseName = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 24px;
	padding: 0 0 0 15px;
`;
