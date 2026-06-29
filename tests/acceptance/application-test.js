import { module, test } from "qunit";
import {
  visit,
  currentURL,
  triggerEvent,
  findAll,
  waitFor,
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | application", function (hooks) {
  setupApplicationTest(hooks);

  test("Checks number of violations in page", async function (assert) {
    await visit("/");
    assert.strictEqual(currentURL(), "/");

    await triggerEvent(".accessibility-toggle-results", "mouseup");

    await waitFor('[data-test-title="accessibility-result"]', {
      timeout: 15000,
    });

    const service = this.owner.lookup("service:accessibility-test");
    assert.ok(
      service.violations.length > 0,
      `Expected violations, got: ${service.violations.length}`
    );
    assert.ok(
      findAll('[data-test-title="accessibility-result"]').length > 0,
      `Expected result elements in DOM, got: ${
        findAll('[data-test-title="accessibility-result"]').length
      }`
    );
  });

  test("Toggling off clears violations", async function (assert) {
    await visit("/");
    assert.strictEqual(currentURL(), "/");

    await triggerEvent(".accessibility-toggle-results", "mouseup");
    await waitFor('[data-test-title="accessibility-result"]', {
      timeout: 15000,
    });

    const service = this.owner.lookup("service:accessibility-test");
    assert.ok(service.violations.length > 0, "Violations found after first toggle");
    assert.ok(service.isEnabled, "Service is enabled after first toggle");

    await triggerEvent(".accessibility-toggle-results", "mouseup");

    assert.strictEqual(service.violations.length, 0, "Violations cleared after toggling off");
    assert.false(service.isEnabled, "Service is disabled after toggling off");
    assert.strictEqual(
      findAll('[data-test-title="accessibility-result"]').length,
      0,
      "Violation elements removed from DOM after toggling off"
    );
  });
});
