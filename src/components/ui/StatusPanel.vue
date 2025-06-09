<template>
  <div
    class="rounded border p-2 font-semibold md:p-4 dark:border-white dark:bg-transparent"
    :class="panelBackgroundClasses"
    :title="`${value > 0 ? value : 'None'} ${label}`">
    <div class="relative">
      <div
        class="absolute left-0 top-0 text-xl uppercase dark:text-white"
        :data-test-id="`status-${dataTestId}-label`"
        :class="panelTextClasses">{{ label }}</div>
      <div
        class="flex justify-end text-16xl md:text-18xl dark:text-white"
        :data-test-id="`status-${dataTestId}-count`"
        :class="panelTextClasses">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  type PropType,
} from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'complete' | 'incomplete' | 'ontime' | 'late' | 'past'>,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const panelBackgroundClasses = computed(() => ({
  'bg-green-50 border-green-100': props.type === 'complete',
  'bg-red-50 border-red-100': props.type === 'incomplete' || props.type === 'past',
  'bg-blue-50 border-blue-100': props.type === 'ontime',
  'bg-orange-50 border-orange-100': props.type === 'late',
}));

const panelTextClasses = computed(() => ({
  'text-green-700': props.type === 'complete',
  'text-red-700': props.type === 'incomplete' || props.type === 'past',
  'text-blue-700': props.type === 'ontime',
  'text-orange-700': props.type === 'late',
}));

const dataTestId = computed(() => props.label.split(' ').join('-').toLowerCase());

defineOptions({
  name: 'UiStatusPanel',
});
</script>
