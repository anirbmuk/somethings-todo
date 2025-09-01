<template>
  <div
    class="mx-auto my-2 flex items-center justify-center lg:w-1/2"
    data-test-id="quick-filters">
    <div class="flex flex-col">
      <div
        class="text-center text-md dark:text-white"
        data-test-id="quick-filters-label"
        label>
        {{ LABEL }}
      </div>
      <ui-toggle-button
        type="pill"
        use-lowercase
        class="flex flex-wrap items-center justify-evenly gap-1.5"
        v-model.lazy="searchValue"
        :options="QUICK_FILTER_OPTIONS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiToggleButton from '@/components/ui/ToggleButton.vue';
import { useSearch } from '@/composables/useSearch';
import { QUICK_FILTER_OPTIONS } from '@/constants/todo';

const { searchValue } = useSearch();

const LABEL = 'Quick Filters' as const;
defineOptions({
  name: 'TodoQuickFilter',
});
</script>
