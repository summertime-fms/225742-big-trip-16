import { createNavTemplate } from './view/menu-view';
import { createFilterElement } from './view/filters-view';
import { createSortElement } from './view/sort-view';
import { createContentListTemplate } from './view/content-list-view';
import { createTripEventTemplate } from './view/trip-event-view';
import { createEventEditElement } from './view/event-edit-view';

//render helpers

const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

const renderBlock = (container, block, place) => {
  container.insertAdjacentHTML(place, block);
};

const TRIP_ITEMS = 3;

//containers

const main = document.querySelector('main');

const navContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events h2');
const contentListContainer = main.querySelector('.trip-events');


//rendering

renderBlock(navContainer, createNavTemplate(), renderPosition.BEFOREEND);
renderBlock(filterContainer, createFilterElement(), renderPosition.BEFOREEND);
renderBlock(sortContainer, createSortElement(), renderPosition.AFTEREND);
renderBlock(contentListContainer, createContentListTemplate(), renderPosition.BEFOREEND);

const tripEventContainer = contentListContainer.querySelector('.trip-events__list');

renderBlock(tripEventContainer, createEventEditElement(), renderPosition.AFTERBEGIN);

for (let i = 0; i < TRIP_ITEMS; i++) {
  renderBlock(tripEventContainer, createTripEventTemplate(), renderPosition.BEFOREEND);
}
