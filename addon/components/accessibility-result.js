import Component from '@ember/component';
import layout from '../templates/components/accessibility-result';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { bind, debounce, cancel } from '@ember/runloop';

export default Component.extend({
  layout,
  tagName: 'span',
  canShowDetails: false,
  style: '',
  popOverPos: '',
  popOverStyle: '',
  scrollDebounce: 10,
  accessibilityTest: service('accessibility-test'),

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
      top: ${rectangle.top}px;
      left: ${rectangle.left}px;
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

  getOffset(el) {
    return el.getBoundingClientRect();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._stopListening();
  },

  _listen() {
    this.set('_scrollHandler', bind(this, '_scroll'));
    this.set('_clickHandler', bind(this, '_outsideClick'));
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
    this.scrollParentElement = this.findScrollElement(node);
    if (this.scrollParentElement) {
      return this.scrollParentElement;
    }

    return this.element;
  },

  _scroll(e) {
    this.set('_scrollDebounceId', debounce(this, '_debouncedScroll', e, this.scrollDebounce));
  },

  _outsideClick(e) {
    let target = e.target;
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
    let violatedElementPos = this.getOffset(violatedElement);

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

    this.set('style', htmlSafe(currentStyleEle));
  },

  styleElem(node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  },

  scrollElem(node) {
    let regex = /(auto|scroll)/;
    return regex.test(
      this.styleElem(node, 'overflow') +
      this.styleElem(node, 'overflow-y') +
      this.styleElem(node, 'overflow-x')
    );
  },

  findScrollElement(node) {
    if (!node || node === document.body) {
      return document;
    }

    if (this.scrollElem(node)) {
      return node;
    }

    return this.findScrollElement(node.parentNode);
  },

  actions: {
    showDetails() {
      if (this.toggleProperty('canShowDetails')) {
        let popOverElem = this.element.querySelector(`[violation-id='${this.violation.id}']`);
        let buttonElem = this.element.querySelector('button');
        let buttonElemPos = this.getOffset(buttonElem);

        let topPos = buttonElemPos.top - ( popOverElem.clientHeight / 2 ) + ( buttonElemPos.height *  0.5 ) + window.scrollY;
        let leftRightPos = buttonElemPos.left - popOverElem.clientWidth - ( buttonElemPos.width *  0.5 );
        let arrowPos = '';

        if (topPos < 0) {
          arrowPos = buttonElemPos.top + ( buttonElemPos.height *  0.5 );
          topPos = 0;
        }

        let calcPopOverPos = buttonElemPos.left + popOverElem.clientWidth;
        if(calcPopOverPos > window.innerWidth) {
          this.set('popOverPos', 'left');
        } else {
          leftRightPos = buttonElemPos.left + ( buttonElemPos.width * 1.5 );
          this.set('popOverPos', 'right');
        }

        this.setProperties({
          popOverStyle: `top:${topPos}px;left:${leftRightPos}px`,
          arrowPos: `top:${arrowPos}px`
        });
      }
    }
  }
});
