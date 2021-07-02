import { darken } from 'polished';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

export const flatListStyle = StyleSheet.create({
	content: {
		paddingVertical: 25,
	},
});

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Month = styled.Text`
	color: #fff;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.2, '#b63b34') : '#b63b34'};
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
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.2, '#b63b34') : '#b63b34'};
	margin: 0 2%;
`;

export const FlatList = styled.FlatList`
	max-height: ${height}px;
`;

export const EmptyData = styled.Text`
	color: ${({ theme }) => theme.colors.empty_warning};
	font-size: 20px;
	font-family: Italic;
	text-align: center;
	padding: 5% 10%;
`;

export const SubHeader = styled.View`
	padding: 0 15px 18px;
`;

export const Label = styled.Text`
	font-family: Semi_Bold;
	font-size: 18px;
	color: ${({ theme }) => theme.colors.text};
`;

interface IValue {
	color: string;
}
export const Value = styled.Text`
	color: ${({ color }: IValue) => color};
	padding: 0 0 0 15px;
	font-family: Semi_Bold_Italic;
	font-size: 24px;
`;

export const ButtonDBContainer = styled.View`
	align-items: center;
`;

export const DatabseExportButton = styled.TouchableOpacity`
	padding: 10px;
`;

export const ExportDatabaseContainer = styled.View`
	padding: 15px 0;
	flex-direction: row;
	justify-content: space-around;
`;
