import { watch } from 'vue';
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';
import { useSearch } from './useSearch';

export const useSearchWatcher = () => {
  const filterStore = useFilterStore();
  const searchStore = useSearchStore();

  const {
    searchValue,
    showAllForQuickFilter,
  } = useSearch();

  watch(searchValue, (text) => {
    const searchString = text?.toLowerCase();
    searchStore.setDelayedSearchText(searchString);
    if (searchString) {
      if (showAllForQuickFilter(searchString)) {
        filterStore.setDelayedFilterBy('show');
      }
      searchStore.setSearchState(true);
    }
  });
};
