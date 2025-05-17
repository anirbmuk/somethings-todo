import {
  computed,
  ref,
} from 'vue';
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';
import {
  findOperator,
  getMemoizedTextBasedConditions,
  getMemoizedOperatorBasedConditions,
} from '@/helpers/search';
import type { ITodoCondition } from '@/types/condition';
import type { ITodo } from '@/types/todo';

const searchValue = ref<string | undefined>();

export const useSearch = () => {
  const filterStore = useFilterStore();
  const searchStore = useSearchStore();

  searchValue.value = searchStore.todoSearchState.text;

  const conditions = computed<ITodoCondition[]>(() => {
    let hasOperator = false;
    const todoFilterConditions: ITodoCondition[] = [];
    if (filterStore.filterBy === 'hide') {
      todoFilterConditions.push((item: ITodo) => item.status === 'Incomplete');
    }

    const searchInput = searchStore.todoSearchState.text;
    if (!searchInput || searchInput.length < 2) {
      return todoFilterConditions;
    }

    const operatorBasedConditions: ITodoCondition[] = [];
    const operator = findOperator(searchInput);
    if (operator) {
      const operatorBasedCondition = getMemoizedOperatorBasedConditions(searchInput, operator);
      if (operatorBasedCondition) {
        operatorBasedConditions.push(operatorBasedCondition);
      }
    }
    hasOperator = Boolean(operatorBasedConditions.length);

    if (!hasOperator) {
      todoFilterConditions.push(getMemoizedTextBasedConditions(searchInput));
    }
    return [...todoFilterConditions, ...operatorBasedConditions];
  });

  const toggleSearchState = () => searchStore.toggleSearchState();

  const clearSearch = () => {
    searchValue.value = '';
    toggleSearchState();
  };

  return {
    conditions,
    searchValue,
    clearSearch,
  };
};
