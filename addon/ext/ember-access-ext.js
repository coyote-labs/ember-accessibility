import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

Route.reopen({
  accessTestService: service('access-test'),

  handleRouteExit: on('deactivate', function() {
    this.accessTestService.toggleAccess();
  })
});
