import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | accessibility-tester", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AccessibilityTester />`);

    const svg = this.element.querySelector(
      '[data-test-action="check-accessibility"]'
    );
    assert.ok(
      svg,
      `SVG element not found. HTML: ${this.element.innerHTML.substring(0, 500)}`
    );
    assert.strictEqual(svg?.tagName.toLowerCase(), "svg");
  });
});
