import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';

export default Controller.extend({

  accessTestService: service('access-test'),
  canShowAccessTest: oneWay('accessTestService.canShowSpan')

});
