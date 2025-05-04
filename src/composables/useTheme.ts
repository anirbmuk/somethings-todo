import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import type { TodoTheme } from '@/types/theme';

export const useTheme = () => {
  const themeStore = useThemeStore();

  const isDarkTheme = computed<boolean>(() => themeStore.todoTheme === 'dark');

  const setTheme = (theme: TodoTheme) => themeStore.setTheme(theme);
  const toggleTheme = () => themeStore.toggleTheme();

  return {
    isDarkTheme,
    setTheme,
    toggleTheme,
  };
};
