import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getFormattedDuration } from '../utils/common';
import AbstractView from './abstract-view';
import {EVENT_TYPES} from '../const';
dayjs.extend(duration);

const createSheduleTemplate = (startDate, endDate, eventDuration) => (
  `<div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime="${dayjs(startDate).format('YYYY-MM-DDTHH:MM')}">${dayjs(startDate).format('HH:MM')}</time>
    &mdash;
    <time class="event__end-time" datetime=${dayjs(endDate).format('YYYY-MM-DDTHH:MM')}">${dayjs(endDate).format('HH:MM')}</time>
  </p>
  <p class="event__duration">${getFormattedDuration(eventDuration)}</p>
</div>`
);


const createTripEventTemplate = (event) => {
  const {type, destination, startDate, endDate, price, isFavourite} = event;
  const eventDuration = dayjs(endDate).diff(startDate);
  const sheduleTemplate = createSheduleTemplate(startDate, endDate, eventDuration);
  const eventDay = dayjs(startDate).format('DD MMM');

  const isFavouriteClassName = isFavourite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dayjs(startDate).format('YYYY-MM-DD')}T${dayjs(startDate).format('HH:MM')}">${eventDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${EVENT_TYPES[type]} icon">
    </div>
    <h3 class="event__title">${EVENT_TYPES[type]} ${destination.city}</h3>
      ${sheduleTemplate}
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <button class="event__favorite-btn ${isFavouriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class EventView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = () => {
    this._callback.click();
  }

  get template() {
    return createTripEventTemplate(this.#event);
  }
}

