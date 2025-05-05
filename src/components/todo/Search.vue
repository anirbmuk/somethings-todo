<template>
  <div class="mx-auto my-2 flex items-center justify-center lg:w-1/2">
    <div class="relative flex w-9/10 items-center justify-center">
      <input
        ref="searchTextField"
        name="searchTextField"
        type="text"
        placeholder="Search TODOs"
        data-test-id="input-search"
        class="mr-1 w-1/2 py-2 text-sm text-base transition-all duration-300 md:text-md"
        :class="{ 'w-full': searchFieldInFocus || searchValue }"
        v-model.trim="searchValue"
        @focus="searchFieldInFocus = true"
        @blur="searchFieldInFocus = false">
      <util-fade-in-transition>
        <button
          v-show="searchValue"
          type="button"
          class="absolute right-2 z-10"
          title="Cancel search"
          data-test-id="clear-search"
          @click="toggleAndClearSearch">
          <icon-close class="size-6" />
        </button>
      </util-fade-in-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconClose from '@/assets/icons/close.svg';
import { useSearch } from '@/composables/useSearch';
import { useSearchWatcher } from '@/composables/useSearchWatcher';
import UtilFadeInTransition from '@/components/util/FadeInTransition.vue';

const searchTextField = ref<HTMLInputElement | null>(null);
const searchFieldInFocus = ref<boolean>(false);

const {
  searchValue,
  toggleSearchState,
} = useSearch();
useSearchWatcher();

const toggleAndClearSearch = () => {
  searchValue.value = '';
  toggleSearchState();
  searchFieldInFocus.value = true;
  setTimeout(() => searchTextField.value?.focus(), 0);
};

defineOptions({
  name: 'TodoSearch',
});
</script>
