import { getRandomInteger } from '../utils';
import { EVENT_TYPES } from './const';
import { CITIES } from './const';
import { getOption } from './options';

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length);
  return EVENT_TYPES[randomIndex];
};

const getCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length);
  return CITIES[randomIndex];
};

export const generateEvent = () => ({
  type: getEventType(),
  city: getCity(),
  options: getOption(), //TODO: получить несколько опций
});
