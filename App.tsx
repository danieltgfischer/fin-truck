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
import { ServicesConnectionProvider } from '@/hocs/servicesProvider';
import { Navigation } from '@/navigation/stack';
import store from '@/store';
import { LoadingContainer } from '@/navigation/style';
import { preloadImages } from '@/utils/preload-images';
import {
	finishTransactionAsync,
	IAPResponseCode,
	setPurchaseListener,
} from 'expo-in-app-purchases';

// TODO load use terms and load firts time
// TODO wanrning Store connetc and Net connect

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

	setPurchaseListener(({ responseCode, results, errorCode }) => {
		// Purchase was successful
		if (responseCode === IAPResponseCode.OK) {
			results.forEach(purchase => {
				console.log(purchase);
				if (!purchase.acknowledged) {
					console.log(`Successfully purchased ${purchase.productId}`);
					// Process transaction here and unlock content...

					// Then when you're done
					finishTransactionAsync(purchase, true);
				}
			});
		} else if (responseCode === IAPResponseCode.USER_CANCELED) {
			console.log('User canceled the transaction');
		} else if (responseCode === IAPResponseCode.DEFERRED) {
			console.log(
				'User does not have permissions to buy but requested parental approval (iOS only)',
			);
		} else {
			console.warn(
				`Something went wrong with the purchase. Received errorCode ${errorCode}`,
			);
		}
	});

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
			<ServicesConnectionProvider>
				<Navigation />
			</ServicesConnectionProvider>
		</Provider>
	);
};

export default App;
