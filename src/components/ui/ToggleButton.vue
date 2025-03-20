<template>
  <div
    role="group"
    :aria-labelledby="id">
    <template
      v-for="option of options"
      :key="option.value">
      <button
        type="button"
        class="border border-gray-300 dark:border-white bg-white dark:bg-transparent dark:text-white py-1 outline-gray-400 transition-all duration-200 ease-in-out"
        :class="{
          '!bg-primary dark:!bg-white text-white dark:!text-base border-primary': modelValue === option.Value && type === 'default',
          '!bg-primary text-white opacity-85': modelValue === option.Value && type === 'pill',
          'min-w-14 rounded-sm p-3': type === 'default',
          'mr-1 min-w-16 rounded-full px-2 py-1.5 text-md md:min-w-20': type === 'pill'
        }"
        :disabled="disabled"
        :aria-pressed="modelValue === option.Value"
        @click="$emit('update:model-value', option.Value)">
        {{ option.Key }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { KeyValue } from '@/types/key-value';

defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Boolean],
    default: '',
  },
  options: {
    type: Array as PropType<KeyValue<string | boolean>[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'default' | 'pill'>,
    default: 'default',
  },
});
defineEmits<{
  (e: 'update:model-value', value: string | boolean): void
}>();
defineOptions({
  name: 'ToggleButton',
});
</script>
