import type { GroupBy } from '@/types/todo';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const isNextMonth = (due: Date, now: Date) => {
  if (+due < +now) {
    return false;
  }
  const duemonth = due.getMonth();
  const nowmonth = now.getMonth();
  if (due.getFullYear() === now.getFullYear()) {
    return duemonth - nowmonth === 1;
  } else if (due.getFullYear() - now.getFullYear() === 1) {
    return duemonth - nowmonth === -11;
  }
  return false;
};

export const isThisMonth = (due: Date, now: Date) => {
  const duemonth = due.getMonth();
  const nowmonth = now.getMonth();
  if (due.getFullYear() === now.getFullYear()) {
    return duemonth === nowmonth;
  }
  return false;
};

export const getReadableDate = (isoDate: string) => {
  const dt = new Date(isoDate);
  const dd = dt.getDate();
  const mm = MONTHS[dt.getMonth()];
  const yyyy = dt.getFullYear();
  const time = dt.toLocaleString('de-DE', {
    hour: 'numeric',
    minute: 'numeric',
    second: '2-digit',
    hour12: true,
  });
  return `${mm} ${dd}, ${yyyy}, ${time}`;
};

export const groupByFn = (duedate: Date, groupby: GroupBy) => {
  const yyyy = duedate.getFullYear();
  const mm = String(duedate.getMonth() + 1).padStart(2, '0');
  if (groupby === 'month') {
    return `${yyyy}-${mm}`;
  }
  const dd = String(duedate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getStorageDate = (date?: string | undefined) => {
  if (!date) {
    return new Date().toISOString();
  }
  try {
    return new Date(date).toISOString();
  } catch {
    console.error(`Invalid date input: '${date}'`);
    return new Date().toISOString();
  }
};

export const transformDateDivider = (value: string | undefined | null): string | undefined => {
  if (!value) {
    return;
  }
  const [year, month, day] = value.split('-');
  return day
    ? `${MONTHS[+month - 1]} ${day}, ${year}`
    : `${MONTHS[+month - 1]} ${year}`;
};

export const getCurrentFormDateTime = (date?: string | undefined): string => {
  if (!date) {
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    const mm = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const dd = `${currentDate.getDate()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T23:59:00`;
  } else {
    const currentDate = new Date(date);
    const yyyy = currentDate.getFullYear();
    const mm = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const dd = `${currentDate.getDate()}`.padStart(2, '0');
    const HH = `${currentDate.getHours()}`.padStart(2, '0');
    const MM = `${currentDate.getMinutes()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${HH}:${MM}:00`;
  }
};

export const getMinDate = () => {
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const mm = `${currentDate.getMonth() + 1}`.padStart(2, '0');
  const dd = `${currentDate.getDate()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T00:00:00`;
};
