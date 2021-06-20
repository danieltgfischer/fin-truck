import React, { FC } from 'react';
import { Label, Container } from './styles';

export const EmptyTrucks: FC = () => {
	return (
		<Container>
			<Label>Você ainda não adicinou um caminhão</Label>
		</Container>
	);
};
