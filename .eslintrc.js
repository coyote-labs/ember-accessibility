"use strict";

module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
    },
  },
  plugins: ["ember"],
  extends: [
    "eslint:recommended",
    "plugin:ember/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
  },
  rules: {
    "ember/no-test-import-export": "off",
    "ember/no-runloop": "off",
  },
  overrides: [
    {
      files: [
        ".eslintrc.js",
        ".template-lintrc.js",
        "ember-cli-build.js",
        "index.js",
        "utils/dummy-files.js",
        "testem.js",
        "blueprints/*/index.js",
        "config/**/*.js",
        "tests/dummy/config/**/*.js",
        "scripts/**/*.js",
      ],
      excludedFiles: [
        "addon/**",
        "addon-test-support/**",
        "app/**",
        "tests/dummy/app/**",
      ],
      parser: null,
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2022,
        requireConfigFile: false,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ["n"],
      extends: ["plugin:n/recommended"],
    },
    {
      files: ["tests/**/*.js"],
      env: {
        browser: true,
      },
      plugins: ["qunit"],
      extends: ["plugin:qunit/recommended"],
    },
  ],
};
