/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	env: {
		browser: true,
		es6: true,
	},
	ignorePatterns: ['vite.config.ts'],
	plugins: [
		'vue',
		'compat',
		'import',
	],
	extends: [
		'@vue/eslint-config-typescript',
		'eslint:recommended',
		'plugin:compat/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:vue/base',
		'plugin:vue/vue3-recommended',
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src'],
				],
				extensions: ['.ts', '.vue'],
			},
			'compat': {
				'polyfills': [
					'promises',
					'Promise',
				],
			},
		},
	},
	rules: {
		'indent': 'off',
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1,
		}],
		'quotes': ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],
		'arrow-parens': ['error', 'always'],
		'no-multiple-empty-lines': ['error', {
			max: 1,
		}],
		'curly': 'error',
		'default-case-last': 'error',
		'no-extra-semi': 'off',
		'object-curly-newline': ['error', {
			multiline: true,
			minProperties: 2,
			consistent: true,
		}],
		'object-property-newline': 'error',
		'object-curly-spacing': ['error', 'always'],
		'eqeqeq': 'warn',
		'no-unused-vars': 'off',
		'padding-line-between-statements': ['error',
			{
				blankLine: 'always',
				prev: 'block-like',
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: 'block-like',
			},
			{
				blankLine: 'always',
				prev: ['const', 'let', 'var'],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				prev: '*',
				next: 'return', 
			},
		],
		'eol-last': ['error', 'always'],

		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-extra-semi': 'error',
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/prefer-ts-expect-error': 'error',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'none',
			},
		}],
		'@typescript-eslint/consistent-type-imports': 'error',

		'vue/block-order': ['error', {
			order: ['script', 'template', 'style'],
		}],
		'vue/block-tag-newline': 'error',
		'vue/component-api-style': ['error', ['script-setup', 'composition']],
		'vue/match-component-file-name': ['error', {
			shouldMatchCase: false,
			extensions: ['vue'],
		}],
		'vue/no-ref-object-reactivity-loss': 'error',
		'vue/no-root-v-if': 'error',
		'vue/no-template-target-blank': 'error',
		'vue/no-unused-emit-declarations': 'warn',
		'vue/no-unused-refs': 'warn',
		'vue/padding-line-between-blocks': 'error',
		'vue/require-typed-object-prop': 'warn',
		'vue/require-typed-ref': 'error',
		'vue/html-indent': ['error', 'tab'],

		'import/order': ['error', {
			'newlines-between': 'always',
			'groups': [
				'builtin',
				'external',
				'parent',
				'sibling',
				'index',
			],
			'pathGroupsExcludedImportTypes': [],
			'pathGroups': [
				{
					'pattern': '~/**',
					'patternOptions': {
						'dot': true,
					},
					'group': 'index',
					'position': 'after',
				},
			],
		}],
		'import/no-default-export': 'warn',
		'import/first': 'error',
		'import/newline-after-import': 'error',
	},
}
