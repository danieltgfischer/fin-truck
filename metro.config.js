const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
	ecma: 8,
	keep_classnames: true,
	keep_fnames: true,
	module: true,
	mangle: {
		module: true,
		keep_classnames: true,
		keep_fnames: true,
	},
};

module.exports = config;
