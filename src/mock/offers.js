import { EVENT_TYPES, optionsParams } from '../const';
import { getRandomInteger } from '../utils';

const OFFERS_COUNT = 5;

const getRandomEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const getRandomOptionName = () => {
  const randomIndex = getRandomInteger(0, optionsParams.names.length - 1);
  return optionsParams.names[randomIndex];
};

const getRandomPrice = () => {
  const randomIndex = getRandomInteger(0, optionsParams.prices.length - 1);
  return optionsParams.prices[randomIndex];
};

const getOffer = (id) => {
  const offerTitle = getRandomOptionName();

  const offer = {
    id: id,
    labelId: offerTitle.toLowerCase().replaceAll(' ', '-'),
    title: offerTitle,
    price: getRandomPrice()
  };

  return offer;
};

export const getEventOffers = () => {
  const offers = [];
  for (let i = 0; i < OFFERS_COUNT; i++) {
    offers.push(getOffer(i + 1));
  }

  const eventOffer = {
    eventType: getRandomEventType(),
    offers: offers,
  };

  return eventOffer;
};


