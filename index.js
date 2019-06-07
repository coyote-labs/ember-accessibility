'use strict';

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

const dummyFiles = require('./utils/dummy-files');

let filesTree = [];

module.exports = {
  name: require('./package').name,

  addonOptions: {},

  included() {
    let app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      let current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    this.app = app;
    this.addonOptions = this.app.project.config(app.env)['ember-accessibility'] || {};

    this._super.included.apply(this, arguments);
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
