import dayjs from 'dayjs';
import { DateParam } from './mock/const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getFormattedDuration = (eventDuration) => {
  const checkLeadingZeroNumber = (num) => num >= 10 ? num : `0${num}`;

  const durationSeconds = parseInt((eventDuration / DateParam.MS_PER_SECOND), 10);
  const durationMinutes = parseInt((durationSeconds / DateParam.SECONDS_PER_MINUTE), 10);
  const durationHours = parseInt((durationMinutes / DateParam.MINUTES_PER_HOUR), 10);
  const durationDays = parseInt((durationHours / DateParam.HOURS_PER_DAY), 10);

  const relativeMinutes = dayjs.duration(eventDuration).minutes();
  const relativeHours = dayjs.duration(eventDuration).hours();
  const relativeDays = dayjs.duration(eventDuration).days();

  const formatedMinutes = `${checkLeadingZeroNumber(relativeMinutes)}M`;
  const formatedHours = `${checkLeadingZeroNumber(relativeHours)}H`;
  const formatedDays = `${checkLeadingZeroNumber(relativeDays)}D`;

  if (durationHours < 1) {
    return `${formatedMinutes}`;
  }

  if (durationDays < 1) {
    return `${formatedHours} ${formatedMinutes}`;
  }

  return `${formatedDays} ${formatedHours} ${formatedMinutes}`;
};
