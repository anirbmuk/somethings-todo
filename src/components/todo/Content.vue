<template>
  <div
    class="m-2 flex cursor-pointer flex-col justify-stretch rounded border-2 bg-gray-50/75 p-2 md:mx-6 md:px-4 dark:border-white dark:bg-transparent"
    :class="{
      'border-error': todo.additional?.state === 'error',
      'border-warning': todo.additional?.state === 'warn',
      'border-info': todo.additional?.state === 'info',
      'border-green-600': todo.additional?.state === 'moderate',
      'border-green-800': todo.additional?.state === 'safe',
    }"
    data-test-id="todo-list-item"
    role="listitem">
    <div class="flex w-full">
      <div
        class="flex w-5/6 flex-col space-y-2"
        @click.stop="$emit('edit-todo', todo.todoid)">
        <div
          v-if="todo.additional"
          class="z-10 flex space-x-2">
          <span
            v-if="todo.status !== 'Complete'"
            data-test-id="todo-status"
            class="rounded-sm border border-red-800 bg-red-50 px-2 py-1 text-center text-sm font-normal text-red-800">
            {{ todo.status }}
          </span>
          <span
            class="rounded-sm px-2 py-1 text-center text-sm font-normal"
            :class="{
              'bg-error text-white': todo.additional.state === 'error',
              'bg-warning text-white': todo.additional.state === 'warn',
              'bg-info text-white': todo.additional.state === 'info',
              'bg-green-600 text-white': todo.additional.state === 'moderate',
              'bg-green-800 text-white': todo.additional.state === 'safe',
              'bg-gray-500 text-white': todo.additional.state === 'later',
              'border border-green-800 bg-green-50 text-green-800': todo.additional.state === 'done'
            }"
            todoadditional>{{ todo.additional.message }}</span>
        </div>
        <div
          data-test-id="todo-heading"
          class="pb-2 pt-1 text font-bold uppercase dark:text-white">
          {{ todo.heading }}
        </div>
        <div class="max-h-24 overflow-auto md:overflow-y-auto dark:text-white">
          <div
            data-test-id="todo-text"
            class="whitespace-pre-line break-words py-2 text-justify text-md xl:py-1.5 3xl:py-1">
            {{ todo.text }}
          </div>
        </div>
        <div
          v-if="todo.status === 'Incomplete'"
          data-test-id="todo-due-date"
          class="z-10 pb-1 pt-4 text-sm text-gray-700 dark:text-white">
          Due: {{ getReadableDate(todo.duedate) }}
        </div>
        <div
          v-if="todo.performance && todo.status === 'Complete'"
          class="z-10 pb-1 pt-4 text-sm text-gray-800 dark:text-white"
          :class="{
            'text-red-600': todo.performance.rating === 'late',
            'text-orange-600': todo.performance.rating === 'delayed',
            'text-green-600':
              todo.performance.rating === 'ontime' ||
              todo.performance.rating === 'beforetime'
          }"
          todoperformance>
          {{ todo?.performance?.message }}
        </div>
      </div>
      <div class="z-10 flex w-1/6 flex-col justify-between">
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            :title="todo.status === 'Complete' ? 'Mark as incomplete' : 'Mark as complete'"
            data-test-id="toggle-status"
            @click.stop="$emit('toggle-todo', todo.todoid)">
            <lazy-icon-complete
              v-if="todo.status === 'Incomplete'"
              class="size-6 text-green-700 dark:text-white" />
            <lazy-icon-incomplete
              v-else
              class="size-6 text-error dark:text-white" />
          </button>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            title="Share this TODO"
            @click.stop="$emit('share-todo', todo.todoid)">
            <icon-share class="size-6 text-primary dark:text-white" />
          </button>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            title="Delete this TODO"
            data-test-id="delete-todo"
            @click.stop="$emit('delete-todo', todo.todoid)">
            <icon-delete class="size-6 text-amber-900 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  type PropType,
} from 'vue';
import type { ITodo } from '@/types/todo';
import { getReadableDate } from '@/helpers/date';
import IconShare from '@/assets/icons/share.svg';
import IconDelete from '@/assets/icons/delete.svg';

const LazyIconComplete = defineAsyncComponent(() => import('@/assets/icons/complete.svg'));
const LazyIconIncomplete = defineAsyncComponent(() => import('@/assets/icons/incomplete.svg'));

defineProps({
  todo: {
    type: Object as PropType<ITodo>,
    required: true,
  },
});

defineEmits<{
  (e: 'edit-todo', value: ITodo['todoid']): void,
  (e: 'toggle-todo', value: ITodo['todoid']): void,
  (e: 'share-todo', value: ITodo['todoid']): void,
  (e: 'delete-todo', value: ITodo['todoid']): void,
}>();

defineOptions({
  name: 'TodoContent',
});
</script>
