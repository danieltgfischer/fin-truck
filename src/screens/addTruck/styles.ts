import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { Form as UnForm } from '@unform/mobile';

const { width, height } = Dimensions.get('window');

export const scrollView = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 50,
		paddingBottom: 20,
	},
});

export const Container = styled.ScrollView`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const AddTruckContainer = styled.ScrollView`
	display: flex;
	height: ${height}px;
	width: ${width}px;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Image = styled.Image`
	margin: 10px 0 0;
`;

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
