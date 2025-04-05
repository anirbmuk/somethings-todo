import type { ITodoCondition } from '@/types/condition';
import type { ITodo } from '@/types/todo';

const SEARCH_OPERATORS = {
  LESS_THAN_OR_EQUALS: '<=',
  GREATER_THAN_OR_EQUALS: '>=',
  EQUALS: '=',
  LESS_THAN: '<',
  GREATER_THAN: '>',
} as const;

type OperatorKeys = keyof typeof SEARCH_OPERATORS;
type Operators = typeof SEARCH_OPERATORS[OperatorKeys];

export const getCompareConditions = (operator: Operators, comparator: number): ITodoCondition => {
  return (item: ITodo) => {
    if (
      item.additional?.remaining !== null &&
      item.additional?.remaining !== undefined
    ) {
      const { remaining } = item.additional;
      switch (operator) {
      case SEARCH_OPERATORS.LESS_THAN: {
        return remaining < comparator;
      }
      case SEARCH_OPERATORS.GREATER_THAN: {
        return remaining > comparator;
      }
      case SEARCH_OPERATORS.LESS_THAN_OR_EQUALS: {
        return remaining <= comparator;
      }
      case SEARCH_OPERATORS.GREATER_THAN_OR_EQUALS: {
        return remaining >= comparator;
      }
      case SEARCH_OPERATORS.EQUALS: {
        return remaining === comparator;
      }
      default: {
        return false;
      }
      }
    }
    return false;
  };
};

export const findOperator = (input: string | undefined): Operators | undefined => {
  if (!input) {
    return;
  }
  const validOperators = Object.values(SEARCH_OPERATORS).sort((operator1, operator2) => operator2.length - operator1.length);
  for (const validOperator of validOperators) {
    if (input.startsWith(`${validOperator}`)) {
      return validOperator;
    }
  }
};

export const getTextBasedConditions = (input: string): ITodoCondition => {
  const searchString = input.toLowerCase();
  return (item: ITodo) =>
    item.text?.toLowerCase().includes(searchString) ||
    item.heading.toLowerCase().includes(searchString) ||
    item.additional?.message?.toLowerCase()?.includes(searchString) ||
    item.performance?.message?.toLowerCase()?.includes(searchString) ||
    item.status?.toLowerCase() === searchString ||
    false;
};

export const getOperatorBasedConditions = (input: string, operator: Operators): ITodoCondition | undefined => {
  const comparatorValues = input.split(operator);
  if (comparatorValues.length !== 2) {
    return;
  }
  const [, value] = comparatorValues;
  const comparator = value?.trim() ? +value.trim() : undefined;
  if (comparator !== undefined && !isNaN(comparator)) {
    return getCompareConditions(operator, comparator);
  }
};
