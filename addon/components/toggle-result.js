import Component from "@glimmer/component";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ToggleResultComponent extends Component {
  @service accessibilityTest;

  @tracked isAuditing = false;

  @action
  async handleMouseUp(e) {
    if (this.args.preventToggle) {
      return;
    }

    if (e.target?.classList?.contains("accessibility-loading-overlay")) {
      return;
    }

    if (this.accessibilityTest.isEnabled) {
      this.accessibilityTest.violations = [];
      this.accessibilityTest.isEnabled = false;
      return;
    }

    this.isAuditing = true;
    this.accessibilityTest.isEnabled = true;

    await this.accessibilityTest.getViolations();
    this.isAuditing = false;
  }
}
