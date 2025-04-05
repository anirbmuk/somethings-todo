<template>
  <div
    data-test-id="import-container"
    class="mx-auto my-4 text-center lg:w-1/2">
    <div
      v-if="status === 'success'"
      data-test-id="import-success"
      class="rounded border border-green-800 bg-green-50 p-4 text-green-800 dark:border-white dark:bg-base dark:text-white">
      {{ message }}
    </div>
    <div
      v-if="status === 'failure'"
      data-test-id="import-failure"
      class="rounded border border-red-800 bg-red-50 p-4 text-red-800 dark:border-white dark:bg-base dark:text-white">
      {{ message }}
    </div>
    <div class="relative mx-auto p-4 text-center">
      <router-link
        to="/"
        class="md:navlink relative font-semibold text-primary max-md:underline dark:text-white">
        View your TODOs
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTodo } from '@/composables/useTodo';
import type { ImportStatus } from '@/types/todo';

const route = useRoute();
const { importTodo } = useTodo();
const content = computed(() => route.params.content);
const status = ref<ImportStatus['status'] | ''>('');
const message = ref<ImportStatus['message'] | undefined>('');

onMounted(() => {
  const {
    message: importMessage,
    status: importStatus,
  } = importTodo(String(content.value));
  message.value = importMessage;
  status.value = importStatus;
});

defineOptions({
  name: 'ImportView',
});
</script>
