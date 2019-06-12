import auditWithAxe from '@coyote-labs/ember-accessibility/utils/audit';

async function runAudit(element = '#ember-testing-container') {
  let violations = await auditWithAxe(element);

  if (violations.length) {
    let violationMessages = violations.map((violation) => {
      let message = violation.description;
      let nodes = violation.nodes.map((node) => node.html);

      return `${message}\n${nodes.join('\n')}`;
    });

    return violationMessages.join('\n\n');
  }
}

export default function accessibilityTester(...args) {
  return runAudit(...args);
}
