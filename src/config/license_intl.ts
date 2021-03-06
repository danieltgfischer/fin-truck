export enum TranslationsLicenseValues {
	WIFI = 'android.net.wifi',
	FAKETOUCH = 'android.hardware.faketouch',
	ACCESS_NETWORK_STATE = 'android.permission.ACCESS_NETWORK_STATE',
	INTERNET = 'android.permission.INTERNET',
	READ_APP_BADGE = 'android.permission.READ_APP_BADGE',
	READ_EXTERNAL_STORAGE = 'android.permission.READ_EXTERNAL_STORAGE',
	RECEIVE_BOOT_COMPLETED = 'android.permission.RECEIVE_BOOT_COMPLETED',
	SYSTEM_ALERT_WINDOW = 'android.permission.SYSTEM_ALERT_WINDOW',
	VIBRATE = 'android.permission.VIBRATE',
	WAKE_LOCK = 'android.permission.WAKE_LOCK',
	WRITE_EXTERNAL_STORAGE = 'android.permission.WRITE_EXTERNAL_STORAGE',
	UPDATE_COUNT = 'com.anddoes.launcher.permission.UPDATE_COUNT',
	RECEIVE = 'com.google.android.c2dm.permission.RECEIVE',
	BIND_GET_INSTALL_REFERRER_SERVICE = 'com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE',
	READ_SETTINGS = 'com.htc.launcher.permission.READ_SETTINGS',
	UPDATE_SHORTCUT = 'com.htc.launcher.permission.UPDATE_SHORTCUT',
	CHANGE_BADGE = 'com.huawei.android.launcher.permission.CHANGE_BADGE',
	READ_SETTINGS2 = 'com.huawei.android.launcher.permission.READ_SETTINGS',
	WRITE_SETTINGS = 'com.huawei.android.launcher.permission.WRITE_SETTINGS',
	UPDATE_BADGE = 'com.majeur.launcher.permission.UPDATE_BADGE',
	READ_SETTINGS3 = 'com.oppo.launcher.permission.READ_SETTINGS',
	WRITE_SETTINGS2 = 'com.oppo.launcher.permission.WRITE_SETTINGS',

	READ = 'com.sec.android.provider.badge.permission.READ',
	WRITE = 'com.sec.android.provider.badge.permission.WRITE',
	BROADCAST_BADGE = 'com.sonyericsson.home.permission.BROADCAST_BADGE',
	PROVIDER_INSERT_BADGE = 'com.sonymobile.home.permission.PROVIDER_INSERT_BADGE',
	BADGE_COUNT_READ = 'me.everything.badger.permission.BADGE_COUNT_READ',
	BADGE_COUNT_WRITE = 'me.everything.badger.permission.BADGE_COUNT_WRITE',
}

