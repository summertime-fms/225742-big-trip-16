import dayjs from 'dayjs';
import { EVENT_TYPES } from '../const';
import { CITIES } from '../const';

const renderEventTypes = () => {
  const eventTypesHTML = EVENT_TYPES.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  )).join('');

  return eventTypesHTML;
};

const renderImages = (images) => {
  const imagesHTML = images.map((image) => (
    `<img class="event__photo" src="${image.src}" alt="${image.description}">`
  )).join('');

  return imagesHTML;
};

const renderOptions = (eventOffers) => {
  const optionsHTML = eventOffers.offers.map((offer) => (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.labelId}" type="checkbox" name="${offer.title}">
    <label class="event__offer-label" for="${offer.labelId}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
  )).join('');

  return optionsHTML;
};

const renderOffersSection = (eventOffers) => (
  `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
    ${renderOptions(eventOffers)}
  </div>
</section>`
);

const getOtherCitiesList = (currentCity) => {
  const otherCities = CITIES.filter((city) => (
    city !== currentCity
  ));

  const otherCitiesListHTML = otherCities.map((city) => (
    `<option value="${city}"></option>`
  )).join('');

  return otherCitiesListHTML;
};

export const createEventEditTemplate = (event = {}) => {
  const { type, destination, startDate, endDate, eventOffers, price} = event;

  const offersSection = eventOffers ? renderOffersSection(eventOffers) : '';

  const { city, description } = destination;

  const otherCitiesList = getOtherCitiesList(city);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${renderEventTypes()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${otherCitiesList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startDate).format('DD/MM/YY HH:MM')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endDate).format('DD/MM/YY HH:MM')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersSection}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
        <div class="event__photos-tape">
          ${renderImages(destination.pics)}
        </div>
      </div>
      </section>
    </section>
  </form>
</li>`;
};
