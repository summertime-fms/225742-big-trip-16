import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

import {render, RenderPosition, replace} from '../utils/render';

export default class EventPresenter {
  #event = null;
  #eventsListContainer = null;
  #eventViewComp = null;
  #eventEditViewComp = null;

  constructor(eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init(event) {
    this.#event = event;

    this.#eventViewComp = new EventView(event);
    this.#eventViewComp.setEditClickHandler(this.#editClickHandler);
    this.#eventEditViewComp = new EventEditView(event);
    this.#eventEditViewComp.setFormSubmitHandler(this.#formSubmitHandler);

    render(this.#eventsListContainer, this.#eventViewComp, RenderPosition.AFTERBEGIN);
  }

  #replaceFormToEvent = () => {
    replace(this.#eventViewComp, this.#eventEditViewComp);
  };

  #replaceEventToForm = () => {
    replace(this.#eventEditViewComp, this.#eventViewComp);
  };

  #editClickHandler = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  }

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #formSubmitHandler = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  }
}
