// Hey Emacs, this is -*- coding: utf-8 -*-
/* global module */

// Inspired by the following resources:
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
// https://github.com/flycheck/flycheck/issues/514
// https://github.com/cerner/eslint-config-terra

// To consider:
// https://www.npmjs.com/package/@liquid-labs/catalyst-scripts

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  plugins: [
    'import',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified
    // from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // 'max-len': ['warn', 80],
    'max-len': ['error', 80, { ignoreUrls: true }],
    'operator-linebreak': ['error', 'after'],
    // Let tide (or tsc) and js2-mode handle undefined variables
    'no-undef': 'off',
    'brace-style': ['warn', 'stroustrup', { allowSingleLine: true }],
    curly: ['error', 'multi'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'lines-between-class-members': [
      'error', 'always', { exceptAfterSingleLine: true },
    ],
    'keyword-spacing': ['error', {
      overrides: {
        if: { after: false },
        for: { after: false },
        while: { after: false },
      },
    }],
    'no-param-reassign': ['error', { props: false }],
    quotes: ['error', 'single'],
    // Let tide (or tsc) and js2-mode handle undefined variables
    // '@typescript-eslint/no-unused-vars': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/explicit-member-accessibility': ['warn', {
      accessibility: 'no-public',
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          '/usr/local/share/arangodb3/js/common/modules',
          '/usr/local/share/arangodb3/js/server/modules',
          '/usr/share/arangodb3/js/common/modules',
          '/usr/share/arangodb3/js/server/modules',
        ],
      },
    },
  },
};
