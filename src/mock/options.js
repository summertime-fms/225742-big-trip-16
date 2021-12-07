import { EVENT_TYPES } from './const';
import { getRandomInteger } from '../utils';
import { optionsParams } from './const';

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length);
  return EVENT_TYPES[randomIndex];
};

const getOptionName = () => {
  const randomIndex = getRandomInteger(0, optionsParams.names.length);
  return optionsParams.names[randomIndex];
};

const getRandomPrice = () => {
  const randomIndex = getRandomInteger(0, optionsParams.prices.length);
  return optionsParams.prices[randomIndex];
};

export const getOption = () => ({
  eventType: getEventType(),
  name: getOptionName(),
  price: getRandomPrice()
});


