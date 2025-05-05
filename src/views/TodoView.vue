<template>
  <div>
    <div class="sticky top-16 z-20 bg-white pt-3 dark:bg-base">
      <todo-action />
      <hr>
    </div>
    <todo-search />
    <todo-quick-filter />
    <todo-list
      :todos="groupedTodos.groupedTodos"
      :total-pending="groupedTodos.pending"
      :all-todos-shown="allTodosShown"
      @edit-todo="showUpdateModal($event)"
      @toggle-todo="toggleTodo($event)"
      @share-todo="shareTodo($event)"
      @delete-todo="showDeleteConfirmModal($event)" />
    <lazy-ui-modal
      :name="CONFIRM_MODAL_NAME"
      type="narrow"
      :full-height-in-mobile="false">
      <lazy-ui-confirm-action
        message="Delete this TODO?"
        @confirm="onConfirm($event)" />
    </lazy-ui-modal>
    <lazy-ui-modal
      :name="CREATE_UPDATE_MODAL_NAME"
      :full-height-in-mobile="false">
      <lazy-ui-create-or-update-action
        :todo="todoToBeEdited"
        @cancel-todo="closeCreateOrUpdateModal"
        @create-todo="saveTodo('create', $event)"
        @edit-todo="saveTodo('edit', $event)" />
    </lazy-ui-modal>
    <lazy-ui-back-to-top
      v-show="showBackToTopButton"
      @scroll-to-top="scrollToTop" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
} from 'vue';
import TodoAction from '@/components/todo/Action.vue';
import TodoQuickFilter from '@/components/todo/QuickFilter.vue';
import TodoSearch from '@/components/todo/Search.vue';
import TodoList from '@/components/todo/List.vue';
import { useTodo } from '@/composables/useTodo';
import { useTodoWatcher } from '@/composables/useTodoWatcher';
import { useModal } from '@/composables/useModal';
import { useScroll } from '@/composables/useScroll.ts';
import type {
  AddTodo,
  ITodo,
  UpdateTodo,
} from '@/types/todo';

const LazyUiModal = defineAsyncComponent(() => import('@/components/ui/Modal.vue'));
const LazyUiCreateOrUpdateAction = defineAsyncComponent(() => import('@/components/ui/CreateOrUpdateAction.vue'));
const LazyUiConfirmAction = defineAsyncComponent(() => import('@/components/ui/ConfirmAction.vue'));
const LazyUiBackToTop = defineAsyncComponent(() => import('@/components/ui/BackToTop.vue'));

const CONFIRM_MODAL_NAME = 'delete-todo-confirm-modal';

const {
  scrollToTop,
  showBackToTopButton,
} = useScroll();

const {
  groupedTodos,
  todoToBeEdited,
  showUpdateModal,
  toggleTodo,
  addTodo,
  updateTodo,
  shareTodo,
  deleteTodo,
  CREATE_UPDATE_MODAL_NAME,
  closeCreateOrUpdateModal,
  filterByState,
} = useTodo();

useTodoWatcher();

let idOfTodoToBeDeleted: ITodo['todoid'] | undefined;

const {
  showModal: showConfirmModal,
  closeModal: closeConfirmModal,
} = useModal(CONFIRM_MODAL_NAME);

const showDeleteConfirmModal = (todoid: ITodo['todoid']) => {
  if (!todoid) {
    return;
  }
  idOfTodoToBeDeleted = todoid;
  showConfirmModal();
};

const onConfirm = (decision: boolean) => {
  closeConfirmModal();
  if (decision && idOfTodoToBeDeleted) {
    deleteTodo(idOfTodoToBeDeleted);
  }
  idOfTodoToBeDeleted = undefined;
};

const saveTodo = (mode: 'create' | 'edit', todo: AddTodo | UpdateTodo) => {
  closeCreateOrUpdateModal();
  if (mode === 'create') {
    addTodo(todo);
  } else if (mode === 'edit' && todoToBeEdited.value) {
    updateTodo({
      todoid: todoToBeEdited.value.todoid,
      todo: {
        ...todo,
        status: todoToBeEdited.value.status,
      } satisfies UpdateTodo,
    });
  }
};

const allTodosShown = computed(() => filterByState.value === 'show');

defineOptions({
  name: 'TodoView',
});
</script>
