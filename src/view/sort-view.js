import { createElement } from '../render';

const createSortItemTemplate = (sort, isChecked, isDisabled) => {
  const {label, value} = sort;
  const checkedProp = isChecked ? 'checked' : '';
  const disabledProp = isDisabled ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--day">
            <input id="${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${value}" ${disabledProp} ${checkedProp}>
            <label class="trip-sort__btn" for="${value}">${label}</label>
        </div>`;
};

const createSortTemplate = (sort, currentSort, disabledItems) => {
  const sortItemsTemplate = sort.map((sortItem, index ) => {
    const isChecked = (currentSort) ? sortItem.value === currentSort : index === 0;
    const isDisabled = disabledItems.some((item) => item === sortItem.value);

    return createSortItemTemplate(sortItem, isChecked, isDisabled);
  }).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
};

export default class SortView {
  #element = null;
  #sort = null;
  #currentSort = null;
  #disabledSortItems = null;

  constructor() {
    this.#sort = [
      {
        value: 'sort-day',
        label: 'Day'
      },
      {
        value: 'sort-event',
        label: 'Event'
      },
      {
        value: 'sort-time',
        label: 'Time'
      },
      {
        value: 'sort-price',
        label: 'Price'
      },
      {
        value: 'sort-offers',
        label: 'Offers'
      },
    ];

    this.#currentSort = 'sort-day';
    this.#disabledSortItems = [];
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortTemplate(this.#sort, this.#currentSort, this.#disabledSortItems);
  }

  removeElement() {
    this.#element = null;
  }
}
