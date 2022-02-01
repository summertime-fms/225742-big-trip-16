import EventsBoardPresenter from './presenter/events-board-presenter';
import MenuView from './view/menu-view';

import {getEvent} from './mock/event';
import { render, RenderPosition } from './utils/render';

const EVENTS_COUNT = 15;
const events = Array.from({length: EVENTS_COUNT}, getEvent);

//containers
const mainElement = document.querySelector('main');

const navElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('.trip-controls__filters');
const contentListContainer = mainElement.querySelector('.trip-events');

//rendering

render(navElement, new MenuView().element, RenderPosition.BEFOREEND);

const eventsBoardView = new EventsBoardPresenter(contentListContainer, filterElement);
eventsBoardView.init(events);

