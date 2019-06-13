import Service from '@ember/service';
import { A } from '@ember/array';
import audit from '@coyote-labs/ember-accessibility/utils/audit';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.violations = A();
    this.renderedComponents = A();
  },

  async getViolations(element = document.querySelector('body'), component) {
    let violations = await audit(element);

    violations = violations.map((violation) => {
      let index = violation.index || 0;
      let node = violation.nodes[index];
      let { target } = node;
      let { renderedComponents = [] } = this;
      if (component) {
        violation.component = component;
      } else {
        // iterate in reverse order to ensure that the root element/component
        // is not displayed for every component that is at any level higher than that
        for (let index = renderedComponents.length - 1; index >= 0; index--) {
          let component = renderedComponents[index];
          let componentElement = element.querySelector(`#${component.id}`);
          let violatingElement = element.querySelector(target[0]);
          if (
            componentElement
            && componentElement.contains(violatingElement)
          ) {
            violation.component = component.name;
          }
        }
      }

      return violation;
    });

    if (this.isEnabled) {
      violations = A([...this.violations, ...violations]);
    }

    this.set('violations', violations);
  }
});
