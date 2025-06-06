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

  const findActiveInput = (element: HTMLElement): HTMLInputElement | undefined => {
    const inputs = element.getElementsByTagName('input');
    for (const input of inputs) {
      if (!input.disabled) {
        return input;
      }
    }
  };

  const findActiveButton = (element: HTMLElement): HTMLButtonElement | undefined => {
    const buttons = element.getElementsByTagName('button');
    for (const button of buttons) {
      if (!button.disabled) {
        return button;
      }
    }
  };

  const findFirstFocus = (element: HTMLElement) => {
    if (element.hasChildNodes()) {
      const elementToFocus = findActiveInput(element) || findActiveButton(element);
      if (elementToFocus) {
        try {
          elementToFocus.focus({
            preventScroll: true,
          });
        } catch {
          console.error('Unable to set focus on any element');
        }
      }
    }
  };

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
    findFirstFocus,
  };
};
