import React, { useState } from 'react';
import { Modal } from 'react-native';
import { format } from 'date-fns';
import usLocale from 'date-fns/locale/en-US';
import ptLocale from 'date-fns/locale/pt-BR';
import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { Modal as StyledModal } from '@/components/modal';
import { EditBilling } from '../editBilling';
import { DeleteOption } from '../deleteOption';
import {
	Container,
	TimelineContainer,
	Line,
	Image,
	InfoContainer,
	ImageContainer,
	Date,
	Description,
	Value,
} from './styles';

interface IProps {
	value: number;
	description: string;
	created_at: Date;
	source: string;
	id: string;
}

export const BillingItem: React.FC<IProps> = ({
	value,
	description,
	created_at,
	id,
	source,
}: IProps) => {
	const [isEditModalVisible, setEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const { locale: localeApp } = useSelector((state: IState) => state);
	const localeFormat =
		localeApp === 'pt-BR' ? "'Dia' d',' EEEE 'às ' HH:mm " : 'DD:MM a';
	const locale = localeApp === 'pt-BR' ? ptLocale : usLocale;

	return (
		<>
			<Container>
				<TimelineContainer>
					<Line />
					<ImageContainer>
						<Image source={source} />
					</ImageContainer>
				</TimelineContainer>
				<InfoContainer>
					<Date>{format(created_at, localeFormat, { locale })}</Date>
					<Value>R$ {value}</Value>
					<Description>{description}</Description>
				</InfoContainer>
			</Container>
			<Modal visible={isEditModalVisible} animationType="slide">
				<EditBilling closeModal={() => setEditModalVisible(false)} />
			</Modal>
			<StyledModal
				visible={isDeleteModalVisible}
				animationType="fade"
				statusBarTranslucent
				transparent
			>
				<DeleteOption
					closeModal={() => setDeleteModalVisible(false)}
					id={id}
					value={value}
					source={source}
				/>
			</StyledModal>
		</>
	);
};
