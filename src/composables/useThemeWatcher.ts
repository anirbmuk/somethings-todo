import {
  computed,
  watch,
} from 'vue';
import { useThemeStore } from '@/stores/theme';

export default () => {
  const themeStore = useThemeStore();

  const isDarkTheme = computed<boolean>(() => themeStore.todoTheme === 'dark');

  const bodyStyles = window.getComputedStyle(document.body);
  const baseColor = bodyStyles.getPropertyValue('--base-color');
  const primaryColor = bodyStyles.getPropertyValue('--primary-color');

  watch(isDarkTheme, (darkTheme) => {
    if (darkTheme) {
      window.document.body.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', baseColor);
    } else {
      window.document.body.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', primaryColor);
    }
  }, {
    immediate: true,
  });
};
