import Route from '@ember/routing/route';
import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

Route.reopen({
  accessibilityTest: service('accessibility-test'),

  handleRouteExit: on('deactivate', function() {

    this.accessibilityTest.setProperties({
      isEnabled: false,
      violations: [],
      renderedComponents: []
    });
  })
});

Component.reopen({
  accessibilityTest: service('accessibility-test'),

  didInsertElement() {
    this._super(...arguments);
    if (!this.isAccessibilityTest) {
      this.scheduleAudit();
    }
  },

  scheduleAudit() {
    scheduleOnce('afterRender', this, this.runAudit);
  },

  runAudit() {
    if (this.accessibilityTest.isEnabled && !this.isDestroyed) {
      let { element } = this;
      if (element) {
        this.accessibilityTest.getViolations(element, this._debugContainerKey);
      }
    }

    if (!this.accessibilityTest.isEnabled) {
      this.accessibilityTest.set('renderedComponents', [
        ...this.accessibilityTest.renderedComponents,
        { name: this._debugContainerKey, id: this.elementId }
      ]);
    }
  }
});
