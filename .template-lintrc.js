"use strict";

module.exports = {
  extends: "recommended",
  rules: {
    "no-inline-styles": false,
    "require-valid-alt-text": false,
    "no-at-ember-render-modifiers": false,
    "no-invalid-link-text": false,
    "no-invalid-interactive": false,
  },
  overrides: [
    {
      files: [
        "tests/dummy/app/templates/components/elements-without-label.hbs",
      ],
      rules: {
        "require-input-label": false,
      },
    },
  ],
};
