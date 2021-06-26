import 'intl';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import React, { useCallback, useState } from 'react';
import * as Font from 'expo-font';
import I18n from 'i18n-js';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { DatabaseConnectionProvider } from '@/hocs/databaseProvider';
import { Navigation } from '@/navigation/stack';
import store from '@/store';
import * as Icons from '@expo/vector-icons';
import { LoadingContainer } from '@/navigation/style';
import { ActivityIndicator } from 'react-native';

// TODO intl
// TODO preload images
// TODO change ActiveIndicator to expo AppLoafind

const App: React.FC = () => {
	const [isReady, setIsReady] = useState(false);
	const cacheFonts = useCallback(fonts => {
		return fonts.map(font => Font.loadAsync(font));
	}, []);

	const loadAssetsAsync = useCallback(async () => {
		const fontAssets = cacheFonts([
			Icons.SimpleLineIcons.font,
			Icons.FontAwesome5.font,
			Icons.Ionicons.font,
			Icons.AntDesign.font,
			Icons.Feather.font,
		]);
		await Promise.all([...fontAssets]);
	}, [cacheFonts]);

	if (!isReady) {
		return (
			<LoadingContainer>
				<ActivityIndicator color="#fff" size="large" />
				<AppLoading
					startAsync={loadAssetsAsync}
					onFinish={() => setIsReady(true)}
					onError={console.warn}
				/>
			</LoadingContainer>
		);
	}

	I18n.translations = {
		ru: {
			NUMBER_FORMAT: {
				precision: 2,
				separator: ',',
				delimiter: ' ',
				strip_insignificant_zeros: false,
			},
		},
		en: {
			NUMBER_FORMAT: {
				precision: 2,
				delimiter: '.',
				separator: ',',
				strip_insignificant_zeros: false,
			},
		},
	};

	return (
		<Provider store={store}>
			<DatabaseConnectionProvider>
				<Navigation />
			</DatabaseConnectionProvider>
		</Provider>
	);
};

export default App;
