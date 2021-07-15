import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width, height } = Dimensions.get('window');

export const scrollView = StyleSheet.create({
	content: {
		alignItems: 'center',
		paddingHorizontal: 50,
		paddingVertical: 20,
	},
});

export const Container = styled.View`
	height: ${height}px;
	width: ${width}px;
`;

export const AddTruckContainer = styled.ScrollView`
	display: flex;
	height: ${height}px;
	width: ${width}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Image = styled.Image``;

export const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${width}px;
	margin: 32px 0 0;
`;

export const Form = styled(UnForm)`
	align-items: center;
`;
