import { watch } from 'vue';
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';
import { useSearch } from './useSearch';

export const useSearchWatcher = () => {
  const filterStore = useFilterStore();
  const searchStore = useSearchStore();

  const { searchValue } = useSearch();

  watch(searchValue, (text) => {
    searchStore.setDelayedSearchText(text);
    if (text) {
      const searchString = text.toLowerCase();
      if (['late', 'on time'].includes(searchString)) {
        filterStore.setDelayedFilterBy('show');
      }
      searchStore.setSearchState(true);
    }
  });
};
