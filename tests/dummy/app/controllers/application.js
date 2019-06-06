import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    toggle() {
      this.toggleProperty('canShowComponent');
    }
  }
});
