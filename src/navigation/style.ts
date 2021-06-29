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
	width: 50px;
	height: 50px;
	margin: 0 30px 15px;
	align-self: flex-end;
`;

export const MenuButton = styled.TouchableOpacity`
	margin-left: 15px;
`;
