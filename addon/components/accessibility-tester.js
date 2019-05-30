import Component from '@ember/component';
import layout from '../templates/components/accessibility-tester';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  accessibilityTest: service('accessibility-test')
});
