import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { bind, debounce, cancel } from '@ember/runloop';

import findScrollContainer from '@coyote-labs/ember-accessibility/utils/find-scroll-container';
import getPopoverPosition from '@coyote-labs/ember-accessibility/utils/get-popover-position';
import { applyStyles, resetStyles } from '@coyote-labs/ember-accessibility/utils/element-style';

const impactColors = {
  critical: 'rgb(220, 53, 69, 0.5)',
  serious: 'rgb(255, 153, 102, 0.5)',
  moderate: 'rgb(255, 204, 0, 0.5)',
  minor: 'rgb(23, 162, 184, 0.5)',
};

export default class AccessibilityResultComponent extends Component {
  @service accessibilityTest;

  @tracked canShowDetails = false;
  @tracked popOverPos = '';
  @tracked failureSummary = [];

  element = null;
  _scrollHandler = null;
  _clickHandler = null;
  _scrollDebounceId = null;
  domElement = null;
  violatedElement = null;
  button = null;

  get impactIcon() {
    let { impact = 'minor' } = this.args.violation;
    return `${impact.toLowerCase()}-icon`;
  }

  @action
  setup(element) {
    this.element = element;
    this._listen();
    this.findPosition();
  }

  @action
  teardown() {
    this._stopListening();
  }

  @action
  mouseEnter() {
    let violatingElement = document.querySelector(this.domElement);

    if (!violatingElement) {
      this.accessibilityTest.violations = this.accessibilityTest.violations.filter(
        (v) => v !== this.args.violation
      );
      return;
    }

    let rectangle = violatingElement.getBoundingClientRect();

    applyStyles(this.element.querySelector('.accessbility-result-overlay'), {
      position: 'absolute',
      top: `${rectangle.top + window.scrollY}px`,
      left: `${rectangle.left + window.scrollX}px`,
      bottom: `${rectangle.bottom}px`,
      right: `${rectangle.right}px`,
      height: `${rectangle.height}px`,
      width: `${rectangle.width}px`,
      background: 'rgba(0, 0, 0, 0.3)',
      'border-radius': '5px',
      'z-index': '2147483635',
    });
  }

  @action
  mouseLeave() {
    resetStyles(this.element.querySelector('.accessbility-result-overlay'));
  }

  _listen() {
    this._scrollHandler = bind(this, '_scroll');
    this._clickHandler = bind(this, '_outsideClick');

    this._listener().addEventListener('scroll', this._scrollHandler);
    document.addEventListener('click', this._clickHandler);
  }

  _stopListening() {
    this._listener().removeEventListener('scroll', this._scrollHandler);
    document.removeEventListener('click', this._clickHandler);
    cancel(this._scrollDebounceId);
  }

  _listener() {
    let searchIndex = this.args.violation.index || 0;
    let node = document.querySelector(this.args.violation.nodes[searchIndex].target[0]);
    let scrollParentElement = findScrollContainer(node);
    if (scrollParentElement) {
      return scrollParentElement;
    }
    return this.element;
  }

  _scroll(e) {
    this._scrollDebounceId = debounce(this, '_debouncedScroll', e, 150);
  }

  _outsideClick(e) {
    if (!this.element?.contains(e.target)) {
      this.canShowDetails = false;
    }
  }

  _debouncedScroll() {
    this.findPosition();
  }

  findPosition() {
    if (!this.element) {
      return;
    }

    let searchIndex = this.args.violation.index || 0;
    this.domElement = this.args.violation.nodes[searchIndex].target[0];

    let violatedElement;
    if (this.violatedElement) {
      violatedElement = this.violatedElement;
    } else {
      violatedElement = document.querySelector(this.domElement);
      this.violatedElement = violatedElement;
    }

    if (!violatedElement) {
      return;
    }

    let violatedElementPos = violatedElement.getBoundingClientRect();
    let color = impactColors[this.args.violation.impact];
    let currentStyleEle = {
      position: 'absolute',
      top: `${violatedElementPos.top + window.scrollY}px`,
      left: `${violatedElementPos.left + window.scrollX}px`,
      background: color,
      border: `2px solid ${color.replace(', 0.5', '')}`,
    };

    let failureSummary = this.args.violation.nodes[searchIndex].failureSummary || '';
    this.failureSummary = failureSummary
      .split('\n')
      .filter((s) => s.length)
      .map((failure) => {
        if (
          failure.includes('Fix all of the following') ||
          failure.includes('Fix any of the following')
        ) {
          return htmlSafe(`<b>${failure}</b>`);
        }
        return htmlSafe(`<li>${failure}</li>`);
      });

    let button;
    if (this.button) {
      button = this.button;
    } else {
      button = this.element.querySelector('button');
      this.button = button;
    }

    applyStyles(button, currentStyleEle);
  }

  @action
  showDetails() {
    this.canShowDetails = !this.canShowDetails;

    if (!this.canShowDetails) {
      this.popOverPos = '';
      return;
    }

    let popOverElem = this.element.querySelector(
      `[violation-id='${this.args.violation.id}']`
    );
    let buttonElem = this.element.querySelector('button');
    let arrowElem = this.element.querySelector('.arrow');

    let { popOverPos, topPos, leftRightPos, arrowPos } = getPopoverPosition(
      popOverElem,
      buttonElem
    );

    applyStyles(popOverElem, {
      top: `${topPos}px`,
      left: `${leftRightPos}px`,
    });

    applyStyles(arrowElem, {
      top: `${arrowPos}px`,
    });

    this.popOverPos = popOverPos;
  }
}
