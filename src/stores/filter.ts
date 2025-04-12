import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { FilterBy } from '@/types/todo';
import { debounce } from 'radash';

export const useFilterStore = defineStore('todo_filter', () => {
  const filterBy = useStorage<FilterBy>('todo_filter', 'show');
  const setFilterBy = (filter: FilterBy) => filterBy.value = filter;
  const setDelayedFilterBy = debounce({
    delay: 200,
  }, setFilterBy);

  return {
    filterBy,
    setFilterBy,
    setDelayedFilterBy,
  };
});
