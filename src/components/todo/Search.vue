<template>
  <div class="mx-auto my-2 flex items-center justify-center lg:w-1/2">
    <div class="relative flex w-9/10 items-center justify-center">
      <label
        for="searchTextField"
        class="sr-only">
        Search TODOs
      </label>
      <input
        ref="searchTextField"
        id="searchTextField"
        type="text"
        role="searchbox"
        placeholder="Search TODOs"
        data-test-id="input-search"
        class="mr-1 w-1/2 py-2 text-base transition-all duration-200 ease-linear focus:w-full md:text-md"
        :class="{ 'w-full': Boolean(searchValue) }"
        v-model.trim="searchValue">
      <util-fade-in-transition>
        <button
          v-show="searchValue"
          type="button"
          class="absolute right-3 z-10"
          title="Cancel search"
          data-test-id="clear-search"
          @click="toggleAndClearSearch">
          <lazy-icon-close
            class="size-6"
            aria-hidden="true" />
        </button>
      </util-fade-in-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  ref,
} from 'vue';

import { useSearch } from '@/composables/useSearch';
import { useSearchWatcher } from '@/composables/useSearchWatcher';
import UtilFadeInTransition from '@/components/util/FadeInTransition.vue';

const LazyIconClose = defineAsyncComponent(() => import('@/assets/icons/close.svg'));

const searchTextField = ref<HTMLInputElement | null>(null);

const {
  searchValue,
  clearSearch,
} = useSearch();
useSearchWatcher();

const toggleAndClearSearch = () => {
  clearSearch();
  setTimeout(() => {
    if (searchTextField.value) {
      searchTextField.value.focus();
      searchTextField.value.setSelectionRange(0, 0);
    }
  }, 10);
};

defineOptions({
  name: 'TodoSearch',
});
</script>
