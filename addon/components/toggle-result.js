import Component from '@ember/component';
import layout from '../templates/components/toggle-result';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  classNames: ['accessibility-toggle-results'],
  accessibilityTest: service('accessibility-test'),

  async click() {
    if (this.accessibilityTest.violations.length) {
      this.accessibilityTest.set('violations', []);
      return;
    }

    this.set('isLoading', true);
    await this.accessibilityTest.getViolations();
    this.set('isLoading', false);
  }
});
