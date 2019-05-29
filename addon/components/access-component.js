import Component from '@ember/component';
import layout from '../templates/components/access-component';
import { inject as service } from '@ember/service';
import axe from 'axe-core';

export default Component.extend({
  layout,
  router: service(),

  async didInsertElement() {
    if (this.fullRouteName !== 'index') {
      let axeResults = await axe.run(document.querySelector('body'), { restoreScroll: false });
      let violations = [];

      if(axeResults.violations.length) {
        axeResults.violations.forEach((axeViolation) => {
          if(axeViolation.nodes.length === 1) {
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
  },

});
