import React from 'react';
import { ItemContainer, ItemLabel, Image } from './styles';

interface IProps {
	name: string;
	onPress(): void;
	source?: string;
	textCenter?: boolean;
}

export const DrawerItem: React.FC<IProps> = ({
	name,
	onPress,
	source,
	textCenter = false,
}: IProps) => {
	return (
		<ItemContainer onPress={onPress}>
			<>
				{source && <Image source={source} />}
				<ItemLabel textCenter={textCenter}>{name}</ItemLabel>
			</>
		</ItemContainer>
	);
};
