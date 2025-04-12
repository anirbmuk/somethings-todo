<template>
  <div
    role="group"
    :aria-labelledby="id">
    <template
      v-for="option of options"
      :key="option.value">
      <button
        type="button"
        class="border border-gray-300 bg-white py-1 outline-gray-400 transition-all duration-200 ease-in-out dark:border-white dark:bg-base dark:text-white"
        :class="{
          'min-w-14 p-3': type === 'default',
          'mr-1 h-8 min-w-20 rounded-full px-2 py-0.5 text-md md:min-w-24': type === 'pill',
          '!border-primary !bg-primary text-white dark:!border-white dark:!bg-white dark:!text-base dark:!outline-white': modelValue === option.Value
        }"
        :disabled="disabled"
        :aria-pressed="modelValue === option.Value"
        :data-test-id="`toggle-option-${option.Value}`"
        @click="updateValue(option.Value)">
        {{ option.Key }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { KeyValue } from '@/types/key-value';

const props = defineProps({
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

const emit = defineEmits<{
  (e: 'update:model-value', value: string | boolean): void
}>();

const updateValue = (value: string | boolean) => {
  if (props.disabled) {
    return;
  }
  emit('update:model-value', value);
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  });
};

defineOptions({
  name: 'ToggleButton',
});
</script>
