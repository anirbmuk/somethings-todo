<template>
  <div
    class="absolute -right-3 z-100 mx-4 mb-1 w-full max-w-96 rounded border"
    :class="outerClasses">
    <div class="relative">
      <div
        class="flex items-center justify-between p-4 text-md"
        :class="notificationClasses">
        <span>{{ notification.message }}</span>
        <button
          v-if="notification.cta"
          type="button"
          @click="callbackAndClose"
          class="ml-4 rounded border px-2 py-1 text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
          :class="ctaButtonClasses">
          {{ notification.cta.label }}
        </button>
      </div>
      <div
        v-if="notification.showprogress"
        role="progressbar"
        :aria-busy="!full"
        :aria-valuemin="0"
        :aria-valuemax="100"
        aria-label="Progress bar for closing the toast notification"
        class="absolute bottom-0 right-0 h-1 rounded-sm"
        :class="progressBarClass"
        :style="progressStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type PropType,
} from 'vue';
import { useNotification } from '@/composables/useNotification';
import type { UiNotification } from '@/types/notification';

const props = defineProps({
  notification: {
    type: Object as PropType<UiNotification>,
    required: true,
  },
});

const { hide } = useNotification();
const duration = computed(() => props.notification.duration ?? 0);

// Drives the CSS transition: starts false (0% width), flips to true (100% width) after mount.
const full = ref(false);

const progressStyle = computed(() => ({
  width: full.value ? '0%' : '100%',
  transition: full.value ? `width ${duration.value}s linear` : 'none',
}));

const callbackAndClose = () => {
  if (props.notification.cta?.callback) {
    props.notification.cta.callback();
  }
  hide(props.notification.id);
};

let timeout: ReturnType<typeof setTimeout> | null = null;
let rafId: number | null = null;

onMounted(() => {
  timeout = setTimeout(() => hide(props.notification.id), duration.value * 1000);

  // Two rAFs: first ensures Vue has rendered the 100% state, second triggers the transition.
  rafId = requestAnimationFrame(() => {
    rafId = requestAnimationFrame(() => {
      full.value = true;
    });
  });
});

onBeforeUnmount(() => {
  if (props.notification.callbackOnClose) {
    props.notification.callbackOnClose();
  }
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});

const outerClasses = computed(() => ({
  'border-green-300 dark:border-green-700': props.notification.type === 'success',
  'border-red-300 dark:border-red-700': props.notification.type === 'failure',
  'border-blue-300 dark:border-blue-700': props.notification.type === 'info',
}));

const notificationClasses = computed(() => ({
  'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300': props.notification.type === 'success',
  'text-red-700 bg-red-50 dark:bg-red-950 dark:text-red-300': props.notification.type === 'failure',
  'text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300': props.notification.type === 'info',
}));

const ctaButtonClasses = computed(() => ({
  'border-success text-success hover:bg-success/10 focus:ring-success dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400/10': props.notification.type === 'success',
  'border-error text-error hover:bg-error/10 focus:ring-error dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400/10': props.notification.type === 'failure',
  'border-info text-info hover:bg-info/10 focus:ring-info dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10': props.notification.type === 'info',
}));

const progressBarClass = computed(() => ({
  'bg-success': props.notification.type === 'success',
  'bg-error': props.notification.type === 'failure',
  'bg-info': props.notification.type === 'info',
}));

defineOptions({
  name: 'UiNotification',
});
</script>
