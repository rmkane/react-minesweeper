module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'prettier/prettier': ['error', { singleQuote: true }],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^react'],
        ['^@?\\w'],
        ['@/(.*)'],
        ['^[./]'],
      ]
    }]
  },
  globals: {
    module: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};