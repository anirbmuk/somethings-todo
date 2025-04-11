import { watch } from 'vue';
import { useFilterStore } from '@/stores/filter';
import { useSearchStore } from '@/stores/search';
import { useSearch } from './useSearch';

export const useSearchWatcher = () => {
  const filterStore = useFilterStore();
  const searchStore = useSearchStore();

  const { searchValue } = useSearch();

  watch(searchValue, (text) => {
    searchStore.setSearchText(text);
    if (text) {
      searchStore.setSearchState(true);
      if (['late', 'on time'].includes(text.toLowerCase())) {
        filterStore.setFilterBy('show');
      }
    }
  });
};
