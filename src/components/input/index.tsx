import React, {
	useRef,
	useEffect,
	useCallback,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { TextInputProps, TextInput as TextInputNative } from 'react-native';
import { useField } from '@unform/core';
import {
	Container,
	Error,
	Label,
	TextInput,
	TextInputContainer,
	Span,
} from './styles';

interface InputProps extends TextInputProps {
	name: string;
	label: string;
	numeric?: boolean;
	requiredLabel?: boolean;
}

interface InputReference extends TextInputNative {
	value: string;
}

export interface IInputRef {
	focus(): void;
}

const Input: React.ForwardRefRenderFunction<IInputRef, InputProps> = (
	{ name, label, numeric = false, requiredLabel = false, ...rest }: InputProps,
	ref,
) => {
	const inputRef = useRef<InputReference>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	function focus() {
		inputRef.current.focus();
	}

	useImperativeHandle(ref, () => ({
		focus,
	}));

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
	}, [fieldName, numeric, registerField]);

	const handleChangeText = useCallback((value: string) => {
		if (inputRef.current) inputRef.current.value = value;
	}, []);

	return (
		<Container>
			{label && (
				<Label isFocused={isFocused}>
					{label}
					{requiredLabel && <Span>*</Span>}
				</Label>
			)}
			<TextInputContainer isFocused={isFocused}>
				<TextInput
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					ref={inputRef}
					onChangeText={handleChangeText}
					defaultValue={defaultValue}
					{...rest}
				/>
				{error && <Error>{error}</Error>}
			</TextInputContainer>
		</Container>
	);
};

export default forwardRef(Input);
