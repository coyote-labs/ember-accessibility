'use strict';

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

const dummyFiles = require('./utils/dummy-files');

let filesTree = [];

module.exports = {
  name: require('./package').name,

  addonOptions: {},

  included(app) {
    let config = this.project.config();
    let options = config[this.name] || {};
    this.addonOptions = options;

    this._super.included.apply(this, app);
  },

  treeForApp(tree) {
    if (!this.addonOptions.isEnabled) {
      for (let file in dummyFiles) {
        filesTree.push(writeFile(file, dummyFiles[file]));
      }

      return mergeTrees(filesTree);
    }

    return this._super.treeForApp.call(this, tree);
  },

  treeForAddon(tree) {
    if (!this.addonOptions.isEnabled) {
      return;
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
