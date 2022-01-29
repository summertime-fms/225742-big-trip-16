import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { nanoid } from 'nanoid';
dayjs.extend(duration);

import { getRandomInteger } from '../utils/common';

import { EVENT_TYPES, CITIES, DESCRIPTION_SENTENCES, MIN_PRICE, MAX_PRICE, Gaps, MIN_END_DATE, MIN_DESC_SENTENCES, MAX_DESC_SENTENCES, MAX_END_DATE } from '../const';
import { getEventOffers } from './offers';

const getDate = () => {
  const startDate = dayjs()
    .add(getRandomInteger(0, Gaps.DAYS_GAP), 'day')
    .add(getRandomInteger(0, Gaps.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, Gaps.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, Gaps.SECONDS_GAP), 'seconds')
    .toDate();

  const endDate = dayjs(startDate).add(getRandomInteger(MIN_END_DATE, MAX_END_DATE), 'days')
    .add(getRandomInteger(0, Gaps.DAYS_GAP), 'day')
    .add(getRandomInteger(0, Gaps.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, Gaps.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, Gaps.SECONDS_GAP), 'seconds')
    .toDate();

  return { startDate, endDate };
};

const getEventType = () => {
  const eventTypesArray = Object.keys(EVENT_TYPES);
  const randomIndex = getRandomInteger(0, eventTypesArray.length - 1);
  return eventTypesArray[randomIndex];
};

const getDescription = () => {
  const sentencesArray = DESCRIPTION_SENTENCES.split('.')
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);
  const shuffledSentences = [...sentencesArray].sort(() => getRandomInteger(-1, 1))
    .map((sentence) => `${sentence}.`)
    .splice(0, getRandomInteger(MIN_DESC_SENTENCES, MAX_DESC_SENTENCES))
    .join(' ');
  return shuffledSentences;
};

const getDestinationPics = () => {
  const picsArray = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    const pic = {};
    pic.src = `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
    pic.description = getDescription();
    picsArray.push(pic);
  }

  return picsArray;
};

const getDestination = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  const destination = {
    city: CITIES[randomIndex],
    description: getDescription(),
    pics: getDestinationPics()
  };

  return destination;
};

export const getEvent = () => {
  const { startDate, endDate} = getDate();

  const event = {
    id: nanoid(),
    type: getEventType(),
    destination: getDestination(),
    eventOffers: getEventOffers(),
    isFavourite: Boolean(getRandomInteger(0, -1)),
    startDate: startDate,
    endDate: endDate,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };

  return event;
};
