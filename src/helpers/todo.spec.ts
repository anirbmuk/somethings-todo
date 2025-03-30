import {
  describe,
  expect,
  test,
} from 'vitest';

import { getTodoCountText } from './todo';

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

});
