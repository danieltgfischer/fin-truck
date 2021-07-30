import { TranslationsLicenseValues } from '@/config/license_intl';
import i18n from 'i18next';

export default [
	{
		license: TranslationsLicenseValues.ACCESS_NETWORK_STATE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.ACCESS_NETWORK_STATE, { lng }),
	},
	{
		license: TranslationsLicenseValues.BADGE_COUNT_READ,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.BADGE_COUNT_READ, { lng }),
	},
	{
		license: TranslationsLicenseValues.BADGE_COUNT_WRITE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.BADGE_COUNT_WRITE, { lng }),
	},
	{
		license: TranslationsLicenseValues.BIND_GET_INSTALL_REFERRER_SERVICE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.BIND_GET_INSTALL_REFERRER_SERVICE, {
				lng,
			}),
	},
	{
		license: TranslationsLicenseValues.BROADCAST_BADGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.BROADCAST_BADGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.CHANGE_BADGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.CHANGE_BADGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.FAKETOUCH,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.FAKETOUCH, { lng }),
	},
	{
		license: TranslationsLicenseValues.INTERNET,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.INTERNET, { lng }),
	},
	{
		license: TranslationsLicenseValues.PROVIDER_INSERT_BADGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.PROVIDER_INSERT_BADGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ_APP_BADGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ_APP_BADGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ_EXTERNAL_STORAGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ_EXTERNAL_STORAGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ_SETTINGS,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ_SETTINGS, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ_SETTINGS2,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ_SETTINGS2, { lng }),
	},
	{
		license: TranslationsLicenseValues.READ_SETTINGS3,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.READ_SETTINGS3, { lng }),
	},
	{
		license: TranslationsLicenseValues.RECEIVE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.RECEIVE, { lng }),
	},
	{
		license: TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED, { lng }),
	},
	{
		license: TranslationsLicenseValues.SYSTEM_ALERT_WINDOW,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.SYSTEM_ALERT_WINDOW, { lng }),
	},
	{
		license: TranslationsLicenseValues.UPDATE_BADGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.UPDATE_BADGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.UPDATE_COUNT,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.UPDATE_COUNT, { lng }),
	},
	{
		license: TranslationsLicenseValues.UPDATE_SHORTCUT,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.UPDATE_SHORTCUT, { lng }),
	},
	{
		license: TranslationsLicenseValues.VIBRATE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.VIBRATE, { lng }),
	},
	{
		license: TranslationsLicenseValues.WAKE_LOCK,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WAKE_LOCK, { lng }),
	},
	{
		license: TranslationsLicenseValues.WIFI,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WIFI, { lng }),
	},
	{
		license: TranslationsLicenseValues.WRITE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WRITE, { lng }),
	},
	{
		license: TranslationsLicenseValues.WRITE_EXTERNAL_STORAGE,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WRITE_EXTERNAL_STORAGE, { lng }),
	},
	{
		license: TranslationsLicenseValues.WRITE_SETTINGS,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WRITE_SETTINGS, { lng }),
	},
	{
		license: TranslationsLicenseValues.WRITE_SETTINGS2,
		description: (lng: string): string =>
			i18n.t(TranslationsLicenseValues.WRITE_SETTINGS2, { lng }),
	},
];
