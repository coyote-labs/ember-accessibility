const dummyComponent = `
  import Component from '@ember/component';
  export default Component.extend({
  });
`;

const dummyService = `
  import Service from '@ember/service';
  export default Service.extend({
  });
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
  'components/critical-icon.js': dummyComponent,
  'components/minor-icon.js': dummyComponent,
  'components/moderate-icon.js': dummyComponent,
  'components/serious-icon.js': dummyComponent,
  'components/toggle-result.js': dummyComponent,
  'services/accessibility-test.js': dummyService
};

module.exports = files;
