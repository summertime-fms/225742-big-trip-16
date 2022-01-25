import SiteNav from './view/menu-view';
import Sort from './view/sort-view';
import Filters from './view/filters-view';
import ContentList from './view/content-list-view';

import { createTripEventTemplate } from './view/event-view';
import { createEventEditTemplate } from './view/event-edit-view';

import { renderTemplate, render, RenderPosition } from './render-helpers';
import { getEvent } from './mock/event';
import SiteNav from './view/menu-view';
import Filters from './view/filters-view';

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

const SiteNav = new SiteNav().element;
const Filters = new Filters().element;
const Sort = new Sort().element;
const ContentList = new ContentList().element;

render(navContainer, SiteNav, RenderPosition.BEFOREEND);
render(filterContainer, Filters, RenderPosition.BEFOREEND);
render(contentListContainer, Sort, RenderPosition.BEFOREEND);
render(contentListContainer, ContentList, RenderPosition.BEFOREEND);

const tripEventContainer = contentListContainer.querySelector('.trip-events__list');

renderTemplate(tripEventContainer, createEventEditTemplate(events[0]), RenderPosition.AFTERBEGIN);

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(tripEventContainer, createTripEventTemplate(events[i + 1]), RenderPosition.BEFOREEND);
}
