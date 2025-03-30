import {
  describe,
  expect,
  test,
} from 'vitest';

import { findOperator } from './search';

describe('[HELPER] Search', () => {

  test('findOperator should return correct operator', () => {
    const input_1 = '>=1';
    expect(findOperator(input_1)).toEqual('>=');

    const input_2 = '>= 1';
    expect(findOperator(input_2)).toEqual('>=');

    const input_3 = '= 1';
    expect(findOperator(input_3)).toEqual('=');

    const input_4 = '1 =';
    expect(findOperator(input_4)).toBeFalsy();

    const input_5 = 'eq 1';
    expect(findOperator(input_5)).toBeFalsy();

    const input_6 = undefined;
    expect(findOperator(input_6)).toBeFalsy();

  });
});
