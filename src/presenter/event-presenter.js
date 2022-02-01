import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT'
};

export default class EventPresenter {
  #event = null;
  #eventsListContainer = null;
  #mode = Mode.DEFAULT;

  #eventViewComp = null;
  #eventEditViewComp = null;

  constructor(eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init(event) {
    this.#event = event;

    const prevEventViewComp = this.#eventViewComp;
    const prevEventEditViewComp = this.#eventEditViewComp;

    this.#eventViewComp = new EventView(event);
    this.#eventEditViewComp = new EventEditView(event);

    this.#eventViewComp.setEditClickHandler(this.#editClickHandler);
    this.#eventEditViewComp.setFormSubmitHandler(this.#formSubmitHandler);
    this.#eventEditViewComp.setEditCloseHandler(this.#editClickHandler);

    if (prevEventViewComp === null || prevEventEditViewComp === null) {
      render(this.#eventsListContainer, this.#eventViewComp, RenderPosition.AFTERBEGIN);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventViewComp, prevEventViewComp);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#eventEditViewComp, prevEventEditViewComp);
    }

    remove(prevEventViewComp);
    remove(prevEventEditViewComp);
  }

  destroy = () => {
    remove(this.#eventViewComp);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  #replaceFormToEvent = () => {
    replace(this.#eventViewComp, this.#eventEditViewComp);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceEventToForm = () => {
    replace(this.#eventEditViewComp, this.#eventViewComp);
    this.#mode = Mode.EDIT;
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #editClickHandler = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#replaceEventToForm();
      return;
    }

    this.#replaceFormToEvent();
  }

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #formSubmitHandler = () => {
    this.#replaceFormToEvent();
  }
}
