import { defineStore } from 'pinia';
import {
  computed,
  ref,
  watch,
} from 'vue';

export const useModal = (key: string) => {
  const useModalStore = defineStore(`modal_${key}`, () => {
    const _state = ref<boolean>(false);
    const open = () => (_state.value = true);
    const close = () => (_state.value = false);
    const state = computed(() => _state.value);
    return {
      state,
      open,
      close,
    };
  });
  const modalStore = useModalStore();
  const {
    open: showModal,
    close: closeModal,
  } = modalStore;

  watch(() => modalStore.state, (open) => {
    if (open) {
      window.document.body.classList.add('overflow-hidden');
    } else {
      window.document.body.classList.remove('overflow-hidden');
    }
  });

  return {
    modalState: computed(() => modalStore.state),
    showModal,
    closeModal,
  };
};
