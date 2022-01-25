import SiteNav from './view/menu-view';
import Sort from './view/sort-view';
import Filters from './view/filters-view';
import ContentList from './view/content-list-view';
import ListEmpty from './view/list-empty-view';

import Event from './view/event-view';
import EventEdit from './view/event-edit-view';

import {render, RenderPosition } from './render-helpers';
import {getEvent} from './mock/event';

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
const ListEmptyView = new ListEmpty().element;

render(navContainer, SiteNavView, RenderPosition.BEFOREEND);
render(filterContainer, FiltersView, RenderPosition.BEFOREEND);
render(contentListContainer, SortView, RenderPosition.BEFOREEND);
render(contentListContainer, ContentListView, RenderPosition.BEFOREEND);

const renderEvent = (container, event) => { //а правильно ли в функцию для рендеринга добавлять функционал смены вида карточки? Не смешиваются ли тут функционалы? Слышал, есть принцип по которому так лучше не делать.
  const EventView = new Event(event).element;
  const EventEditView = new EventEdit(event).element;

  const showEventEdit = () => {
    container.replaceChild(EventEditView, EventView);
  };

  const removeEventEdit = () => {
    container.replaceChild(EventView, EventEditView);
  };

  render(container, EventView, RenderPosition.AFTERBEGIN);
  EventView.querySelector('.event__rollup-btn')
    .addEventListener('click', showEventEdit);

  EventEditView.querySelector('form')
    .addEventListener('submit', removeEventEdit);

  EventEditView.querySelector('.event__rollup-btn')
    .addEventListener('click', removeEventEdit);
};

events.forEach((event) => {
  renderEvent(ContentListView, event);
});

if (!events.length) {
  render(ContentListView, ListEmptyView, RenderPosition.AFTERBEGIN);
}

