import React, { FC } from 'react';
import { TranslationsValues } from '@/config/intl';
import { useTranslation } from 'react-i18next';
import { Label, Container } from './styles';

export const EmptyTrucks: FC = () => {
	const { t } = useTranslation();

	return (
		<Container>
			<Label>{t(TranslationsValues.empty_trucks)}</Label>
		</Container>
	);
};
