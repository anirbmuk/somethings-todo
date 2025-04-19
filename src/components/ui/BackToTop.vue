<template>
  <button
    type="button"
    class="fixed bottom-2 right-2 z-10 cursor-pointer rounded-full bg-base p-2.5 hover:opacity-100 md:bottom-6 md:right-6 md:opacity-70 dark:border dark:border-white"
    @click="$emit('scrollToTop')">
    <div
      class="flex items-center text-3xl text-white"
      translate="no">
      <lazy-icon-up-arrow class="size-6" />
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
