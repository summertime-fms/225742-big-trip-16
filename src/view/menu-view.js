import AbstractView from './abstract-view';

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

export default class MenuView extends AbstractView {
  #navItems = null;
  #activeNavItem = null;

  constructor() {
    super();
    this.#navItems = ['Table', 'Stats'];
  }

  get template() {
    return createNavTemplate(this.#navItems, this.#activeNavItem);
  }
}
