<template>
  <teleport to="#backdrop">
    <util-fade-in-transition>
      <div
        v-show="modalState"
        class="fixed inset-0 z-100 bg-black/75"
        @click="close">
        <util-slide-in-from-bottom-transition>
          <div
            v-if="modalState"
            class="z-20"
            role="dialog">
            <div
              class="m-auto max-md:h-dvh max-md:w-dvw md:mt-[65px] md:rounded md:translate-y-[5%]"
              :class="{ 'sm:w-1/2 lg:w-1/3': type === 'default',
                        'md:w-1/2': type === 'wide',
                        'md:max-w-[450px]': type === 'narrow',
                        'max-md:translate-y-1/5 rounded-t': !fullHeightInMobile,
                        'p-0': transparent,
                        'bg-white dark:bg-base dark:border dark:border-white p-2': !transparent,
              }"
              @click.stop="() => {}">
              <div class="flex h-full flex-col md:max-h-[700px] 5xl:max-h-dvh">
                <slot />
              </div>
            </div>
          </div>
        </util-slide-in-from-bottom-transition>
      </div>
    </util-fade-in-transition>
  </teleport>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useModal } from '@/composables/useModal';
import UtilFadeInTransition from '@/components/util/FadeInTransition.vue';
import UtilSlideInFromBottomTransition from '@/components/util/SlideInFromBottomTransition.vue';

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

const {
  modalState,
  closeModal,
} = useModal(props.name);

const close = () => {
  if (props.autoClose) {
    closeModal();
    emit(EMIT_CLOSE_MODAL);
  }
};

defineOptions({
  name: 'UiModal',
});
</script>
