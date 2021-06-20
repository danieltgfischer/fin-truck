import 'react-native-gesture-handler';
import 'intl';
import 'reflect-metadata';
import React from 'react';
import { Provider } from 'react-redux';
import { DatabaseConnectionProvider } from '@/hocs/databaseProvider';
import { Navigation } from '@/navigation/stack';
import store from '@/store';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<DatabaseConnectionProvider>
				<Navigation />
			</DatabaseConnectionProvider>
		</Provider>
	);
};

export default App;
