import Component from '@ember/component';
import layout from '../templates/components/toggle-result';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  isAccessibilityTest: true,
  classNames: ['accessibility-toggle-results'],
  accessibilityTest: service('accessibility-test'),

  async mouseUp() {
    if (this.preventToggle) {
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

    await this.accessibilityTest.getViolations();
    this.set('isAuditing', false);
  }
});
