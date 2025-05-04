import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { TodoTheme } from '@/types/theme';

export const useThemeStore = defineStore('todo_theme', () => {
  const todoTheme = useStorage<TodoTheme>('todo_theme', 'light');
  const setTheme = (theme: TodoTheme) => todoTheme.value = theme;
  const toggleTheme = () => {
    if (todoTheme.value === 'dark') {
      todoTheme.value = 'light';
    } else {
      todoTheme.value = 'dark';
    }
  };

  return {
    todoTheme,
    setTheme,
    toggleTheme,
  };
});
