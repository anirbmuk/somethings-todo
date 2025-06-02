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
  getCompletedTodoCount,
  getInCompleteTodoCount,
  getOnTimeTodoCount,
  getLateTodoCount,
  getPastDueTodoCount,
  getPerformance,
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

const getToday = (): [number, number, number] => {
  const today = new Date();
  return [today.getFullYear(), today.getMonth(), today.getDate()];
};

const [todayYear, todayMonth, todayDate] = getToday();
const today = new Date(Date.UTC(todayYear, todayMonth, 1));

const testTodos: ITodo[] = [
  {
    todoid: 'todo-1',
    duedate: '2024-06-01T12:00:00.000Z',
    heading: 'Complete assignment',
    text: 'Finish the math assignment',
    status: 'Complete',
    completedon: '2024-06-01T12:00:00.000Z',
    additional: {
      remaining: undefined,
      state: 'done',
      message: 'Done',
    },
    performance: {
      variation: 0,
      rating: 'ontime',
      message: 'Completed on time :-)',
    },
  },
  {
    todoid: 'todo-2',
    duedate: '2024-06-05T09:00:00.000Z',
    heading: 'Submit report',
    text: 'Submit the quarterly report',
    status: 'Complete',
    completedon: '2024-06-06T10:00:00.000Z',
    additional: {
      remaining: undefined,
      state: 'done',
      message: 'Done',
    },
    performance: {
      variation: 1,
      rating: 'delayed',
      message: 'Almost on time :-|',
    },
  },
  {
    todoid: 'todo-3',
    duedate: '2024-06-10T18:00:00.000Z',
    heading: 'Pay bills',
    text: 'Pay electricity and water bills',
    status: 'Complete',
    completedon: '2024-06-12T18:00:00.000Z',
    additional: {
      remaining: undefined,
      state: 'done',
      message: 'Done',
    },
    performance: {
      variation: 2,
      rating: 'late',
      message: 'Task was delayed :-(',
    },
  },
  {
    todoid: 'todo-4',
    duedate: '2024-06-10T18:00:00.000Z',
    heading: 'Buy groceries',
    text: 'Get groceries for the week',
    status: 'Incomplete',
    additional: {
      state: 'error',
      message: 'Past due date',
      remaining: -365,
    },
  },
  {
    todoid: 'todo-5',
    duedate: new Date(Date.UTC(todayYear, todayMonth, todayDate)).toISOString(),
    heading: 'Call plumber',
    text: 'Fix the kitchen sink leak',
    status: 'Incomplete',
    additional: {
      state: 'warn',
      message: 'Due today',
      remaining: 0,
    },
  },
  {
    todoid: 'todo-6',
    duedate: new Date(Date.UTC(todayYear, todayMonth, todayDate + 1)).toISOString(),
    heading: 'Book tickets',
    text: 'Book train tickets for vacation',
    status: 'Incomplete',
    additional: {
      state: 'warn',
      message: 'Due tomorrow',
      remaining: 1,
    },
  },
];

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

    const one_day_ago = Date.UTC(todayYear, todayMonth, todayDate - 1);
    expect(getStatus(new Date(one_day_ago).toISOString())).toMatchObject({
      state: 'error',
      message: 'Past due date',
    });

    expect(getStatus(new Date(Date.UTC(todayYear, todayMonth, todayDate)).toISOString())).toMatchObject({
      state: 'warn',
      message: 'Due today',
    });

    const tomorrow = Date.UTC(todayYear, todayMonth, todayDate + 1);
    expect(getStatus(new Date(tomorrow).toISOString())).toMatchObject({
      state: 'warn',
      message: 'Due tomorrow',
    });

    const three_days_later = Date.UTC(todayYear, todayMonth, todayDate + 3);
    expect(getStatus(new Date(three_days_later).toISOString())).toMatchObject({
      state: 'warn',
      message: 'Due in 3 days',
    });

    const seven_days_later = Date.UTC(todayYear, todayMonth, todayDate + 7);
    expect(getStatus(new Date(seven_days_later).toISOString())).toMatchObject({
      state: 'info',
      message: 'Due next week',
    });

    const eight_days_later = Date.UTC(todayYear, todayMonth, todayDate + 8);
    const isEightDaysLaterInThisMonth = isThisMonth(today, new Date(eight_days_later));
    expect(getStatus(new Date(eight_days_later).toISOString())).toMatchObject({
      state: isEightDaysLaterInThisMonth ? 'moderate' : 'safe',
      message: isEightDaysLaterInThisMonth ? 'Due this month' : 'Due next month',
    });

    const many_days_later = Date.UTC(todayYear, todayMonth, todayDate + 62);
    expect(getStatus(new Date(many_days_later).toISOString())).toMatchObject({
      state: 'later',
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

  test('getCompletedTodoCount should return correct count', () => {
    const completedTodoCount = getCompletedTodoCount(testTodos);
    expect(completedTodoCount).toBe(3);
  });

  test('getInCompleteTodoCount should return correct count', () => {
    const incompleteTodoCount = getInCompleteTodoCount(testTodos);
    expect(incompleteTodoCount).toBe(3);
  });

  test('getOnTimeTodoCount should return correct count', () => {
    const onTimeTodoCount = getOnTimeTodoCount(testTodos);
    expect(onTimeTodoCount).toBe(1);
  });

  test('getLateTodoCount should return correct count', () => {
    const lateTodoCount = getLateTodoCount(testTodos);
    expect(lateTodoCount).toBe(2);
  });

  test('getPastDueTodoCount should return correct count', () => {
    const pastTodoCount = getPastDueTodoCount(testTodos);
    expect(pastTodoCount).toBe(1);
  });

  test('getPerformance should return correct message', () => {
    expect(getPerformance('2024-06-01T12:00:00.000Z', undefined)).toMatchObject({
      rating: 'ontime',
      message: 'Completed on time :-)',
    });
    expect(getPerformance('2024-06-01T12:00:00.000Z', '2024-05-31T12:00:00.000Z')).toMatchObject({
      rating: 'beforetime',
      message: 'Completed before due date :-)',
    });
    expect(getPerformance('2024-06-01T12:00:00.000Z', '2024-06-01T18:00:00.000Z')).toMatchObject({
      rating: 'ontime',
      message: 'Completed on time :-)',
    });
    expect(getPerformance('2024-06-01T12:00:00.000Z', '2024-06-02T18:00:00.000Z')).toMatchObject({
      rating: 'delayed',
      message: 'Almost on time :-|',
    });
    expect(getPerformance('2024-06-01T12:00:00.000Z', '2025-06-02T18:00:00.000Z')).toMatchObject({
      rating: 'late',
      message: 'Task was delayed :-(',
    });
  });

});
