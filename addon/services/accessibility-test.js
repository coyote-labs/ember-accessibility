import axe from 'axe-core';
import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.violations = [];
  },

  async getViolations() {
    let axeResults = await axe.run(document.querySelector('body'), { restoreScroll: true });
    let violations = [];

    if (axeResults.violations.length) {
      axeResults.violations.forEach((axeViolation) => {
        if (axeViolation.nodes.length === 1) {
          violations.push(axeViolation);
        } else {
          axeViolation.nodes.forEach((node, index) => {
            let currentElem = { index: index };
            Object.assign(currentElem, axeViolation);
            violations.push(currentElem);
          });
        }
      });
      this.set('violations', violations);
    } else {
      this.set('violations', []);
    }
  }
});
