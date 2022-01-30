import MenuView from '../view/menu-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import ListEmptyView from '../view/list-empty-view';
import ContentListView from '../view/content-list-view';
import EventPresenter from './event-presenter';

import {render, RenderPosition} from '../utils/render';


export default class EventsBoardPresenter {
  #boardContainer = null;

  #siteNavComp = new MenuView();
  #filtersComp = new FiltersView();
  #sortComp = new SortView();
  #contentListComp = new ContentListView();
  #listEmptyComp = new ListEmptyView();

  #events = [];
  #navContainer = null;
  #filtersContainer = null;
  #sortContainer = null;

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init(events) {
    this.#events = events; //spread
    // this.#navContainer = navContainer;
    // this.#filtersContainer = filtersContainer;
    // this.#sortContainer = sortContainer;

    // this.#renderSiteNav(this.#navContainer);
    // this.#renderFilters(this.#filtersContainer);
    this.#renderBoard();
  }

  // #renderSiteNav = () => {
  //   render(this.#navContainer, this.#siteNavComp, RenderPosition.BEFOREEND);
  // }

  // #renderFilters = () => {
  //   render(this.#filtersContainer, this.#filtersComp, RenderPosition.BEFOREEND);
  // }

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

  // render(eventsListContainer, #sortComp, RenderPosition.BEFOREEND);
  // render(eventsListContainer, contentListComp, RenderPosition.BEFOREEND);

  // if (!events.length) {
  //   render(contentListComp.element, new ListEmptyView(), RenderPosition.AFTERBEGIN);
  //   return;
  // }

  // events.forEach((event) => {
  //   renderEvent(contentListComp.element, event);
  // });
}
