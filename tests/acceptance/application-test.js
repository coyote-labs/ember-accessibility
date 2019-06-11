import { module, test } from 'qunit';
import { visit, currentURL, click, findAll, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('Checks number of violations in page', async function(assert) {

    await visit('/');
    assert.equal(currentURL(), '/');

    await click('[data-test-action="check-accessibility"]');
    await waitFor('[data-test-title="accessibility-result"]');

    assert.ok(findAll('[data-test-title="accessibility-result"]').length, 'Violation count must be three');
  });

  test('Handles component didInsertElement', async function(assert) {

    await visit('/');
    assert.equal(currentURL(), '/');

    await click('[data-test-action="check-accessibility"]');
    await waitFor('[data-test-title="accessibility-result"]');

    let violationLength = await findAll('[data-test-title="accessibility-result"]').length;
    assert.ok(violationLength, 'Violation count must be three');

    await click('[data-toggle="display-text"]');
    /* After click, new component rendered. In rendered component new violation will be found by running axe on didInsertElement*/
    await waitFor('[data-test-title="accessibility-result"]', { count: violationLength + 1 });

    assert.equal(findAll('[data-test-title="accessibility-result"]').length, violationLength + 1, 'Violation count must be four');
  });
});
