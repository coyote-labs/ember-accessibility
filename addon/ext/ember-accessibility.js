import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

Route.reopen({
  accessibilityTest: service('accessibility-test'),

  deactivate() {
    this._super(...arguments);
    this.accessibilityTest.violations = [];
    this.accessibilityTest.isEnabled = false;
    this.accessibilityTest.renderedComponents = [];
  },
});
