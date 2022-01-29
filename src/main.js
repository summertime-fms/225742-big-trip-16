import MenuView from './view/menu-view';
import SortView from './view/sort-view';
import FiltersView from './view/filters-view';
import ContentListView from './view/content-list-view';
import ListEmptyView from './view/list-empty-view';

import EventView from './view/event-view';
import EventEditView from './view/event-edit-view';

import {render, RenderPosition, replace } from './utils/render';
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
    replace(eventViewComp, eventEditComp);
  };

  const replaceEventToForm = () => {
    replace(eventEditComp, eventViewComp);
  };

  const onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDownHandler);
    }
  };

  eventViewComp.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDownHandler);
  });

  eventEditComp.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDownHandler);
  });

  eventEditComp.setEditCloseHandler(() => {
    replace(eventViewComp, eventEditComp);
    document.removeEventListener('keydown', onEscKeyDownHandler);
  });

  render(eventListElement, eventViewComp, RenderPosition.AFTERBEGIN);
};

const renderEventList = (eventsListContainer) => {
  const contentListComp = new ContentListView();

  render(eventsListContainer, new SortView(), RenderPosition.BEFOREEND);
  render(eventsListContainer, contentListComp, RenderPosition.BEFOREEND);

  if (!events.length) {
    render(contentListComp.element, new ListEmptyView(), RenderPosition.AFTERBEGIN);
    return;
  }

  events.forEach((event) => {
    renderEvent(contentListComp.element, event);
  });
};

render(navElement, siteNavComp, RenderPosition.BEFOREEND);
render(filterElement, filtersComp, RenderPosition.BEFOREEND);

renderEventList(contentListContainer);
