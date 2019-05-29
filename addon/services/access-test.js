import Service from '@ember/service';

export default Service.extend({

  canShowSpan: false,

  toggleAccess() {
    this.toggleProperty('canShowSpan');
  }

});
