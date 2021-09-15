module.exports = {
	env: {
		browser: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				trailingComma: 'es5',
				semi: true,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
			},
		],
		'react/jsx-filename-extension': 0,
		'import/prefer-default-export': 0,
		'no-shadow': 0,
		'react/prop-types': 0,
		'react/no-unescaped-entities': 0,
		'no-nested-ternary': 0,
		'no-underscore-dangle': 0,
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'react/button-has-type': 0,
	},
};
