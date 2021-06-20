import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
`;

export const Button = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	flex-direction: row;
	z-index: 100;
`;

export const Year = styled.Text`
	background-color: #fff;
	padding: 5px 12.5%;
	margin: 15px 0%;
	border: 0.8px solid #333;
	border-radius: 7px;
	font-family: Regular;
	font-size: 18px;
`;

export const Line = styled.View`
	width: 28%;
	height: 1px;
	padding: 0 15px;
	background-color: #333;
	margin: 0 2%;
`;

export const SubHeader = styled.View`
	padding: 0 15px 18px;
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

export const Label = styled.Text`
	font-family: Semi_Bold;
	font-size: 18px;
	color: #333;
`;

export const FlatList = styled.FlatList``;
