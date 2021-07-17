import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const LikeContainer = styled.View`
	align-items: center;
	justify-content: flex-start;
	height: ${height * 0.6}px;
	width: ${width * 0.9}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const LikeLabel = styled.Text`
	font-family: Italic;
	font-size: 24px;
	text-align: center;
	padding: 10px 0 0;
	color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 5px 15px 0;
	z-index: 1;
`;
