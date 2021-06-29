import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	width: 110px;
	height: 125px;
	elevation: 10;
	background: ${({ theme }) => theme.colors.secondary};
	margin: 8px;
	align-items: center;
	justify-content: center;
	border-radius: 7px;
`;

interface IName {
	big_name: boolean;
}
export const Name = styled.Text<IName>`
	text-align: center;
	font-family: Regular;
	font-size: ${({ big_name }) => (big_name ? '14px' : '20px')};
	padding: 5px;
	color: ${({ theme }) => theme.colors.text};
`;

interface IImage {
	source: string;
}

export const Image = styled.Image<IImage>`
	height: 54px;
	width: 54px;
`;
