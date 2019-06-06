import axe from 'axe-core';
import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.violations = A();
  },

  async auditWithAxe(element) {
    let axeResults = await axe.run(element, { restoreScroll: true });
    let violations = [];

    if (axeResults.violations.length) {
      axeResults.violations.forEach((axeViolation) => {
        if (axeViolation.nodes.length === 1) {
          violations.push(axeViolation);
        } else {
          axeViolation.nodes.forEach((node, index) => {
            let currentElem = { index };
            Object.assign(currentElem, axeViolation);
            violations.push(currentElem);
          });
        }
      });
    }

    return violations;
  },

  async getViolations(element = document.querySelector('body')) {
    let violations = await this.auditWithAxe(element);
    if (this.isEnabled) {
      violations = A([...this.violations, ...violations]);
    }

    this.set('violations', violations);
  }
});
