import React from 'react';
import { Button as StyledButton, ButtonLabel, CancelButton } from './styles';

interface IProps {
	buttonLabel: string;
	next?: boolean;
	onPress: () => void;
	cancel?: boolean;
	disabled?: boolean;
}

export const Button: React.FC<IProps> = ({
	buttonLabel,
	next = false,
	cancel = false,
	onPress,
	disabled = false,
}: IProps) => {
	if (cancel) {
		return (
			<CancelButton onPress={onPress} disabled={disabled}>
				<ButtonLabel disabled next={next} cancel={cancel}>
					{buttonLabel}
				</ButtonLabel>
			</CancelButton>
		);
	}
	return (
		<StyledButton next={next} onPress={onPress} disabled={disabled}>
			<ButtonLabel disabled next={next}>
				{buttonLabel}
			</ButtonLabel>
		</StyledButton>
	);
};
