<template>
  <div class="mx-auto my-2 flex items-center justify-center lg:w-1/2">
    <div class="flex flex-col">
      <div
        for="quickfilter"
        class="text-center text-md dark:text-white"
        label>
        Quick Filters
      </div>
      <ui-toggle-button
        type="pill"
        use-lowercase
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
defineOptions({
  name: 'TodoQuickFilter',
});
</script>
