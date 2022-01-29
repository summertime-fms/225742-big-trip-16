import MenuView from './view/menu-view';
import SortView from './view/sort-view';
import FiltersView from './view/filters-view';
import ContentListView from './view/content-list-view';
import ListEmptyView from './view/list-empty-view';

import EventView from './view/event-view';
import EventEditView from './view/event-edit-view';

import {render, RenderPosition } from './render';
import {getEvent} from './mock/event';

const EVENTS_COUNT = 15;
const events = Array.from({length: EVENTS_COUNT}, getEvent);

//containers
const mainElement = document.querySelector('main');

const navElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('.trip-controls__filters');
const contentListContainer = mainElement.querySelector('.trip-events');

//rendering
const siteNavComp = new MenuView();
const filtersComp = new FiltersView();

const renderEvent = (eventListElement, event) => {
  const eventViewComp = new EventView(event);
  const eventEditComp = new EventEditView(event);

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventViewComp.element, eventEditComp.element);
  };

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComp.element, eventViewComp.element);
  };

  const onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDownHandler);
    }
  };

  eventViewComp.element.querySelector('.event__rollup-btn')
    .addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', replaceFormToEvent);
    });

  eventEditComp.element.querySelector('form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();

      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDownHandler);
    });

  eventEditComp.element.querySelector('.event__rollup-btn')
    .addEventListener('click', replaceFormToEvent);

  render(eventListElement, eventViewComp.element, RenderPosition.AFTERBEGIN);
};

const renderEventList = (eventsListContainer) => {
  const contentListComp = new ContentListView();

  render(eventsListContainer, new SortView().element, RenderPosition.BEFOREEND);
  render(eventsListContainer, contentListComp.element, RenderPosition.BEFOREEND);

  if (!events.length) {
    render(contentListComp.element, new ListEmptyView().element, RenderPosition.AFTERBEGIN);
    return;
  }

  events.forEach((event) => {
    renderEvent(contentListComp.element, event);
  });
};

render(navElement, siteNavComp.element, RenderPosition.BEFOREEND);
render(filterElement, filtersComp.element, RenderPosition.BEFOREEND);

renderEventList(contentListContainer);
