import React, {
	useRef,
	useEffect,
	useCallback,
	useState,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { TextInputProps, TextInput as TextInputNative } from 'react-native';
import { useField } from '@unform/core';
import { Container, Label, TextInput, TextInputContainer } from './styles';

export interface InputProps extends TextInputProps {
	name: string;
	label: string;
}

interface InputReference extends TextInputNative {
	value: string;
}

export interface IInputRef {
	focus(): void;
}

const MultiInput: React.ForwardRefRenderFunction<IInputRef, InputProps> = (
	{ name, label, onChangeText, ...rest }: InputProps,
	ref,
) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const inputRef = useRef<InputReference>(null);

	const { fieldName, registerField, defaultValue = '', error } = useField(name);

	useEffect(() => {
		if (inputRef.current) inputRef.current.value = defaultValue;
	}, [defaultValue]);

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputRef.current,
			getValue() {
				if (inputRef.current) return inputRef.current.value;

				return '';
			},
			setValue(ref, value) {
				if (inputRef.current) {
					inputRef.current.setNativeProps({ text: value });
					inputRef.current.value = value;
				}
			},
			clearValue() {
				if (inputRef.current) {
					inputRef.current.setNativeProps({ text: '' });
					inputRef.current.value = '';
				}
			},
		});
	}, [fieldName, registerField]);

	const handleChangeText = useCallback(
		(value: string) => {
			if (inputRef.current) inputRef.current.value = value;

			if (onChangeText) onChangeText(value);
		},
		[onChangeText],
	);

	function focus() {
		inputRef.current.focus();
	}

	useImperativeHandle(ref, () => ({
		focus,
	}));

	return (
		<Container>
			{label && <Label isFocused={isFocused}>{label}</Label>}
			<TextInputContainer isFocused={isFocused}>
				<TextInput
					multiline
					selectionColor="#333"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					ref={inputRef}
					onChangeText={handleChangeText}
					defaultValue={defaultValue}
					{...rest}
				/>
			</TextInputContainer>
		</Container>
	);
};

export default forwardRef(MultiInput);
