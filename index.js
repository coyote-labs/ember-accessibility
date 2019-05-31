'use strict';

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

const dummyFiles = require('./utils/dummy-files');

let testAccessibility = process.env.TEST_ACCESSIBILITY;
let filesTree = [];

module.exports = {
  name: require('./package').name,

  treeForApp(tree) {
    if (!testAccessibility) {
      for (let file in dummyFiles) {
        filesTree.push(writeFile(file, dummyFiles[file]));
      }

      return mergeTrees(filesTree);
    }

    return this._super.treeForApp.call(this, tree);
  },

  treeForAddon(tree) {
    if (!testAccessibility) {
      return;
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
