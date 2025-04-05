<template>
  <div
    class="rounded border p-2 md:p-4 dark:border-white dark:bg-transparent"
    :class="panelBackgroundClasses"
    :title="`${value > 0 ? value : 'None'} ${label}`">
    <div class="flex items-start justify-between gap-2">
      <div
        class="text-xl uppercase dark:text-white"
        :data-test-id="`status-${dataTestId}-label`"
        :class="panelTextClasses">{{ label }}</div>
      <div
        class="text-16xl md:text-massive dark:text-white"
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
  'text-green-600': props.type === 'complete',
  'text-red-600': props.type === 'incomplete' || props.type === 'past',
  'text-blue-600': props.type === 'ontime',
  'text-orange-600': props.type === 'late',
}));

const dataTestId = computed(() => props.label.replaceAll(' ', '-'));

defineOptions({
  name: 'UiStatusPanel',
});
</script>
