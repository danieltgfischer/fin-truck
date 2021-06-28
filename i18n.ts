import { translations } from '@/config/intl';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const locale_code = Localization.locale.split('-')[0];
const lng = ['pt', 'en'].includes(locale_code) ? locale_code : 'en';

const resources = {
	pt: {
		translation: translations.pt,
	},
	en: {
		translation: translations.en,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
