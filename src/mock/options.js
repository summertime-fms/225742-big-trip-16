import { EVENT_TYPES } from './const';
import { getRandomInteger } from '../utils';
import { optionsParams } from './const';

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const getOptionName = () => {
  const randomIndex = getRandomInteger(0, optionsParams.names.length - 1);
  return optionsParams.names[randomIndex];
};

const getRandomPrice = () => {
  const randomIndex = getRandomInteger(0, optionsParams.prices.length - 1);
  return optionsParams.prices[randomIndex];
};

export const getOption = () => ({
  eventType: getEventType(),
  name: getOptionName(),
  price: getRandomPrice()
});


