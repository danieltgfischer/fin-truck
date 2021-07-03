import 'intl';
import './i18n';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import * as Icons from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { DatabaseConnectionProvider } from '@/hocs/databaseProvider';
import { Navigation } from '@/navigation/stack';
import store from '@/store';
import { LoadingContainer } from '@/navigation/style';
import { preloadImages } from '@/utils/preload-images';

// TODO type styled-components
// TODO teste with many yars months

const App: React.FC = () => {
	const [isReady, setIsReady] = useState(false);

	const cacheFonts = useCallback(fonts => {
		return fonts.map(font => Font.loadAsync(font));
	}, []);

	const cacheImages = useCallback(images => {
		return images.map(image => {
			if (typeof image === 'string') {
				return Image.prefetch(image);
			}
			return Asset.fromModule(image).downloadAsync();
		});
	}, []);

	const loadAssetsAsync = useCallback(async () => {
		const imageAssets = cacheImages(preloadImages);
		const fontAssets = cacheFonts([
			Icons.SimpleLineIcons.font,
			Icons.FontAwesome5.font,
			Icons.FontAwesome.font,
			Icons.Ionicons.font,
			Icons.AntDesign.font,
			Icons.Feather.font,
		]);
		await Promise.all([...imageAssets, ...fontAssets]);
	}, [cacheFonts, cacheImages]);

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
