import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
		colors: {
			primary: string;
			secondary: string;
			background: string;
			text: string;
			empty_warning: string;
			buttons: {
				cancel: string;
				normal: string;
				next: string;
				labels: {
					next: string;
					cancel: string;
					normal: string;
				};
			};
		};
	}
}
