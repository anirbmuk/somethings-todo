import {
  describe,
  expect,
  test,
} from 'vitest';

import {
  isNextMonth,
  isThisMonth,
  getReadableDate,
  groupByFn,
  getStorageDate,
  transformDateDivider,
  getCurrentFormDateTime,
} from './date.ts';

describe('[HELPER] DATE', () => {

  test('isNextMonth should return correct boolean', () => {
    const today = new Date('2025-02-01');
    const due_1 = new Date('2025-02-15');
    const due_2 = new Date('2025-02-01');
    const due_3 = new Date('2025-03-01');

    expect(isNextMonth(due_1, today)).toBeFalsy();
    expect(isNextMonth(due_2, today)).toBeFalsy();
    expect(isNextMonth(due_3, today)).toBeTruthy();
  });

  test('isThisMonth should return correct boolean', () => {
    const today = new Date('2025-02-01');
    const due_1 = new Date('2025-02-15');
    const due_2 = new Date('2025-02-01');
    const due_3 = new Date('2025-03-01');

    expect(isThisMonth(due_1, today)).toBeTruthy();
    expect(isThisMonth(due_2, today)).toBeTruthy();
    expect(isThisMonth(due_3, today)).toBeFalsy();
  });

  test('getReadableDate should return correct formatted string', () => {
    const input_1 = '2025-01-31T00:00:00.000Z';
    expect(getReadableDate(input_1)).toEqual('Jan 31, 2025, 12:00:00 AM');

    const input_2 = '2025-05-31T00:00:00.000Z';
    expect(getReadableDate(input_2)).toEqual('May 31, 2025, 12:00:00 AM');
  });

  test('groupByFn should return correct date-group', () => {
    const today = new Date('2025-02-01');

    expect(groupByFn(today, 'day')).toEqual('2025-02-01');
    expect(groupByFn(today, 'month')).toEqual('2025-02');
  });

  test('getStorageDate should return correct date string', () => {
    const input_1 = '2025-01-31T00:00:00.000Z';
    expect(getStorageDate(input_1)).toEqual('2025-01-31T00:00:00.000Z');

    const input_2 = '2025-06-30T00:00:00.000Z';
    expect(getStorageDate(input_2)).toEqual('2025-06-30T00:00:00.000Z');

  });

  test('transformDateDivider should return correct date-group', () => {
    expect(transformDateDivider(null)).toBeFalsy();
    expect(transformDateDivider(undefined)).toBeFalsy();

    expect(transformDateDivider('2025-01')).toEqual('Jan 2025');
    expect(transformDateDivider('2025-01-01')).toEqual('Jan 01, 2025');
  });

  test('getCurrentFormDateTime should return correct date string', () => {
    const input_1 = '2025-01-01T14:30:30';
    expect(getCurrentFormDateTime(input_1)).toEqual('2025-01-01T14:30:00');

    const input_2 = '2025-01-01T14:30:30.000Z';
    expect(getCurrentFormDateTime(input_2)).toEqual('2025-01-01T14:30:00');

    const input_3 = '2025-06-01T14:30:30.000Z';
    expect(getCurrentFormDateTime(input_3)).toEqual('2025-06-01T14:30:00');

    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    const mm = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const dd = `${currentDate.getDate()}`.padStart(2, '0');
    const expectedOutput = `${yyyy}-${mm}-${dd}T23:59:00`;
    expect(getCurrentFormDateTime()).toEqual(expectedOutput);
    expect(getCurrentFormDateTime(undefined)).toEqual(expectedOutput);
  });

});
