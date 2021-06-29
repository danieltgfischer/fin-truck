import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Image = styled.Image`
	width: 50px;
	height: 50px;
`;

export const LanguageContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? lighten(0.05, theme.colors.background) : '#fafafa'};
	padding: 5%;
`;
