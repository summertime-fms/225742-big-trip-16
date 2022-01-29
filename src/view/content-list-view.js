import {createElement} from '../render';

const createContentListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ContentListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createContentListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
