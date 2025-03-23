<template>
  <div class="mx-auto my-4 lg:w-1/2">
    <template v-if="todos.length">
      <div
        class="text-gray-700 dark:text-white flex h-3 items-center justify-center text-md"
        data-test-id="totalpending"
        :class="{ show: totalPending }">
        {{ getTodoCountText(totalPending, true) }}
      </div>
      <template
        v-for="group of todos"
        :key="group.datedivider">
        <fieldset class="border-t border-gray-400 text-2xl">
          <legend class="-mb-3 flex items-center justify-center py-3 pl-1 pr-2.5">
            <span class="text-shadow dark:text-white">{{ transformDateDivider(group.datedivider) }}</span><span
              v-if="group.pending"
              class="todo-group-count pl-2 text-sm dark:text-white"
              data-test-id="grouppending">
              {{ getTodoCountText(group.pending) }}</span>
          </legend>
          <div role="list">
            <todo-content
              v-for="todo of group.todos"
              :key="todo.todoid"
              :todo="todo"
              @edit-todo="$emit('edit-todo', $event)"
              @toggle-todo="$emit('toggle-todo', $event)"
              @share-todo="$emit('share-todo', $event)"
              @delete-todo="$emit('delete-todo', $event)" />
          </div>
        </fieldset>
      </template>
    </template>
    <template v-else>
      <div
        class="text-red-600"
        data-test-id="nodata">
        No TODOs found
      </div>
      <p
        v-if="!allTodosShown"
        class="text-md text-red-600">
        There may be completed TODOs which are not shown
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import TodoContent from '@/components/todo/Content.vue';
import { getTodoCountText } from '@/helpers/todo';
import type {
  GroupedTodo,
  ITodo,
} from '@/types/todo';
import { transformDateDivider } from '@/helpers/date';

defineProps({
  todos: {
    type: Array as PropType<GroupedTodo[]>,
    default: () => [],
  },
  totalPending: {
    type: Number,
    default: 0,
  },
  allTodosShown: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{
  (e: 'edit-todo', value: ITodo['todoid']): void,
  (e: 'toggle-todo', value: ITodo['todoid']): void,
  (e: 'share-todo', value: ITodo['todoid']): void,
  (e: 'delete-todo', value: ITodo['todoid']): void,
}>();

defineOptions({
  name: 'TodoList',
});
</script>
