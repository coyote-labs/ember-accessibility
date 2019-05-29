import Component from '@ember/component';
import layout from '../templates/components/list-component'
import { htmlSafe } from '@ember/template';
import { bind, debounce, cancel } from '@ember/runloop';

export default Component.extend({
  layout,
  tagName: 'span',
  canShowDetails: false,
  style: '',
  popOverPos: '',
  popOverStyle: '',
  scrollDebounce: 0,

  didInsertElement() {
    this._super(...arguments);
    this._listen();
    this.findPosition();
  },

  getOffset(el) {
    var rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom }
  },


  willDestroyElement() {
    this._super(...arguments);
    this._stopListening();
  },

  _listen() {
    this.set('_scrollHandler', bind(this, '_scroll'));
    this._listener().addEventListener('scroll', this._scrollHandler);
  },

  _stopListening() {
    this._listener().removeEventListener('scroll', this._scrollHandler);
    cancel(this._scrollDebounceId);
  },


  _listener() {
    let searchIndex = this.violate.index || 0;
    let node = document.querySelector(this.violate.nodes[searchIndex].target[0]);
    this.scrollParentElement = this.findScrollElement(node);
    if (this.scrollParentElement) {
      return this.scrollParentElement;
    } else {
      console.log(node);
      return this.element;
    }
  },


  _scroll(e) {
    this.set('_scrollDebounceId', debounce(this, '_debouncedScroll', e, this.scrollDebounce));
  },

  _debouncedScroll() {
    this.findPosition();
  },

  findPosition() {
    let searchIndex = this.violate.index || 0;
    let violatedElement = document.querySelector(this.violate.nodes[searchIndex].target[0]);
    let violatedElementPos = this.getOffset(violatedElement);

    this.set('violatedElementPos', violatedElementPos);

    let currentStyleEle = `position : absolute;
    top: ${violatedElementPos.top + window.scrollY}px;
    left: ${violatedElementPos.left + window.scrollX}px;
    `;

    this.set('style', htmlSafe(currentStyleEle));
  },

  styleElem(node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  },

  scrollElem(node) {
    let regex = /(auto|scroll)/;
    return regex.test(
    this.styleElem(node, "overflow") +
    this.styleElem(node, "overflow-y") +
    this.styleElem(node, "overflow-x"));
  },

  findScrollElement(node) {
    if(!node || node === document.body) {
      return document.body
    } else {
      if(this.scrollElem(node)) {
        return node;
      } else {
        return this.findScrollElement(node.parentNode);
      }
    }
  },


  actions: {
    showDetails() {
      if(this.toggleProperty('canShowDetails')) {
        let popOverElem = this.element.querySelector(`[violate-id='${this.violate.id}']`);
        let topPos = this.violatedElementPos.top  - ( popOverElem.clientHeight / 2 ) + 6 ;
        let leftRightPos = this.violatedElementPos.left - popOverElem.clientWidth - 14;
        let arrowPos = '';

        if(topPos < 0) {
          arrowPos = this.violatedElementPos.top + 6;
          topPos = 0;
        }
        let calcPopOverPos = this.violatedElementPos.left + popOverElem.clientHeight
        if(calcPopOverPos > window.innerWidth) {
          this.set('popOverPos', 'left');
        } else {
          leftRightPos = this.violatedElementPos.left + 25;
          this.set('popOverPos', 'right');
        }

        this.set('popOverStyle', `top:${topPos}px;left:${leftRightPos}px`);
        this.set('arrowPos', `top:${arrowPos}px`);
      }
    }
  }
});
