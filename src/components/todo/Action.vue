<template>
  <div class="mx-auto flex items-center justify-between lg:w-1/2">
    <div class="flex flex-col">
      <div
        for="groupbyid"
        class="text-md dark:text-white"
        data-test-id="group-by-label"
        label>
        {{ groupByLabel }}
      </div>
      <ui-toggle-button
        v-model.lazy="groupBy"
        :options="GROUP_BY_OPTIONS" />
    </div>
    <div class="flex flex-col">
      <div
        for="filterid"
        class="text-md dark:text-white"
        data-test-id="filter-by-label"
        label>
        {{ filterByLabel }}
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
import { computed } from 'vue';

const {
  filterBy,
  groupBy,
} = useTodo();

const groupByLabel = computed(() => 'Grouped By: ' + (groupBy.value === 'month' ? 'Month' : 'Day'));
const filterByLabel = computed(() => 'Completed: ' + (filterBy.value === 'show' ? 'Shown' : 'Hidden'));

defineOptions({
  name: 'TodoAction',
});
</script>
