import { EVENT_TYPES, offersParams } from '../const';
import { getRandomInteger } from '../utils/common';

const OFFERS_COUNT = 5;

const getRandomEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const getRandomOptionName = () => {
  const randomIndex = getRandomInteger(0, offersParams.names.length - 1);
  return offersParams.names[randomIndex];
};

const getRandomPrice = () => {
  const randomIndex = getRandomInteger(0, offersParams.prices.length - 1);
  return offersParams.prices[randomIndex];
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


