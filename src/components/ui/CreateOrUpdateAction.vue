<template>
  <div>
    <div class="flex h-20 flex-col items-start justify-start dark:text-white">
      <div class="my-2 flex items-center justify-between px-2 text-3xl md:px-3">
        {{ mode === 'create' ? 'Create TODO' : 'Edit TODO' }}
      </div>
      <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
    </div>
    <form
      id="createOrUpdateActionForm"
      class="px-2 pb-4 md:px-3"
      @submit.prevent="onSaveTodo">
      <div class="grid gap-4">
        <div class="grid gap-1">
          <label
            for="todoheading"
            required="true"
            :aria-disabled="!editable">
            Heading
          </label>
          <input
            id="todoheading"
            type="text"
            required
            :disabled="!editable"
            v-model.trim="heading">
        </div>
        <div class="grid gap-1">
          <label
            for="todotext"
            :aria-disabled="!editable">
            Text
          </label>
          <textarea
            id="todotext"
            :disabled="!editable"
            v-model.trim="text"
            rows="4" />
        </div>
        <div class="grid gap-1">
          <label
            for="tododuedate"
            required="true"
            :aria-disabled="!editable">
            Due on
          </label>
          <input
            id="tododuedate"
            type="datetime-local"
            :min="getMinDate()"
            :disabled="!editable"
            required
            v-model="duedate">
        </div>
      </div>
    </form>
    <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
    <div class="mb-2 mt-4 flex items-center justify-end">
      <button
        type="submit"
        class="min-w-24 cursor-pointer rounded-sm border-none bg-primary px-5 py-2.5 text-center text-white shadow-lg outline-primary md:hover:bg-primary"
        form="createOrUpdateActionForm"
        :disabled="!editable">
        SAVE
      </button>
      <button
        type="reset"
        @click="$emit('cancel-todo')">
        CANCEL
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentFormDateTime,
  getStorageDate,
  getMinDate,
} from '@/helpers/date';
import type {
  AddTodo,
  UpdateTodo,
} from '@/types/todo';
import {
  computed,
  ref,
  type PropType,
} from 'vue';

const props = defineProps({
  todo: {
    type: Object as PropType<UpdateTodo | undefined>,
    default: () => {},
  },
});

const emit = defineEmits<{
  (e: 'create-todo', value: AddTodo): void,
  (e: 'edit-todo', value: UpdateTodo): void,
  (e: 'cancel-todo'): void,
}>();

const mode = computed<'create' | 'edit'>(() => Boolean(props.todo) ? 'edit' : 'create');
const editable = computed<boolean>(() => mode.value === 'create' || props.todo?.status === 'Incomplete');

const heading = ref<string | undefined>(props.todo?.heading);
const text = ref<string | undefined>(props.todo?.text);
const duedate = ref<string | undefined>(props.todo?.duedate ? getCurrentFormDateTime(props.todo.duedate) : getCurrentFormDateTime());

const onSaveTodo = () => {
  if (!editable.value) {
    return;
  }
  if (mode.value === 'create') {
    const output = {
      heading: heading.value!,
      text: text.value,
      duedate: getStorageDate(duedate.value),
    } satisfies AddTodo;
    emit('create-todo', output);
  } else {
    const output = {
      ...props.todo!,
      heading: heading.value!,
      text: text.value,
      duedate: getStorageDate(duedate.value),
    } satisfies UpdateTodo;
    emit('edit-todo', output);
  }
};

defineOptions({
  name: 'UiCreateOrUpdateAction',
});
</script>
