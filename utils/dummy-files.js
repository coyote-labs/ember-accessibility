'use strict';

const dummyComponent = `
import Component from '@glimmer/component';
export default class extends Component {}
`;

const dummyService = `
import Service from '@ember/service';
export default class extends Service {}
`;

const dummyInitializers = `
export default {
  name: 'ember-accessibility',
  initialize() {}
};
`;

const files = {
  'initializers/ember-accessibility.js': dummyInitializers,
  'components/accessibility-result.js': dummyComponent,
  'components/accessibility-tester.js': dummyComponent,
  'components/toggle-result.js': dummyComponent,
  'services/accessibility-test.js': dummyService,
};

module.exports = files;
