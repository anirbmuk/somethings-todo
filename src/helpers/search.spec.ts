import {
  describe,
  expect,
  test,
} from 'vitest';

import { findOperator } from './search';

describe('[HELPER] Search', () => {

  test('findOperator should return correct operator', () => {
    expect(findOperator('>=1')).toEqual('>=');
    expect(findOperator('>= 1')).toEqual('>=');
    expect(findOperator('= 1')).toEqual('=');
    expect(findOperator('1 =')).toBeFalsy();
    expect(findOperator('eq 1')).toBeFalsy();
    expect(findOperator(undefined)).toBeFalsy();
    expect(findOperator('<= 10')).toEqual('<=');
    expect(findOperator('<=99')).toEqual('<=');
    expect(findOperator('50<=')).toBeFalsy();
  });
});
