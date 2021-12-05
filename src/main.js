import { createNavTemplate } from './view/menu-view';
import { createFilterTemplate } from './view/filters-view';
import { createSortTemplate } from './view/sort-view';
import { createContentListTemplate } from './view/content-list-view';
import { createTripEventTemplate } from './view/trip-event-view';
import { createEventEditTemplate } from './view/event-edit-view';

import { RenderPosition, renderTemplate } from './render-helpers';

const TRIP_ITEMS = 3;

//containers

const main = document.querySelector('main');

const navContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentListContainer = main.querySelector('.trip-events');


//rendering

renderTemplate(navContainer, createNavTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterContainer, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(contentListContainer, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(contentListContainer, createContentListTemplate(), RenderPosition.BEFOREEND);

const tripEventContainer = contentListContainer.querySelector('.trip-events__list');

renderTemplate(tripEventContainer, createEventEditTemplate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < TRIP_ITEMS; i++) {
  renderTemplate(tripEventContainer, createTripEventTemplate(), RenderPosition.BEFOREEND);
}
