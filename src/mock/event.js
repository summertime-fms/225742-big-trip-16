import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { getRandomInteger, dateParams } from '../utils';
import { EVENT_TYPES, CITIES, DESCRIPTION_SENTENCES } from './const';
import { getOption } from './options';

const OPTIONS_COUNT = 3;

const getDate = () => {
  const startDate = dayjs()
    .add(getRandomInteger(0, dateParams.DAYS_GAP), 'day')
    .add(getRandomInteger(0, dateParams.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, dateParams.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, dateParams.SECONDS_GAP), 'seconds')
    .toDate();

  const endDate = dayjs(startDate).add(getRandomInteger(1, 5), 'days')
    .add(getRandomInteger(0, dateParams.DAYS_GAP), 'day')
    .add(getRandomInteger(0, dateParams.HOURS_GAP), 'hours')
    .add(getRandomInteger(0, dateParams.MINUTES_GAP), 'minutes')
    .add(getRandomInteger(0, dateParams.SECONDS_GAP), 'seconds')
    .toDate();

  const eventDuration = dayjs(endDate).diff(startDate);

  return { startDate, endDate, eventDuration };
};

const getFormattedDuration = (eventDuration) => {
  const isLeadingZeroNumber = (num) => num >= 10 ? num : `0${num}`;

  const durationSeconds = parseInt(eventDuration / dateParams.MS_PER_SECOND, 10);
  const durationMinutes = parseInt(durationSeconds / dateParams.SECONDS_PER_MINUTE, 10);
  const durationHours = parseInt(durationMinutes / dateParams.MINUTES_PER_HOUR, 10);
  const durationDays = parseInt(durationHours / dateParams.HOURS_PER_DAY, 10);

  const relativeMinutes = dayjs.duration(eventDuration).minutes();
  const relativeHours = dayjs.duration(eventDuration).hours();
  const relativeDays = dayjs.duration(eventDuration).days();

  const formatedMinutes = `${isLeadingZeroNumber(relativeMinutes)}M`;
  const formatedHours = `${isLeadingZeroNumber(relativeHours)}H`;
  const formatedDays = `${isLeadingZeroNumber(relativeDays)}D`;

  if (durationHours < 1) {
    return `${formatedMinutes}`;
  }

  if (durationDays < 1) {
    return `${formatedHours} ${formatedMinutes}`;
  }

  return `${formatedDays} ${formatedHours} ${formatedMinutes}`;
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

  const { startDate, endDate, eventDuration } = getDate();

  const event = {
    type: getEventType(),
    city: getCity(),
    options: options,
    description: getDescription(),
    pics: getEventPics(),
    isFavourite: Boolean(getRandomInteger(0, -1)),
    startDate: startDate,
    endDate: endDate,
    eventDuration: getFormattedDuration(eventDuration),
    price: getRandomInteger(50, 500),
  };

  return event;
};
