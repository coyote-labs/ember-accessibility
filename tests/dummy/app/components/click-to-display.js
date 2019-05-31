import Component from '@ember/component';
import layout from '../templates/components/click-to-display';

export default Component.extend({
  layout,
  actions: {
    toggle() {
      this.toggleProperty('show');
    }
  }
});
