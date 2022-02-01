import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import ListEmptyView from '../view/list-empty-view';
import ContentListView from '../view/content-list-view';
import EventPresenter from './event-presenter';

import {render, RenderPosition} from '../utils/render';


export default class EventsBoardPresenter {
  #boardContainer = null;
  #filtersContainer = null;

  #filtersComp = new FiltersView();
  #sortComp = new SortView();
  #contentListComp = new ContentListView();
  #listEmptyComp = new ListEmptyView();

  #events = [];

  constructor(boardContainer, filtersContainer) {
    this.#boardContainer = boardContainer;
    this.#filtersContainer = filtersContainer;
  }

  init(events) {
    this.#events = events;

    this.#renderFilters(this.#filtersContainer);
    this.#renderBoard();
  }

  #renderFilters = () => {
    render(this.#filtersContainer, this.#filtersComp, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#boardContainer, this.#sortComp, RenderPosition.BEFOREEND);
  }

  #renderContentList = () => {
    render(this.#boardContainer, this.#contentListComp, RenderPosition.BEFOREEND);
    this.#renderEvents();
  }

  #renderEvent = (event) => {
    const eventView = new EventPresenter(this.#contentListComp);
    eventView.init(event);
  }

  #renderEvents = () => {
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderNoEvents = () => {
    render(this.#boardContainer, this.#listEmptyComp, RenderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (!this.#events.length) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderContentList();
  }
}
