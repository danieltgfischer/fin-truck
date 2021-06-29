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
import { formatNumber } from 'react-native-currency-input';
import { useSelector } from 'react-redux';
import { IState } from '@/store/types';
import { useMemo } from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
	Container,
	Error,
	Label,
	TextInput,
	TextInputContainer,
	Span,
	CurrencyInput,
} from './styles';

interface InputProps extends TextInputProps {
	name: string;
	label: string;
	numeric?: boolean;
	requiredLabel?: boolean;
	currency?: boolean;
}

interface InputReference extends TextInputNative {
	value: string;
}

export interface IInputRef {
	focus(): void;
}

const Input: React.ForwardRefRenderFunction<IInputRef, InputProps> = (
	{
		name,
		label,
		numeric = false,
		requiredLabel = false,
		currency = false,
		...rest
	}: InputProps,
	ref,
) => {
	const theme = useContext(ThemeContext);
	const { locale } = useSelector((state: IState) => state);
	const inputRef = useRef<InputReference>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [currencyValue, setValue] = useState();

	const currencyOption = useMemo(
		() => ({
			'pt-BR': {
				separator: ',',
				prefix: 'R$ ',
				precision: 2,
				delimiter: '.',
				signPosition: 'beforePrefix',
			},
			'en-US': {
				separator: '.',
				prefix: '$ ',
				precision: 2,
				delimiter: ',',
				signPosition: 'beforePrefix',
			},
		}),
		[],
	);

	function focus() {
		inputRef.current.focus();
	}

	useImperativeHandle(ref, () => ({
		focus,
	}));

	const { fieldName, registerField, error } = useField(name);

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputRef.current,
			getValue() {
				if (inputRef.current) return inputRef.current.value;
				return '';
			},
			setValue(ref, value) {
				if (currency && value) {
					inputRef.current.value = value;
					inputRef.current.setNativeProps({
						text: formatNumber(
							Number(value),
							currencyOption[locale.country_code],
						),
					});
					return;
				}
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
	}, [currency, currencyOption, fieldName, locale, numeric, registerField]);

	const handleChangeText = useCallback(
		(value: string) => {
			if (currency && inputRef.current) {
				inputRef.current.value = currencyValue
					? String(currencyValue)
					: undefined;
				return;
			}
			if (inputRef.current) inputRef.current.value = value;
		},
		[currency, currencyValue],
	);

	const delimiter = locale.country_code === 'pt-BR' ? '.' : ',';
	const separator = locale.country_code === 'pt-BR' ? ',' : '.';
	const prefix = locale.country_code === 'pt-BR' ? 'R$' : '$';
	// TODO fix input type
	return (
		<Container>
			{label && (
				<Label isFocused={isFocused}>
					{label}
					{requiredLabel && <Span>*</Span>}
				</Label>
			)}
			<TextInputContainer isFocused={isFocused}>
				{currency ? (
					<CurrencyInput
						value={currencyValue}
						delimiter={delimiter}
						separator={separator}
						keyboardAppearance={theme.name}
						prefix={prefix}
						precision={2}
						onChangeValue={setValue}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						selectionColor={theme.colors.text}
						ref={inputRef}
						onChangeText={handleChangeText}
						{...rest}
					/>
				) : (
					<TextInput
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						ref={inputRef}
						keyboardAppearance={theme.name}
						selectionColor={theme.colors.text}
						onChangeText={handleChangeText}
						{...rest}
					/>
				)}
				{error && <Error>{error}</Error>}
			</TextInputContainer>
		</Container>
	);
};

export default forwardRef(Input);
