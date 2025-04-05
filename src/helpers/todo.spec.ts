import {
  describe,
  expect,
  test,
} from 'vitest';

import {
  getTodoCountText,
  getRating,
  getStatus,
  decryptTodo,
  encryptTodo,
} from './todo';

import { isThisMonth } from './date.ts';
import type {
  ImportTodo,
  ITodo,
} from '@/types/todo.js';

const inputTodo = {
  todoid: 'mtc0mzg2nzq2mtuzmy02od',
  duedate: '2025-04-06T21:59:00.000Z',
  heading: 'TEST IMPORT',
  text: 'Test import text',
  status: 'Incomplete',
} satisfies ITodo;

const outputTodo = {
  todoid: 'mtc0mzg2nzq2mtuzmy02od',
  duedate: '2025-04-06T21:59:00.000Z',
  heading: 'TEST IMPORT',
  text: 'Test import text',
} satisfies ImportTodo;

const expectedEncryptedOutput = 'eyJ0b2RvaWQiOiJtdGMwbXpnMm56cTJtdHV6bXkwMm9kIiwiaGVhZGluZyI6IlRFU1QgSU1QT1JUIiwidGV4dCI6IlRlc3QgaW1wb3J0IHRleHQiLCJkdWVkYXRlIjoiMjAyNS0wNC0wNlQyMTo1OTowMC4wMDBaIn0=' as const;
const wrongEncryptedOutput = 'eyJoZWFkaW5nIjoiVEVTVCBJTVBPUlQiLCJ0ZXh0IjoiVGVzdCBpbXBvcnQgdGV4dCIsImR1ZWRhdGUiOiIyMDI1LTA0LTA2VDIxOjU5OjAwLjAwMFoifQ==' as const;

describe('[HELPER] TODO', () => {

  test('getTodoCountText should return correct message', () => {

    expect(getTodoCountText(null, false)).toBeFalsy();
    expect(getTodoCountText(null)).toBeFalsy();

    expect(getTodoCountText(undefined, false)).toBeFalsy();
    expect(getTodoCountText(undefined)).toBeFalsy();

    expect(getTodoCountText(null, true)).toEqual('All caught up ✔');
    expect(getTodoCountText(undefined, true)).toEqual('All caught up ✔');

    expect(getTodoCountText(0)).toBeFalsy();
    expect(getTodoCountText(0, true)).toEqual('All caught up ✔');

    expect(getTodoCountText(1)).toEqual('1 pending TODO');
    expect(getTodoCountText(1, true)).toEqual('1 pending TODO');

    expect(getTodoCountText(100)).toEqual('100 pending TODOs');
    expect(getTodoCountText(100, true)).toEqual('100 pending TODOs');

  });

  test('getRating should return correct message', () => {

    expect(getRating(-1)).toMatchObject({
      message: 'Completed before due date :-)',
    });
    expect(getRating(0)).toMatchObject({
      message: 'Completed on time :-)',
    });
    expect(getRating(1)).toMatchObject({
      message: 'Almost on time :-|',
    });
    expect(getRating(2)).toMatchObject({
      message: 'Task was delayed :-(',
    });

  });

  test('getStatus should return correct message', () => {

    const today = new Date();
    const now = +today;

    const one_day_ago = now - 24 * 3600 * 1000;
    expect(getStatus(new Date(one_day_ago).toISOString())).toMatchObject({
      message: 'Past due date',
    });

    expect(getStatus(new Date(now).toISOString())).toMatchObject({
      message: 'Due today',
    });

    const tomorrow = now + 24 * 3600 * 1000;
    expect(getStatus(new Date(tomorrow).toISOString())).toMatchObject({
      message: 'Due tomorrow',
    });

    const three_days_later = now + 3 * 24 * 3600 * 1000;
    expect(getStatus(new Date(three_days_later).toISOString())).toMatchObject({
      message: 'Due in 3 days',
    });

    const seven_days_later = now + 7 * 24 * 3600 * 1000;
    expect(getStatus(new Date(seven_days_later).toISOString())).toMatchObject({
      message: 'Due next week',
    });

    const eight_days_later = now + 8 * 24 * 3600 * 1000;
    const isEightDaysLaterInThisMonth = isThisMonth(today, new Date(eight_days_later));
    expect(getStatus(new Date(eight_days_later).toISOString())).toMatchObject({
      message: isEightDaysLaterInThisMonth ? 'Due this month' : 'Due next month',
    });

    const many_days_later = now + 62 * 24 * 3600 * 1000;
    expect(getStatus(new Date(many_days_later).toISOString())).toMatchObject({
      message: 'Due later',
    });

  });

  test('encryptTodo should return correct string', () => {
    expect(encryptTodo(inputTodo)).toEqual(expectedEncryptedOutput);
  });

  test('decryptTodo should return correct object or undefined', () => {
    expect(decryptTodo(expectedEncryptedOutput)).toMatchObject(outputTodo);
    expect(decryptTodo(wrongEncryptedOutput)).toBeFalsy();
    expect(decryptTodo('')).toBeFalsy();
    expect(decryptTodo('wrong_value')).toBeFalsy();
  });

});
