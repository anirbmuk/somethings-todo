<template>
  <div class="mx-auto my-4 lg:w-1/2">
    <h1 class="uppercase md:text-4xl font-semibold text-primary dark:text-white -mt-2 text-center">DASHBOARD</h1>
    <hr>
    <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-2 my-2 md:my-4">
      <lazy-ui-status-panel
        label="completed"
        type="complete"
        :value="getCompletedTodoCount(todos)"
        class="2xl:col-span-2" />
      <lazy-ui-status-panel
        label="pending"
        type="incomplete"
        :value="getInCompleteTodoCount(todos)" />
      <lazy-ui-status-panel
        label="past due"
        type="past"
        :value="getPastDueTodoCount(todos)"
        class="2xl:col-span-3" />
      <lazy-ui-status-panel
        label="late"
        type="late"
        :value="getLateTodoCount(todos)" />
      <lazy-ui-status-panel
        label="on time"
        type="ontime"
        :value="getOnTimeTodoCount(todos)"
        class="md:col-span-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useTodo } from '@/composables/useTodo';
import {
  getCompletedTodoCount,
  getInCompleteTodoCount,
  getOnTimeTodoCount,
  getLateTodoCount,
  getPastDueTodoCount,
} from '@/helpers/todo';

const LazyUiStatusPanel = defineAsyncComponent(() => import('@/components/ui/StatusPanel.vue'));

const { hydratedTodos: todos } = useTodo();

defineOptions({
  name: 'DashboardView',
});
</script>