export const licensesTranslations = {
	en: {
		[TranslationsLicenseValues.WIFI]:
			"Provides classes to manage Wi-Fi functionality on the device. \n\nThe Wi-Fi APIs provide a means by which applications can communicate with the lower-level wireless stack that provides Wi-Fi network access. Almost all information from the device supplicant is available, including the connected network's link speed, IP address, negotiation state, and more, plus information about other networks that are available. Some other API features include the ability to scan, add, save, terminate and initiate Wi-Fi connections.",
		[TranslationsLicenseValues.FAKETOUCH]:
			'The app uses basic touch interaction events, such as tapping and dragging.\n\nWhen declared as required, this feature indicates that the app is compatible with a device only if that device emulates a touchscreen ("fake touch" interface) or has an actual touchscreen.\n\nA device that offers a fake touch interface provides a user input system that emulates a subset of a touchscreen\'s capabilities.For example, a mouse or remote control could drive an on- screen cursor.If your app requires basic point and click interaction(in other words, it won\'t work with only a d-pad controller), you should declare this feature. Because this is the minimum level of touch interaction, you can also use an app that declares this feature on devices that offer more complex touch interfaces.',
		[TranslationsLicenseValues.ACCESS_NETWORK_STATE]:
			'Allows applications to access information about networks.',
		[TranslationsLicenseValues.INTERNET]:
			'Allows applications to open network sockets.',
		[TranslationsLicenseValues.READ_APP_BADGE]: '',
		[TranslationsLicenseValues.READ_EXTERNAL_STORAGE]:
			'Allows an application to read from external storage.\n\nAny app that declares the WRITE_EXTERNAL_STORAGE permission is implicitly granted this permission.\n\nThis permission is enforced starting in API level 19. Before API level 19, this permission is not enforced and all apps still have access to read from external storage. You can test your app with the permission enforced by enabling Protect USB storage under Developer options in the Settings app on a device running Android 4.1 or higher.',
		[TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED]:
			"Allows an application to receive the Intent.ACTION_BOOT_COMPLETED that is broadcast after the system finishes booting. If you don't request this permission, you will not receive the broadcast at that time. Though holding this permission does not have any security implications, it can have a negative impact on the user experience by increasing the amount of time it takes the system to start and allowing applications to have themselves running without the user being aware of them. As such, you must explicitly declare your use of this facility to make that visible to the user.",
		[TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED]:
			'Allows an app to create windows using the type WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, shown on top of all other apps. Very few apps should use this permission; these windows are intended for system-level interaction with the user.',
		[TranslationsLicenseValues.SYSTEM_ALERT_WINDOW]:
			'Allows an app to create windows using the type WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, shown on top of all other apps. Very few apps should use this permission; these windows are intended for system-level interaction with the user.',
		[TranslationsLicenseValues.VIBRATE]: 'Allows access to the vibrator.',
		[TranslationsLicenseValues.WAKE_LOCK]:
			'Allows using PowerManager WakeLocks to keep processor from sleeping or screen from dimming.',
		[TranslationsLicenseValues.WRITE_EXTERNAL_STORAGE]:
			'Allows an application to write to external storage.',
		[TranslationsLicenseValues.UPDATE_COUNT]: '',
		[TranslationsLicenseValues.RECEIVE]:
			'Grants permission for our app to log and receive messages from Google Cloud Messaging. (What does c2dm mean? It means cloud messaging for the device, which is the now deprecated predecessor to gcm. GCM still uses c2dm in many of its permission strings.)',
		[TranslationsLicenseValues.BIND_GET_INSTALL_REFERRER_SERVICE]: '',
		[TranslationsLicenseValues.READ_SETTINGS]: '',
		[TranslationsLicenseValues.UPDATE_SHORTCUT]: '',
		[TranslationsLicenseValues.CHANGE_BADGE]: '',
		[TranslationsLicenseValues.READ_SETTINGS2]: '',
		[TranslationsLicenseValues.WRITE_SETTINGS]: '',
		[TranslationsLicenseValues.UPDATE_BADGE]: '',
		[TranslationsLicenseValues.READ_SETTINGS3]: '',
		[TranslationsLicenseValues.WRITE_SETTINGS2]: '',
		[TranslationsLicenseValues.READ]: '',
		[TranslationsLicenseValues.WRITE]: '',
		[TranslationsLicenseValues.BROADCAST_BADGE]: '',
		[TranslationsLicenseValues.PROVIDER_INSERT_BADGE]: '',
		[TranslationsLicenseValues.BADGE_COUNT_READ]: '',
		[TranslationsLicenseValues.BADGE_COUNT_WRITE]: '',
	},
	pt: {
		[TranslationsLicenseValues.WIFI]:
			'Oferece classes para gerenciar a funcionalidade Wi-Fi no dispositivo.\n\nAs APIs de Wi-Fi fornecem um meio pelo qual os aplicativos podem se comunicar com a pilha sem fio de n??vel inferior que fornece acesso ?? rede Wi-Fi. Quase todas as informa????es do suplicante do dispositivo est??o dispon??veis, incluindo a velocidade do link da rede conectada, endere??o IP, estado de negocia????o e muito mais, al??m de informa????es sobre outras redes dispon??veis. Alguns outros recursos da API incluem a capacidade de verificar, adicionar, salvar, encerrar e iniciar conex??es Wi-Fi.',
		[TranslationsLicenseValues.FAKETOUCH]:
			'O aplicativo usa eventos de intera????o por toque b??sicos, como tocar e arrastar.\n\nQuando declarado como obrigat??rio, esse recurso indica que o aplicativo ser?? compat??vel com um dispositivo somente se esse dispositivo emular uma touchscreen (???interface de toque simulada???) ou tiver uma touchscreen real.\n\nDispositivos que oferecem uma interface de toque simulada fornecem um sistema de entrada que emula um subconjunto dos recursos de uma touchscreen. Por exemplo, um mouse ou controle remoto pode acionar um cursor na tela. Se o aplicativo exigir intera????o b??sica do tipo apontar e clicar (em outras palavras, n??o funciona s?? com um controlador de bot??o direcional), declare esse recurso. Como esse ?? o n??vel m??nimo de intera????o de toque, voc?? pode usar um aplicativo que declara esse recurso em dispositivos que oferecem interfaces de toque mais complexas.',
		[TranslationsLicenseValues.ACCESS_NETWORK_STATE]:
			'Permite que os aplicativos acessem informa????es sobre redes.',
		[TranslationsLicenseValues.INTERNET]:
			'Permite que os aplicativos abram sockets de rede.',
		[TranslationsLicenseValues.READ_APP_BADGE]: '',
		[TranslationsLicenseValues.READ_EXTERNAL_STORAGE]:
			'Permite que um aplicativo leia do armazenamento externo.\n\n Qualquer aplicativo que declare a permiss??o WRITE_EXTERNAL_STORAGE recebe esta permiss??o implicitamente.\n\n Essa permiss??o ?? aplicada a partir da API de n??vel 19. Antes da API de n??vel 19, essa permiss??o n??o ?? aplicada e todos os aplicativos ainda t??m acesso para leitura de armazenamento externo. Voc?? pode testar seu aplicativo com a permiss??o aplicada ativando Proteger armazenamento USB em Op????es do desenvolvedor no aplicativo Configura????es em um dispositivo com Android 4.1 ou superior.',
		[TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED]:
			'Permite que um aplicativo receba o Intent.ACTION_BOOT_COMPLETED que ?? transmitido ap??s a inicializa????o do sistema. Se voc?? n??o solicitar essa permiss??o, n??o receber?? a transmiss??o naquele momento. Embora manter essa permiss??o n??o tenha implica????es de seguran??a, ela pode ter um impacto negativo na experi??ncia do usu??rio, aumentando o tempo que o sistema leva para iniciar e permitindo que os aplicativos sejam executados sem que o usu??rio perceba. Como tal, voc?? deve declarar explicitamente o uso deste recurso para torn??-lo vis??vel para o usu??rio.',
		[TranslationsLicenseValues.RECEIVE_BOOT_COMPLETED]:
			'Permite que um aplicativo crie janelas usando o tipo WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, mostrado na parte superior de todos os outros aplicativos. Muito poucos aplicativos devem usar essa permiss??o; essas janelas s??o destinadas ?? intera????o em n??vel de sistema com o usu??rio.',
		[TranslationsLicenseValues.SYSTEM_ALERT_WINDOW]:
			'Permite que um aplicativo crie janelas usando o tipo WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, mostrado na parte superior de todos os outros aplicativos. Muito poucos aplicativos devem usar essa permiss??o; essas janelas s??o destinadas ?? intera????o em n??vel de sistema com o usu??rio.',
		[TranslationsLicenseValues.VIBRATE]: 'Permite acesso ao vibrador.',
		[TranslationsLicenseValues.WAKE_LOCK]:
			'Permite o uso do PowerManager WakeLocks para evitar que o processador hiberne ou a tela diminua a luz.',
		[TranslationsLicenseValues.WRITE_EXTERNAL_STORAGE]:
			'Permite que um aplicativo grave no armazenamento externo.',
		[TranslationsLicenseValues.UPDATE_COUNT]: '',
		[TranslationsLicenseValues.RECEIVE]:
			'Concede permiss??o ao nosso aplicativo para registrar e receber mensagens de Google Cloud Messaging. (O que c2dm significa? Isso significa o sistema de mensagens da nuvem para o dispositivo, que ?? a predecessora agora preterida para gcm. O GCM ainda usa c2dm em muitas de suas cadeias de caracteres de permiss??o.)',
		[TranslationsLicenseValues.BIND_GET_INSTALL_REFERRER_SERVICE]: '',
		[TranslationsLicenseValues.READ_SETTINGS]: '',
		[TranslationsLicenseValues.CHANGE_BADGE]: '',
		[TranslationsLicenseValues.READ_SETTINGS2]: '',
		[TranslationsLicenseValues.UPDATE_SHORTCUT]: '',
		[TranslationsLicenseValues.WRITE_SETTINGS]: '',
		[TranslationsLicenseValues.UPDATE_BADGE]: '',
		[TranslationsLicenseValues.READ_SETTINGS3]: '',
		[TranslationsLicenseValues.WRITE_SETTINGS2]: '',
		[TranslationsLicenseValues.READ]: '',
		[TranslationsLicenseValues.WRITE]: '',
		[TranslationsLicenseValues.BROADCAST_BADGE]: '',
		[TranslationsLicenseValues.PROVIDER_INSERT_BADGE]: '',
		[TranslationsLicenseValues.BADGE_COUNT_READ]: '',
		[TranslationsLicenseValues.BADGE_COUNT_WRITE]: '',
	},
};
