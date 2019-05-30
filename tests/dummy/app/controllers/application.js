import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';

export default Controller.extend({

  accessibilityTest: service('accessibility-test'),
  canShowaccessibilityTest: oneWay('accessibilityTest.canShowSpan')

});
