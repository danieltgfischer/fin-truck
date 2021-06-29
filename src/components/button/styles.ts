import styled from 'styled-components/native';

interface INext {
	next: boolean;
}

interface IButtonLabel extends INext {
	cancel?: boolean;
}

export const Button = styled.TouchableOpacity<INext>`
	background-color: ${({ next, theme }) =>
		next ? theme.colors.buttons.next : theme.colors.buttons.normal};
	padding: 8px 25px;
	border-radius: 7px;
	margin: 0 10px;
	elevation: 10;
`;

export const CancelButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.buttons.cancel};
	padding: 8px 25px;
	border-radius: 7px;
	margin: 0 10px;
	elevation: 10;
`;

export const ButtonLabel = styled.Text<IButtonLabel>`
	color: ${({ next, cancel, theme }) =>
		next || cancel
			? theme.colors.buttons.labels.next
			: theme.colors.buttons.labels.normal};
	font-size: 24px;
	text-align: center;
	font-family: Semi_Bold;
`;
