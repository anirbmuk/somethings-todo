<template>
  <teleport to="#backdrop">
    <lazy-util-fade-in-transition>
      <div
        v-show="modalState"
        class="fixed inset-0 z-100 bg-black/75"
        @click="close">
        <lazy-util-slide-in-from-bottom-transition>
          <div
            v-show="modalState"
            class="z-20"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description">
            <div
              class="m-auto max-md:h-dvh max-md:w-dvw md:mt-[65px] md:translate-y-[5%] md:rounded"
              :class="{ 'sm:w-1/2 lg:w-1/3': type === 'default',
                        'md:w-1/2': type === 'wide',
                        'md:max-w-[450px]': type === 'narrow',
                        'rounded-t max-md:translate-y-1/5': !fullHeightInMobile,
                        'p-0': transparent,
                        'bg-white p-2 dark:border dark:border-white dark:bg-base': !transparent,
              }"
              @click.stop="() => {}">
              <div
                ref="modalContent"
                class="flex h-full flex-col md:max-h-[700px] 5xl:max-h-dvh"
                @keyup.esc="closeModal">
                <slot />
              </div>
            </div>
          </div>
        </lazy-util-slide-in-from-bottom-transition>
      </div>
    </lazy-util-fade-in-transition>
  </teleport>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  nextTick,
  useTemplateRef,
  watch,
  type PropType,
} from 'vue';
import { useModal } from '@/composables/useModal';

const LazyUtilFadeInTransition = defineAsyncComponent(() => import('@/components/util/FadeInTransition.vue'));
const LazyUtilSlideInFromBottomTransition = defineAsyncComponent(() => import('@/components/util/SlideInFromBottomTransition.vue'));

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  autoClose: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'wide' | 'narrow' | 'default'>,
    default: 'default',
  },
  fullHeightInMobile: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});

const EMIT_CLOSE_MODAL = 'close-modal';

const emit = defineEmits(['close-modal']);

const modalContent = useTemplateRef<HTMLDivElement>('modalContent');

const {
  modalState,
  closeModal,
  findFirstFocus,
} = useModal(props.name);

const close = () => {
  if (props.autoClose) {
    closeModal();
    emit(EMIT_CLOSE_MODAL);
  }
};

watch(modalState, (newState) => {
  if (newState) {
    nextTick(() => {
      if (modalContent.value) {
        findFirstFocus(modalContent.value);
      }
    });
  }
});

defineOptions({
  name: 'UiModal',
});
</script>
