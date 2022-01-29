import {createElement} from '../render';

const createNavItemTemplate = (navItem, isActive) => {
  const isActiveClassName = isActive ? 'trip-tabs__btn--active' : '';

  return `<a class="trip-tabs__btn ${isActiveClassName}" href="#">${navItem}</a>`;
};

const createNavTemplate = (navItems, activeItem) => {
  const navItemsTemplate = navItems.map((navItem, index) => {
    const isActive = (activeItem) ? activeItem === navItem : index === 0;
    return createNavItemTemplate(navItem, isActive);
  }).join('');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${navItemsTemplate}
         </nav>`;
};

export default class MenuView {
  #element = null;
  #navItems = null;
  #activeNavItem = null;

  constructor() {
    this.#navItems = ['Table', 'Stats'];
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNavTemplate(this.#navItems, this.#activeNavItem);
  }

  removeElement() {
    this.#element = null;
  }
}
