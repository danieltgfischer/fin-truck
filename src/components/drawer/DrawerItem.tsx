import React from 'react';
import { ItemContainer, ItemLabel, Image } from './styles';

interface IProps {
	name: string;
	onPress(): void;
	source: string;
}

export const DrawerItem: React.FC<IProps> = ({
	name,
	onPress,
	source,
}: IProps) => {
	return (
		<ItemContainer onPress={onPress}>
			<>
				<Image source={source} />
				<ItemLabel>{name}</ItemLabel>
			</>
		</ItemContainer>
	);
};
