import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { getRandomInteger } from '../utils';

import { EVENT_TYPES, CITIES, DESCRIPTION_SENTENCES } from './const';
import { getOption } from './options';

const OPTIONS_COUNT = 3;

const getDate = () => {
  const gaps = {
    DAYS_GAP: 3,
    HOURS_GAP: 24,
    MINUTES_GAP: 60,
    SECONDS_GAP: 60
  };

  const startDate = dayjs()
    .add(getRandomInteger(0, gaps.DAYS_GAP), 'day')
    .add(getRandomInteger(0, gaps.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, gaps.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, gaps.SECONDS_GAP), 'seconds')
    .toDate();

  const endDate = dayjs(startDate).add(getRandomInteger(1, 5), 'days')
    .add(getRandomInteger(0, gaps.DAYS_GAP), 'day')
    .add(getRandomInteger(0, gaps.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, gaps.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, gaps.SECONDS_GAP), 'seconds')
    .toDate();

  return { startDate, endDate };
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
  const shuffledSentences = [...sentencesArray].sort(() => getRandomInteger(-1, 1));
  return shuffledSentences.splice(0, getRandomInteger(1, 5));
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

  const { startDate, endDate} = getDate();

  const event = {
    type: getEventType(),
    city: getCity(),
    options: options,
    description: getDescription(),
    pics: getEventPics(),
    isFavourite: Boolean(getRandomInteger(0, -1)),
    startDate: startDate,
    endDate: endDate,
    // eventDuration: getFormattedDuration(eventDuration),
    price: getRandomInteger(50, 500),
  };

  return event;
};
