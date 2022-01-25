import SiteNav from './view/menu-view';
import Sort from './view/sort-view';
import Filters from './view/filters-view';
import ContentList from './view/content-list-view';

import { createTripEventTemplate } from './view/event-view';
import { createEventEditTemplate } from './view/event-edit-view';

import { renderTemplate, render, RenderPosition } from './render-helpers';
import { getEvent } from './mock/event';

const EVENTS_COUNT = 15;

const events = [];

for (let i = 0; i <EVENTS_COUNT; i++) {
  events.push(getEvent(i + 1));
}

//containers
const main = document.querySelector('main');

const navContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentListContainer = main.querySelector('.trip-events');


//rendering

render(navContainer, new SiteNav().element, RenderPosition.BEFOREEND);
render(filterContainer, new Filters.element, RenderPosition.BEFOREEND);
render(contentListContainer, new Sort().element, RenderPosition.BEFOREEND);
render(contentListContainer, new ContentList().element, RenderPosition.BEFOREEND);

const tripEventContainer = contentListContainer.querySelector('.trip-events__list');

renderTemplate(tripEventContainer, createEventEditTemplate(events[0]), RenderPosition.AFTERBEGIN);

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(tripEventContainer, createTripEventTemplate(events[i + 1]), RenderPosition.BEFOREEND);
}
