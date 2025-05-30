<template>
  <div class="mx-auto flex items-center justify-between lg:w-1/2">
    <div class="flex flex-col">
      <div
        for="groupbyid"
        class="text-md dark:text-white"
        label>
        Group By
      </div>
      <ui-toggle-button
        v-model.lazy="groupBy"
        :options="GROUP_BY_OPTIONS" />
    </div>
    <div class="flex flex-col">
      <div
        for="filterid"
        class="text-md dark:text-white"
        label>
        Completed
      </div>
      <ui-toggle-button
        v-model.lazy="filterBy"
        :options="FILTER_OPTIONS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiToggleButton from '@/components/ui/ToggleButton.vue';
import { useTodo } from '@/composables/useTodo';
import {
  GROUP_BY_OPTIONS,
  FILTER_OPTIONS,
} from '@/constants/todo';

const {
  filterBy,
  groupBy,
} = useTodo();

defineOptions({
  name: 'TodoAction',
});
</script>
