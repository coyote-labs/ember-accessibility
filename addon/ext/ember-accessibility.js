import Route from '@ember/routing/route';
import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

Route.reopen({
  accessibilityTest: service('accessibility-test'),

  handleRouteExit: on('deactivate', function() {

    this.accessibilityTest.setProperties({
      isEnabled: false,
      violations: []
    });
  })
});

Component.reopen({
  accessibilityTest: service('accessibility-test'),

  didInsertElement() {
    this._super(...arguments);
    if (!this.isAccessibilityTest) {
      this._runAudit();
    }
  },

  _runAudit() {
    if (this.accessibilityTest.isEnabled) {
      this.accessibilityTest.getViolations(this.element);
    }
  }
});
