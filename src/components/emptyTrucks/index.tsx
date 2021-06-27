import React, { FC } from 'react';
import { TranslationsValues } from '@/config/intl';
import I18n from 'i18n-js';
import { Label, Container } from './styles';

export const EmptyTrucks: FC = () => {
	return (
		<Container>
			<Label>{I18n.t(TranslationsValues.empty_trucks)}</Label>
		</Container>
	);
};
