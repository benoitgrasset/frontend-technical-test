module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'next',
    'next/core-web-vitals',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'unused-imports',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
  },
};
