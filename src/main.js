import SiteNav from './view/menu-view';
import Sort from './view/sort-view';
import Filters from './view/filters-view';
import ContentList from './view/content-list-view';

import Event from './view/event-view';

import { createEventEditTemplate } from './view/event-edit-view';

import { renderTemplate, render, RenderPosition } from './render-helpers';
import { getEvent } from './mock/event';

const EVENTS_COUNT = 15;

const events = [];

for (let i = 0; i < EVENTS_COUNT; i++) {
  events.push(getEvent(i + 1));
}

//containers
const main = document.querySelector('main');

const navContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const contentListContainer = main.querySelector('.trip-events');


//rendering

const SiteNavView = new SiteNav().element;
const FiltersView = new Filters().element;
const SortView = new Sort().element;
const ContentListView = new ContentList().element;

render(navContainer, SiteNavView, RenderPosition.BEFOREEND);
render(filterContainer, FiltersView, RenderPosition.BEFOREEND);
render(contentListContainer, SortView, RenderPosition.BEFOREEND);
render(contentListContainer, ContentListView, RenderPosition.BEFOREEND);

const tripEventContainer = contentListContainer.querySelector('.trip-events__list');

renderTemplate(tripEventContainer, createEventEditTemplate(events[0]), RenderPosition.AFTERBEGIN);

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(tripEventContainer, new Event(events[i]).element, RenderPosition.BEFOREEND);
}
