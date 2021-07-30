import { lighten } from 'polished';
import styled from 'styled-components/native';

export const Image = styled.Image`
	width: 80px;
	height: 80px;
`;

export const Container = styled.View`
	width: 100%;
	min-width: 265px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? lighten(0.05, theme.colors.background) : '#fafafa'};
	padding: 5%;
`;
