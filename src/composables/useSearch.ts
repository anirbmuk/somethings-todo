import {
  computed,
  ref,
  watch,
} from 'vue';
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';
import {
  findOperator,
  getOperatorBasedConditions,
  getTextBasedConditions,
} from '@/helpers/search';
import type { ITodoCondition } from '@/types/condition';
import type { ITodo } from '@/types/todo';

export const useSearch = () => {
  const filterStore = useFilterStore();
  const searchStore = useSearchStore();

  const searchValue = ref<string | undefined>(searchStore.todoSearchState.text);

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
      const operatorBasedCondition = getOperatorBasedConditions(searchInput, operator);
      if (operatorBasedCondition) {
        operatorBasedConditions.push(operatorBasedCondition);
      }
    }
    hasOperator = Boolean(operatorBasedConditions.length);

    if (!hasOperator) {
      todoFilterConditions.push(getTextBasedConditions(searchInput));
    }
    return [...todoFilterConditions, ...operatorBasedConditions];
  });

  watch(searchValue, (text) => searchStore.setSearchText(text));
  watch(() => searchStore.todoSearchState.text, (text) => searchValue.value = text);

  const toggleSearchState = () => searchStore.toggleSearchState();

  return {
    conditions,
    searchValue,
    toggleSearchState,
  };
};
