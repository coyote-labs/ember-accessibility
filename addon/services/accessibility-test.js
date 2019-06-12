import Service from '@ember/service';
import { A } from '@ember/array';
import audit from '@coyote-labs/ember-accessibility/utils/audit';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.violations = A();
  },

  async getViolations(element = document.querySelector('body')) {
    let violations = await audit(element);
    if (this.isEnabled) {
      violations = A([...this.violations, ...violations]);
    }

    this.set('violations', violations);
  }
});
