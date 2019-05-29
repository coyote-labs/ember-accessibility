import Component from '@ember/component';
import layout from '../templates/components/toggle-component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['access-toggle-button'],
  classNameBindings: ['isToggleLoading:disabled', 'isToggleSelected:access-toggle-button-selected'],
  accessTestService: service('access-test'),

  click() {
    this.accessTestService.toggleAccess();
    this.set('isToggleSelected', !this.get('isToggleSelected'));
  },

});
