import EventsBoardPresenter from './presenter/events-board-presenter';

import {getEvent} from './mock/event';

const EVENTS_COUNT = 15;
const events = Array.from({length: EVENTS_COUNT}, getEvent);

//containers
const mainElement = document.querySelector('main');

// const navElement = document.querySelector('.trip-controls__navigation');
// const filterElement = document.querySelector('.trip-controls__filters');
const contentListContainer = mainElement.querySelector('.trip-events');

//rendering

const eventsBoardView = new EventsBoardPresenter(contentListContainer);
eventsBoardView.init(events);

