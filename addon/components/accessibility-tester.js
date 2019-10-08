import Component from '@ember/component';
import layout from '../templates/components/accessibility-tester';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { bind } from '@ember/runloop';

export default Component.extend({
  layout,
  accessibilityTest: service('accessibility-test'),
  isAccessibilityTest: true,

  init() {
    this._super(...arguments);

    let left = localStorage.getItem('ember-accessibility-left');
    let top = localStorage.getItem('ember-accessibility-top');

    this.set('top', top || this.top || 100);
    this.set('left', left || this.left || 1200);
  },

  position: computed('top', 'left', function() {
    return htmlSafe(`top:${this.top}px;left:${this.left}px`);
  }),

  didInsertElement() {
    this._super(...arguments);

    this.setProperties({
      _dragStart: bind(this, 'dragStart'),
      _dragEnd: bind(this, 'dragEnd'),
      _drag: bind(this, 'drag')
    });

    document.addEventListener('touchstart', this._dragStart);
    document.addEventListener('touchend', this._dragEnd);
    document.addEventListener('touchmove', this._drag);

    document.addEventListener('mousedown', this._dragStart);
    document.addEventListener('mouseup', this._dragEnd);
    document.addEventListener('mousemove', this._drag);
  },

  willDestroyElement() {
    document.removeEventListener('touchstart', this._dragStart);
    document.removeEventListener('touchend', this._dragEnd);
    document.removeEventListener('touchmove', this._drag);

    document.removeEventListener('mousedown', this._dragStart);
    document.removeEventListener('mouseup', this._dragEnd);
    document.removeEventListener('mousemove', this._drag);

    this._super(...arguments);
  },

  dragStart(e) {
    if (e.target && e.target.dataset && e.target.dataset.testAction === 'check-accessibility') {
      this.set('isDragging', true);
    }
  },

  dragEnd() {
    if (!this.isDragging) {
      return;
    }

    localStorage.setItem('ember-accessibility-left', this.left);
    localStorage.setItem('ember-accessibility-top', this.top);

    this.setProperties({
      isDragging: false,
      preventToggle: false
    });
  },

  drag(e) {
    if (!this.isDragging) {
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    let toggle = this.element.querySelector('[data-action="toggle-results"]');

    let isOutsideRight = window.innerWidth < x + toggle.offsetWidth / 2;
    let isOutsideLeft = x < toggle.offsetWidth / 2;

    let isOutsideBottom = window.innerHeight < y + toggle.offsetHeight / 2;
    let isOutsideTop = y < toggle.offsetHeight / 2;

    if (
      !isOutsideBottom && !isOutsideTop
    ) {
      this.set('top', y - toggle.offsetHeight / 2);
    }

    if (
      !isOutsideLeft && !isOutsideRight
    ) {
      this.set('left', x - toggle.offsetWidth / 2);
    }

    this.set('preventToggle', true);
  }
});
