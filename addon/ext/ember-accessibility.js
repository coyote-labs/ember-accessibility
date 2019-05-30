import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

Route.reopen({
  accessibilityTest: service('accessibility-test'),

  handleRouteExit: on('deactivate', function() {
    this.accessibilityTest.toggleAccess();
  })
});
