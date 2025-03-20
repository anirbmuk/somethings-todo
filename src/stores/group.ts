import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { GroupBy } from '@/types/todo';

export const useGroupStore = defineStore('todo_group', () => {
  const groupBy = useStorage<GroupBy>('todo_group', 'day');
  const setGroupBy = (group: GroupBy) => groupBy.value = group;

  return {
    groupBy,
    setGroupBy,
  };
});
