import { EVENT_TYPES, optionsParams } from './const';
import { getRandomInteger } from '../utils';

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

export const getOption = () => ({
  eventType: getRandomEventType(),
  name: getRandomOptionName(),
  price: getRandomPrice()
});


