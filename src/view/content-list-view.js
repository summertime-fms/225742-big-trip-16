import AbstractView from './abstract-view';

const createContentListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ContentListView extends AbstractView {
  get template() {
    return createContentListTemplate();
  }
}
