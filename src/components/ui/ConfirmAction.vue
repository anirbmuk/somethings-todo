<template>
  <div
    v-if="title"
    class="flex h-20 flex-col items-start justify-start dark:text-white">
    <div class="my-2 flex items-center justify-between px-2 text-3xl md:px-4">
      {{ title }}
    </div>
    <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
  </div>
  <div class="max-h-[80dvh] overflow-auto p-4 max-md:p-2 dark:text-white">
    {{ message }}
  </div>
  <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
  <div class="mb-2 mt-4 flex items-center justify-end">
    <button
      type="button"
      class="min-w-24 cursor-pointer rounded-sm border-none bg-primary px-5 py-2.5 text-center text-white shadow-lg outline-primary duration-200 ease-in-out md:hover:bg-primary"
      @click="$emit('confirm', true)">
      YES
    </button>
    <button
      type="reset"
      @click="$emit('confirm', false)">
      NO
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to delete this record?',
  },
});

defineEmits<{
  (e: 'confirm', value: boolean): void
}>();

defineOptions({
  name: 'UiConfirmAction',
});

</script>
