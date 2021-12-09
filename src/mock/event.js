import dayjs from 'dayjs';

import { getRandomInteger } from '../utils';
import { EVENT_TYPES, CITIES, DESCRIPTION_SENTENCES } from './const';
import { getOption } from './options';

const OPTIONS_COUNT = 3;

const getDate = () => {
  const maxDaysGap = 31;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day').toDate();
};

const getEventType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};

const getCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const getDescription = () => {
  const sentencesArray = DESCRIPTION_SENTENCES.split('.')
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);
  const shuffledSentences = sentencesArray.sort(() => getRandomInteger(-1, 1));
  return [...shuffledSentences].splice(0, getRandomInteger(1, 5));
};

const getEventPics = () => {
  const picsArray = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    picsArray.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`);
  }
  return picsArray;
};

export const getEvent = () => {
  const options = [];
  for (let i = 0; i < OPTIONS_COUNT; i++) {
    options.push(getOption());
  }

  const event = {
    type: getEventType(),
    city: getCity(),
    options: options,
    description: getDescription(),
    pics: getEventPics(),
    isFavourite: Boolean(getRandomInteger(0, -1)),
    date: getDate(),
    price: getRandomInteger(50, 500),
  };

  return event;
};
