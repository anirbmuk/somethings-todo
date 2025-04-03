import {
  describe,
  expect,
  test,
} from 'vitest';

import {
  getTodoCountText,
  getRating,
  getStatus,
} from './todo';

import { isThisMonth } from './date.ts';

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

});
