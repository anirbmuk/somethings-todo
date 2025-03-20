<template>
  <div
    class="border-2 bg-gray-50/75 mx-2 my-2 cursor-pointer rounded px-2 py-2 md:mx-6 md:px-4 dark:border-white dark:bg-transparent flex flex-col justify-stretch"
    :class="{
      'border-error': todo.additional?.state === 'error',
      'border-warning': todo.additional?.state === 'warn',
      'border-info': todo.additional?.state === 'info',
      'border-green-600': todo.additional?.state === 'moderate',
      'border-green-800': todo.additional?.state === 'safe',
    }"
    role="listitem">
    <div class="w-full flex">
      <div
        class="w-5/6 flex flex-col space-y-2"
        @click.stop="$emit('edit-todo', todo.todoid)">
        <div
          v-if="todo.additional"
          class="z-10">
          <span
            class="rounded-sm px-2 py-1 text-center text-sm font-normal"
            :class="{
              'bg-error text-white': todo.additional.state === 'error',
              'bg-warning text-white': todo.additional.state === 'warn',
              'bg-info text-white': todo.additional.state === 'info',
              'bg-green-600 text-white': todo.additional.state === 'moderate',
              'bg-green-800 text-white': todo.additional.state === 'safe',
              'bg-gray-500 text-white': todo.additional.state === 'later',
              'bg-green-50 border border-green-800 text-green-800': todo.additional.state === 'done'
            }"
            todoadditional>{{ todo.additional.message }}</span>
        </div>
        <div
          class="pb-2 pt-1 text font-bold uppercase dark:text-white"
          todoheading>
          {{ todo.heading }}
        </div>
        <div class="max-h-24 overflow-auto md:overflow-y-auto dark:text-white">
          <div
            class="whitespace-pre-line break-words py-2 text-justify text-md xl:py-1.5 3xl:py-1"
            todotext>
            {{ todo.text }}
          </div>
        </div>
        <div
          v-if="todo.status === 'Incomplete'"
          class="todo-duedate z-10 pb-1 pt-4 text-sm dark:text-white"
          todostatus>
          Due: {{ getReadableDate(todo.duedate) }}
        </div>
        <div
          v-if="todo.performance && todo.status === 'Complete'"
          class="todo-duedate z-10 pb-1 pt-4 text-sm dark:text-white"
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
      <div class="w-1/6 flex flex-col justify-between z-10">
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            :title="todo.status === 'Complete' ? 'Mark as incomplete' : 'Mark as complete'"
            @click.stop="$emit('toggle-todo', todo.todoid)">
            <lazy-icon-complete
              v-if="todo.status === 'Incomplete'"
              class="text-green-700 dark:text-white size-6" />
            <lazy-icon-incomplete
              v-else
              class="text-error dark:text-white size-6" />
          </button>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            title="Share this TODO"
            @click.stop="$emit('share-todo', todo.todoid)">
            <icon-share class="text-primary dark:text-white size-6" />
          </button>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="size-auto"
            title="Delete this TODO"
            @click.stop="$emit('delete-todo', todo.todoid)">
            <icon-delete class="text-amber-900 dark:text-white size-6" />
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
