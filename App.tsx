import 'intl';
import './i18n';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Icons from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { DatabaseConnectionProvider } from '@/hocs/databaseProvider';
import { Navigation } from '@/navigation/stack';
import store from '@/store';
import { LoadingContainer } from '@/navigation/style';

// TODO dark theme #18191A #F5F6F7
// TODO type styled-components
// TODO export db to xls
// TODO push notification

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
				<AppLoading
					startAsync={loadAssetsAsync}
					onFinish={() => setIsReady(true)}
					onError={console.warn}
				/>
				<ActivityIndicator color="#fff" size="large" />
			</LoadingContainer>
		);
	}

	return (
		<Provider store={store}>
			<DatabaseConnectionProvider>
				<Navigation />
			</DatabaseConnectionProvider>
		</Provider>
	);
};

export default App;
