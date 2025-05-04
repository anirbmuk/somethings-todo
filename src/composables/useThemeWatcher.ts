import {
  computed,
  watch,
} from 'vue';
import { useThemeStore } from '@/stores/theme';

export default () => {
  const themeStore = useThemeStore();

  const isDarkTheme = computed<boolean>(() => themeStore.todoTheme === 'dark');

  watch(isDarkTheme, (darkTheme) => {
    if (darkTheme) {
      window.document.body.classList.add('dark');
    } else {
      window.document.body.classList.remove('dark');
    }
  }, {
    immediate: true,
  });
};
