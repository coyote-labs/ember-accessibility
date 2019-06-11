import axeCore from 'axe-core';
import Service from '@ember/service';
import { A } from '@ember/array';
import config from 'ember-get-config';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.violations = A();
  },

  async auditWithAxe(element) {
    let { axe = {} } = config['ember-accessibility'];
    let violations = [];
    let axeResults;

    try {
      axeResults = await axeCore.run(element, axe);
    } catch({ message }) {
      // eslint-disable-next-line no-console
      console.warn(`[ember-accessibility] ${message}`);
      return violations;
    }

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
