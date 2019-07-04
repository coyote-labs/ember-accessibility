import Component from '@ember/component';
import layout from '../templates/components/toggle-result';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default Component.extend({
  layout,
  isAccessibilityTest: true,
  classNames: ['accessibility-toggle-results'],
  accessibilityTest: service('accessibility-test'),

  async mouseUp(e) {
    if (this.preventToggle) {
      return;
    }

    if (e.target
      && e.target.classList
      && e.target.classList.contains('loading-accessibility-overlay')) {
      return;
    }

    if (this.accessibilityTest.isEnabled) {
      this.accessibilityTest.setProperties({
        'violations': [],
        'isEnabled': false
      });

      return;
    }

    this.setProperties({
      'isAuditing': true,
      'accessibilityTest.isEnabled': true
    });

    next(this, async function() {
      await this.accessibilityTest.getViolations();
      this.set('isAuditing', false);
    });
  }
});
