<template>
  <button
    type="button"
    class="fixed bottom-2 right-2 z-10 cursor-pointer rounded-full border border-base bg-white p-2.5 hover:opacity-100 md:bottom-6 md:right-6 md:opacity-80 md:hover:bg-gray-50 dark:border-white dark:bg-base dark:md:hover:bg-transparent"
    aria-label="Click to scroll to the top of the page"
    @click="$emit('scrollToTop')">
    <div
      class="flex items-center text-3xl text-base dark:text-white"
      translate="no">
      <lazy-icon-up-arrow
        class="size-6"
        aria-hidden="true" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const LazyIconUpArrow = defineAsyncComponent(() => import('@/assets/icons/up-arrow.svg'));

defineEmits<{
  scrollToTop: [],
}>();

defineOptions({
  name: 'UiBackToTop',
});
</script>
