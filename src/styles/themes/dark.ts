import { DefaultTheme } from 'styled-components';
import { darken, lighten } from 'polished';
// b80c09
const theme: DefaultTheme = {
	name: 'dark',
	colors: {
		primary: darken(0.2, '#b63b34'),
		secondary: lighten(0.1, '#040F16'),
		background: '#040F16',
		text: '#E1E1E3',
		empty_warning: '#aaa',
		buttons: {
			cancel: darken(0.2, '#ff4136'),
			normal: '#E1E1E3',
			next: darken(0.2, '#266B32'),
			labels: {
				next: '#E1E1E3',
				cancel: '#E1E1E3',
				normal: '#040F16',
			},
		},
	},
};

export default theme;
