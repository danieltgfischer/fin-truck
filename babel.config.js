module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			'@babel/transform-react-jsx-source',
			'inline-dotenv',
			'babel-plugin-transform-typescript-metadata',
			[
				'module-resolver',
				{
					"root": ['.'],
					alias: {
						'@': './src',
					},
				},
			],
		]
	};
};
