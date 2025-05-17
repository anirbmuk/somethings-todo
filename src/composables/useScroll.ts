import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { debounce } from 'radash';

export const useScroll = () => {
  const scrollYPosition = ref<number>(0);

  const callback = debounce({
    delay: 150,
  }, () => (scrollYPosition.value = window.scrollY));

  const scrollToTop = () => window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });

  const showBackToTopButton = computed(() => scrollYPosition.value > 200);

  onMounted(() => window.addEventListener('scroll', callback));
  onUnmounted(() => window.removeEventListener('scroll', callback));

  return {
    scrollToTop,
    showBackToTopButton,
  };
};
