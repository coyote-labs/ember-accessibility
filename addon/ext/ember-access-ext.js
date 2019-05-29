/* eslint-disable */

import { run, scheduleOnce } from '@ember/runloop';
import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

import axe from 'axe-core';

Route.reopen({
  router: service(),

  handleRouteVisit: on('activate', function() {
    scheduleOnce('afterRender', () => {
      // if (this.fullRouteName !== 'index') {
      //   axe.run(document.querySelector('body'), { restoreScroll: true }, (err, results) => {
      //     let violations = [];
      //     if(results.violations.length) {
      //       results.violations.forEach((axeViolation) => {
      //         if(axeViolation.nodes.length === 1) {
      //           violations.push(axeViolation);
      //         } else {
      //           axeViolation.nodes.forEach((node, index) => {
      //             let currentElem = { index: index };
      //             Object.assign(currentElem, axeViolation);
      //             violations.push(currentElem);
      //           });
      //         }
      //       });
      //       this.controllerFor('application').set('violations', violations);
      //     } else {
      //       this.controllerFor('application').set('violations', []);
      //     }
      //   });
      // }
    })
  }),
  handleRouteExit: on('deactivate', function() {
    // this.controllerFor('application').set('violations', []);
  })
});
