import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const scrollViewStyle = StyleSheet.create({
	upgradeScrollContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: height * 0.6,
	},
	upgradScroll: {
		top: -75,
	},
});

export const UpgradeDescription = styled.Text`
	font-family: Italic;
	padding: 10px 0 0;
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	text-align: center;
	padding: 0 35px;
	margin: 20px 0 0;
`;

export const UpgradeTitle = styled.Text`
	font-size: 28px;
	font-family: Regular;
	text-align: center;
	padding: 0 5px;
	color: ${({ theme }) => theme.colors.text};
`;

export const UpgradeLabel = styled.Text`
	font-size: 20px;
	font-family: Semi_Bold;
	text-align: left;
	padding: 0 5px;
	color: ${({ theme }) => theme.colors.text};
`;

export const UpgradeContainer = styled.View`
	align-items: center;
	justify-content: flex-start;
	height: ${height * 0.9}px;
	width: ${width * 0.9}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const UpgradeRow = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 5px 0 0;
	width: 80%;
`;

export const Dot = styled.View`
	height: 10px;
	width: 10px;
	border-radius: 10px;
	margin: 0 10px 0 0;
	background-color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 5px 15px 0;
	z-index: 1;
`;
