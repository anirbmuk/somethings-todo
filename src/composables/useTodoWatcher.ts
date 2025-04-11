import { watch } from 'vue';
import { useTodo } from './useTodo';
import { useFilterStore } from '@/stores/filter';
import { useGroupStore } from '@/stores/group';

export const useTodoWatcher = () => {
  const filterStore = useFilterStore();
  const groupStore = useGroupStore();

  const {
    groupBy,
    filterBy,
  } = useTodo();

  watch([groupBy, filterBy], ([group, filter]) => {
    groupStore.setGroupBy(group);
    filterStore.setFilterBy(filter);
  });

  watch(() => filterStore.filterBy, (filterByValue) => filterBy.value = filterByValue);
};
