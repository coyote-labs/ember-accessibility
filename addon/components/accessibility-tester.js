import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { htmlSafe } from '@ember/template';

export default class AccessibilityTesterComponent extends Component {
  @service accessibilityTest;

  @tracked top = parseInt(localStorage.getItem('ember-accessibility-top'), 10) || 100;
  @tracked left = parseInt(localStorage.getItem('ember-accessibility-left'), 10) || 1200;
  @tracked isDragging = false;
  @tracked preventToggle = false;

  constructor(owner, args) {
    super(owner, args);

    this._dragStart = this.dragStart.bind(this);
    this._dragEnd = this.dragEnd.bind(this);
    this._drag = this.drag.bind(this);

    document.addEventListener('touchstart', this._dragStart);
    document.addEventListener('touchend', this._dragEnd);
    document.addEventListener('touchmove', this._drag);
    document.addEventListener('mousedown', this._dragStart);
    document.addEventListener('mouseup', this._dragEnd);
    document.addEventListener('mousemove', this._drag);

    registerDestructor(this, () => {
      document.removeEventListener('touchstart', this._dragStart);
      document.removeEventListener('touchend', this._dragEnd);
      document.removeEventListener('touchmove', this._drag);
      document.removeEventListener('mousedown', this._dragStart);
      document.removeEventListener('mouseup', this._dragEnd);
      document.removeEventListener('mousemove', this._drag);
    });
  }

  get position() {
    return htmlSafe(`top:${this.top}px;left:${this.left}px`);
  }

  dragStart(e) {
    if (e.target?.dataset?.testAction === 'check-accessibility') {
      this.isDragging = true;
    }
  }

  dragEnd() {
    if (!this.isDragging) {
      return;
    }

    localStorage.setItem('ember-accessibility-left', this.left);
    localStorage.setItem('ember-accessibility-top', this.top);

    this.isDragging = false;
    this.preventToggle = false;
  }

  drag(e) {
    if (!this.isDragging) {
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    let toggle = document.querySelector('[data-action="toggle-results"]');
    if (!toggle) return;

    let isOutsideRight = window.innerWidth < x + toggle.offsetWidth / 2;
    let isOutsideLeft = x < toggle.offsetWidth / 2;
    let isOutsideBottom = window.innerHeight < y + toggle.offsetHeight / 2;
    let isOutsideTop = y < toggle.offsetHeight / 2;

    if (!isOutsideBottom && !isOutsideTop) {
      this.top = y - toggle.offsetHeight / 2;
    }

    if (!isOutsideLeft && !isOutsideRight) {
      this.left = x - toggle.offsetWidth / 2;
    }

    this.preventToggle = true;
  }
}
