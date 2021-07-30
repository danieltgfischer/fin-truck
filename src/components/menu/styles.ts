import styled from 'styled-components/native';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { darken, lighten } from 'polished';

const { height, width } = Dimensions.get('window');

export const scrollStyle = StyleSheet.create({
	content: {
		width,
		alignItems: 'flex-start',
		paddingBottom: 25,
	},
});

export const ScrollView = styled.ScrollView``;

export const Container = styled(Animated.View)`
	position: absolute;
	height: 90%;
	width: 100%;
	/* width: ${width}px; */
	z-index: 1;
	align-items: center;
	background: ${props => props.theme.colors.background};
	bottom: 0;
	padding: 5px 0 0;
	border-top-width: 0.3px;
	border-top-color: ${({ theme }) =>
		theme.name === 'dark' ? darken(0.05, theme.colors.text) : 'transparent'};
	elevation: 15;
`;

export const ButtonIcon = styled.TouchableOpacity`
	margin: 0 30px 25px;
	width: 50px;
	height: 50px;
	align-self: flex-end;
`;

export const Rotate = styled(Animated.View)`
	width: 50px;
	height: 50px;
	align-self: flex-end;
	margin-top: 15px;
`;

export const Label = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Semi_Bold;
	margin: 10px 0 0 15px;
	align-self: flex-start;
`;

export const ContainerMenu = styled.View`
	width: 100%;
	align-items: stretch;
	padding: 0 5%;
`;
export const LabelLink = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Semi_Bold;
	width: 100%;
	text-align: center;
`;

export const ButtonLink = styled.TouchableOpacity`
	align-items: center;
	width: 100%;
	justify-content: center;
`;

export const ContainerLink = styled.View`
	width: 100%;
	min-width: 280px;
	padding: 5px 5px 15px;
	margin: 5px 0;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? lighten(0.05, theme.colors.background) : '#fafafa'};
`;

export const CancelSubscriptionButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.buttons.cancel};
	align-self: center;
	margin: 15px 0 25px;
	align-items: center;
	padding: 10px 20px;
	border-radius: 7px;
`;

export const LabelButton = styled.Text`
	color: #fafafa;
	font-size: 24px;
	font-family: Regular;
`;

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
	padding: 5px 15px 0;
	z-index: 1;
`;

export const CancelSubscriptionContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.background};
	width: ${width * 0.9}px;
	justify-content: space-around;
	height: ${height * 0.55}px;
`;

export const SubscriptionTitle = styled(Animated.Text)`
	color: ${({ theme }) => theme.colors.text};
	font-size: 28px;
	font-family: Regular;
	text-align: center;
	margin: 15px 0 0;
`;

export const Message = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-size: 20px;
	font-family: Italic;
	text-align: center;
	padding: 25px 15px;
`;
