import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { FilterBy } from '@/types/todo';

export const useFilterStore = defineStore('todo_filter', () => {
  const filterBy = useStorage<FilterBy>('todo_filter', 'show');
  const setFilterBy = (filter: FilterBy) => filterBy.value = filter;

  return {
    filterBy,
    setFilterBy,
  };
});
