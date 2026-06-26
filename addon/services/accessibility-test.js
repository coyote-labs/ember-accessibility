import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import audit from '@coyote-labs/ember-accessibility/utils/audit';

export default class AccessibilityTestService extends Service {
  @tracked violations = [];
  @tracked renderedComponents = [];
  @tracked isEnabled = false;

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
        let violatingElement = element.querySelector(target[0]);
        for (let i = renderedComponents.length - 1; i >= 0; i--) {
          let comp = renderedComponents[i];
          let componentElement = element.querySelector(`[id="${comp.id}"]`);
          if (componentElement && componentElement.contains(violatingElement)) {
            violation.component = comp.name;
          }
        }
      }

      return violation;
    });

    if (this.isEnabled) {
      this.violations = [...this.violations, ...violations];
    } else {
      this.violations = violations;
    }
  }
}
