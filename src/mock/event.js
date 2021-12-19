import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { getRandomInteger } from '../utils';

import { EVENT_TYPES, City, DESCRIPTION_SENTENCES } from './const';
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

const getDescription = () => {
  const sentencesArray = DESCRIPTION_SENTENCES.split('.')
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);
  const shuffledSentences = [...sentencesArray].sort(() => getRandomInteger(-1, 1));
  return shuffledSentences.splice(0, getRandomInteger(1, 5));
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
  const destination = {};
  const randomIndex = getRandomInteger(0, City.length - 1);

  destination.city = City[randomIndex];
  destination.desc = getDescription();
  destination.pics = getDestinationPics();
  return destination;
};

export const getEvent = () => {
  const options = [];
  for (let i = 0; i < OPTIONS_COUNT; i++) {
    options.push(getOption());
  }

  const { startDate, endDate} = getDate();

  const event = {
    type: getEventType(),
    destination: getDestination(),
    options: options,
    isFavourite: Boolean(getRandomInteger(0, -1)),
    startDate: startDate,
    endDate: endDate,
    price: getRandomInteger(50, 500),
  };

  return event;
};
