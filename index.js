'use strict';
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

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
`

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

let filesTree = [];

module.exports = {
  name: require('./package').name,

  treeForApp(tree) {
    let environment = this.app.env;

    let shouldExcludeFiles = environment === 'production';

    if (shouldExcludeFiles) {
      for (let file in files) {
        filesTree.push(writeFile(file, files[file]));
      }
      return mergeTrees(filesTree);
    }

    return this._super.treeForApp.call(this, tree);
  },

  treeForAddon(tree) {
    let environment = this.app.env;

    let shouldExcludeFiles = environment === 'production';

    if(shouldExcludeFiles) {
      return
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
