import AbstractView from './abstract-view';

const createFilterItemTemplate = (filter, isChecked) => {
  const {value, label} = filter;
  const checkedProp = isChecked ? 'checked' : '';

  return `<div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${checkedProp}>
    <label class="trip-filters__filter-label" for="filter-${value}">${label}</label>
  </div>`;
};

const createFilterTemplate = (filters, currentFilter) => {
  const filtersTemplate = filters.map((filter, index) => {
    const isChecked = (currentFilter) ? filter.value === currentFilter : index === 0;

    return createFilterItemTemplate(filter, isChecked);
  }).join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filtersTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor() {
    super();
    this.#filters = [
      {
        value: 'everything',
        label: 'Everything',
      },
      {
        value: 'future',
        label: 'Future',
      },
      {
        value: 'past',
        label: 'Past',
      }
    ];

    this.#currentFilter = 'future';
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
