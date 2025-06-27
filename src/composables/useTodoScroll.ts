import { computed } from 'vue';
import { useScroll } from '@vueuse/core';

export const useTodoScroll = () => {
  const { arrivedState } = useScroll(window, {
    offset: {
      top: 200,
    },
    throttle: 150,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const showBackToTopButton = computed(() => !arrivedState.top);

  return {
    scrollToTop,
    showBackToTopButton,
  };
};
