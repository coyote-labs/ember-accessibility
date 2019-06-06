import Component from '@ember/component';
import layout from '../templates/components/accessibility-result';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { bind, debounce, cancel } from '@ember/runloop';

import findScrollContainer from 'ember-accessibility/utils/find-scroll-container';
import getPopoverPosition from 'ember-accessibility/utils/get-popover-position';

export default Component.extend({
  layout,
  tagName: 'span',
  canShowDetails: false,
  style: '',
  popOverPos: '',
  popOverStyle: '',
  scrollDebounce: 10,
  accessibilityTest: service('accessibility-test'),
  isAccessibilityTest: true,

  mouseEnter() {
    let violatingElement = document.querySelector(this.domElement);

    // handle components that might disappear after audit is run
    if (!violatingElement) {
      let { violations } = this.accessibilityTest;
      this.set('accessibilityTest.violations', violations.without(this.violation));

      return;
    }

    let rectangle = violatingElement.getBoundingClientRect();
    this.set('overlayPos', `
      position: absolute;
      top: ${rectangle.top + window.scrollY}px;
      left: ${rectangle.left + window.scrollX}px;
      bottom: ${rectangle.bottom}px;
      right: ${rectangle.right}px;
      height: ${rectangle.height}px;
      width: ${rectangle.width}px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      z-index: 2147483635;
    `);
  },

  mouseLeave() {
    this.set('overlayPos', '');
  },

  didInsertElement() {
    this._super(...arguments);

    this._listen();
    this.findPosition();
  },

  impactIcon: computed('violation.impact', function() {
    let { impact = 'minor' } = this.violation;
    return `${impact.toLowerCase()}-icon`;
  }),

  willDestroyElement() {
    this._super(...arguments);
    this._stopListening();
  },

  _listen() {
    this.setProperties({
      _scrollHandler: bind(this, '_scroll'),
      _clickHandler: bind(this, '_outsideClick')
    });

    this._listener().addEventListener('scroll', this._scrollHandler);
    document.addEventListener('click', this._clickHandler);
  },

  _stopListening() {
    this._listener().removeEventListener('scroll', this._scrollHandler);
    document.removeEventListener('click', this._clickHandler);
    cancel(this._scrollDebounceId);
  },

  _listener() {
    let searchIndex = this.violation.index || 0;
    let node = document.querySelector(this.violation.nodes[searchIndex].target[0]);
    this.scrollParentElement = findScrollContainer(node);
    if (this.scrollParentElement) {
      return this.scrollParentElement;
    }

    return this.element;
  },

  _scroll(e) {
    this.set('_scrollDebounceId', debounce(this, '_debouncedScroll', e, this.scrollDebounce));
  },

  _outsideClick(e) {
    let { target } = e;
    if (!target.closest(`#${this.elementId}`)) {
      this.set('canShowDetails', false);
    }
  },

  _debouncedScroll() {
    this.findPosition();
  },

  findPosition() {
    let searchIndex = this.violation.index || 0;
    this.set('domElement', this.violation.nodes[searchIndex].target[0]);
    let violatedElement = document.querySelector(this.domElement);
    let violatedElementPos = violatedElement.getBoundingClientRect();

    let impactColors = {
      critical: '#d0021b',
      serious: '#f5a623',
      moderate: '#f5a623',
      minor: '#4a90e2'
    };

    let currentStyleEle = `
      position : absolute;
      top: ${violatedElementPos.top + window.scrollY}px;
      left: ${violatedElementPos.left + window.scrollX}px;
      background: ${impactColors[this.violation.impact]};
    `;
    let failureSummary = this.violation.nodes[searchIndex].failureSummary || [];

    failureSummary = failureSummary.split('\n');

    failureSummary = failureSummary.map((failure) => {
      if (failure.length) {
        if (failure.includes('Fix all of the following') || failure.includes('Fix any of the following')) {
          return htmlSafe(`<b>${failure}</b>`);
        }

        return htmlSafe(`<li>${failure}</li>`);
      }
    });

    this.setProperties({
      failureSummary,
      style: htmlSafe(currentStyleEle)
    });
  },

  actions: {
    showDetails() {
      if (this.toggleProperty('canShowDetails')) {
        let popOverElem = this.element.querySelector(`[violation-id='${this.violation.id}']`);
        let buttonElem = this.element.querySelector('button');

        let {
          popOverPos,
          topPos,
          leftRightPos,
          arrowPos
        } = getPopoverPosition(popOverElem, buttonElem);

        this.setProperties({
          popOverPos,
          popOverStyle: `top:${topPos}px;left:${leftRightPos}px`,
          arrowPos: `top:${arrowPos}px`
        });
      }
    }
  }
});
