import Component from '@ember/component';
import layout from '../templates/components/toggle-result';
import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['access-toggle-button'],
  accessibilityTest: service('accessibility-test'),
  isToggleSelected: oneWay('accessibilityTest.canShowSpan'),
  classNameBindings: ['isToggleSelected:access-toggle-button-selected'],

  click() {
    this.accessibilityTest.toggleAccess();
  },

});
