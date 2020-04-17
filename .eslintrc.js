'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: '2019',
  },
  plugins:  ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
