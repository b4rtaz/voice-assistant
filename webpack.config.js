const path = require('path');

module.exports = () => {
	return {
		entry: './src/extension.ts',
		target: 'node',
		//mode: 'development',
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'extension.js',
			libraryTarget: 'commonjs2',
			devtoolModuleFilenameTemplate: '../[resource-path]'
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		externals: {
			vscode: 'commonjs vscode',
			bufferutil: 'commonjs bufferutil',
			'utf-8-validate': 'commonjs utf-8-validate'
		},
		module: {
			rules: [
				{
					use: 'ts-loader',
					test: /\.ts?$/
				}
			]
		}
	};
};
