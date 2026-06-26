'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'utils/dummy-files.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2022,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['n'],
      extends: ['plugin:n/recommended'],
    },
    {
      files: ['tests/**/*.js'],
      env: {
        browser: true,
      },
      plugins: ['qunit'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
