import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
interface ILoading {
	theme?: any;
}
export const LoadingContainer = styled.View<ILoading>`
	background: ${props => props?.theme?.colors?.background || '#b63b34'};
	width: ${width}px;
	height: ${height}px;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ButtonIcon = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	margin: 0 20px 0 0;
	padding: 5px 7px;
	elevation: 7;
	border-radius: 7px;
	background: ${({ theme }) => theme.colors.background};
`;

export const MenuButton = styled.TouchableOpacity`
	margin-left: 15px;
`;
