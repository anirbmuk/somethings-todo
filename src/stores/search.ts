import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { debounce } from 'radash';

export const useSearchStore = defineStore('todo_search', () => {
  const todoSearchState = useStorage<{ search?: boolean; text?: string | undefined }>('todo_search', {
  }, localStorage, {
    serializer: {
      read(raw) {
        return JSON.parse(raw);
      },
      write(value) {
        return JSON.stringify(value);
      },
    },
  });

  const setSearchState = (state: boolean) => todoSearchState.value.search = state;
  const toggleSearchState = () => {
    todoSearchState.value.search = !todoSearchState.value.search;
    if (!todoSearchState.value.search) {
      todoSearchState.value.text = '';
    }
  };
  const setSearchText = (text: string | undefined) => todoSearchState.value.text = text;
  const setDelayedSearchText = debounce({
    delay: 200,
  }, setSearchText);

  return {
    todoSearchState,
    setSearchState,
    toggleSearchState,
    setSearchText,
    setDelayedSearchText,
  };
});
