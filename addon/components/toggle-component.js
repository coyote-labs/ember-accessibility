import Component from '@ember/component';
import layout from '../templates/components/toggle-component';
import { inject as service } from '@ember/service';
import { oneWay } from '@ember/object/computed';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['access-toggle-button'],
  accessTestService: service('access-test'),
  isToggleSelected: oneWay('accessTestService.canShowSpan'),
  classNameBindings: ['isToggleSelected:access-toggle-button-selected'],

  click() {
    this.accessTestService.toggleAccess();
  },

});
