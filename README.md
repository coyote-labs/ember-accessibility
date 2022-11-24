ember-accessibility
==============================================================================

[![Latest npm release](https://img.shields.io/npm/v/@coyote-labs/ember-accessibility.svg)](https://www.npmjs.com/package/@coyote-labs/ember-accessibility)  [![TravisCI Build Status](https://img.shields.io/travis/coyote-labs/ember-accessibility/master.svg?label=TravisCI)](https://travis-ci.org/coyote-labs/ember-accessibility)

An EmberJS addon to help identify accessibility violations.

This addon uses the [axe-core](https://github.com/dequelabs/axe-core) library
to audit your apps.

[DEMO](https://coyote-labs.github.io/ember-accessibility/)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install @coyote-labs/ember-accessibility
```


Usage
------------------------------------------------------------------------------

* In your application template, include the **AccessibilityTester** component.
  For example,
  ```handlebars
  <h1>Welcome to my app!</h1>
  <AccessibilityTester />
  ```
* In your `config/environment.js`, provide an `ember-accessibility` object that has
  the following fields.

  `isEnabled`: Defaults to `false`. You can set it to `environment === 'development'`.
  This addon's code will be stripped unless this is set to `true`.

  `axe`: Allows configuring axe-core. Refer axe-core's [documentation](https://www.deque.com/axe/axe-for-web/documentation/api-documentation/#options-parameter).

  ```javascript
  // config/environment.js
  let ENV = {
    'ember-accessibility': {
      isEnabled: environment === 'development',
      axe: {
        restoreScroll: true
      }
    }
  };
  ```
* Click on the **Check Accessiblity** button that appears when you visit the app.

* If you want to change the default position of the toggle, pass top and left position values to the `AccessibilityTester` component.

  Note: Values are in pixels.

  For example,
  ```handlebars
  <h1>Welcome to my app!</h1>
  <AccessibilityTester @top="25" @left="750"/>
  ```

* Fix the errors that are displayed and make your app accessible!

  <img alt="Using Accessibility Tester" src="docs/screenshots/accessibility-tester.gif" width="500">

**Using in engines**

* Make sure you add `ember-accessibility` to the engine's dependencies.
* Add the `accessibility-test` service to your engine's dependencies in `app.js`.


**Using in test**

- Import the `auditAccessibility()` helper from `'@coyote-labs/ember-accessibility/test-support/audit';` and then invoke it where needed.

> Note: The config passed in `config/environment.js` will be applied here as well.

##### Acceptance Tests

```javascript
import auditAccessibility from '@coyote-labs/ember-accessibility/test-support/audit';

test('Checks accessibility violations', function(assert) {
  visit('/');
  assert.notOk(await auditAccessibility());
});
```
Or, you can pass any selector or element from the visited page.

```javascript
import auditAccessibility from '@coyote-labs/ember-accessibility/test-support/audit';

test('Checks accessibility violations', function(assert) {
  visit('/');
  assert.notOk(await auditAccessibility('#someID'));
});
```
##### Integration / Unit Tests

```javascript
import auditAccessibility from '@coyote-labs/ember-accessibility/test-support/audit';

test('Checks accessibility violations in component', function(assert) {
  await render(hbs`<AccessibilityTester />`);  
  assert.notOk(await auditAccessibility(this.element));
});
```

How is this different from [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing)?
------------------------------------------------------------------------------

ember-a11y-testing is primarily geared towards testing *as of now*. While this
will most definitely change, we wanted something that will provide contextual
and meaningful feedback to developers during the development phase itself.

For example, here is how ember-a11y-testing looks in development currently.

<img alt="ember-a11y-testing screenshot" src="docs/screenshots/ember-a11y-testing.png" width="500">

Notice how all the errors are present on the console. This addon on the other hand
will make it easier to comprehend those errors.

<img alt="ember-accessibility screenshot" src="docs/screenshots/ember-accessibility.png" width="500">

Another major reason that we wrote this addon is because our tests became
extremely slow when using ember-a11y-testing. This is a major pain point when
using it on large projects. By doing a11y testing in development and review
phases, we were able to avoid that.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
