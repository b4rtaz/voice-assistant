module.exports = function(config) {
	config.set({
		frameworks: [ 'jasmine', 'karma-typescript' ],
		files: [
			{ pattern: 'src/**/*.ts' }
		],
		preprocessors: {
		  'src/**/*.ts': [ 'karma-typescript' ]
		},
		exclude: [
			'src/t3mpl.ts',
			'src/cli/**/*.ts'
		],
		karmaTypescriptConfig: {
			tsconfig: './tsconfig.json',
		},
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-typescript')
		],
		reporters: [
			'progress',
			'karma-typescript'
		],
		browsers: [
			'ChromeHeadless'
		],
		autoWatch: true,
		karmaTypescriptConfig: {
			"reports": {
				"html": "coverage",
				"lcovonly": "coverage"
			}
		}
	})
}
