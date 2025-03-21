<template>
  <div class="flex h-16 items-center justify-between px-3 md:px-4 bg-primary dark:bg-base sticky inset-0 z-20">
    <div
      class="text-white md:text-2xl"
      router-link="/">
      <router-link to="/">Things TODO</router-link></div>
    <div class="flex gap-2 md:gap-4 items-center justify-between">
      <div
        v-if="!reduced && searchStore.todoSearchState.search"
        class="flex flex-row">
        <input
          ref="searchTextField"
          name="searchTextField"
          type="text"
          placeholder="Search TODOs"
          class="w-36 border-none bg-indigo-100 py-2 text-sm text-black-dark caret-indigo !outline-none md:w-48 md:text-md lg:w-60 xl:w-72 mr-1"
          v-model.trim="searchValue" />
        <button
          v-if="!reduced"
          type="button"
          class="-ml-8 z-10"
          title="Cancel search"
          @click="searchStore.toggleSearchState">
          <icon-close class="size-6" />
        </button>
      </div>
      <button
        v-else-if="!reduced"
        type="button"
        title="Search TODOs"
        @click="toggleSearchState">
        <icon-search class="size-6 text-white" />
      </button>
      <button
        v-if="!reduced"
        type="button"
        title="Create a TODO"
        @click="showCreateModal">
        <icon-add class="size-6 text-white" />
      </button>
      <button
        v-if="route.name === 'todo'"
        type="button"
        title="View dashboard"
        @click="router.push('/dashboard')">
        <icon-dashboard class="size-6 text-white" />
      </button>
      <button
        v-else-if="route.name === 'dashboard'"
        type="button"
        title="View Todos"
        @click="router.push('/')">
        <icon-task class="size-6 text-white" />
      </button>
      <button
        type="button"
        title="Help topics"
        @click="showHelpModal">
        <icon-help class="size-6 text-white" />
      </button>
    </div>
    <lazy-ui-modal
      :name="HELP_TOPICS_MODAL_NAME"
      type="wide"
      :full-height-in-mobile="false">
      <lazy-ui-help-content @close-help="closeHelpModal" />
    </lazy-ui-modal>
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  ref,
  watch,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import IconAdd from '@/assets/icons/create.svg';
import IconSearch from '@/assets/icons/search.svg';
import IconClose from '@/assets/icons/close.svg';
import IconHelp from '@/assets/icons/help.svg';
import IconTask from '@/assets/icons/task.svg';
import IconDashboard from '@/assets/icons/dashboard.svg';
import { useSearchStore } from '@/stores/search';
import { useSearch } from '@/composables/useSearch';
import { useTodo } from '@/composables/useTodo';
import { useHelp } from '@/composables/useHelp';

const LazyUiModal = defineAsyncComponent(() => import('@/components/ui/Modal.vue'));
const LazyUiHelpContent = defineAsyncComponent(() => import('@/components/ui/HelpContent.vue'));

const route = useRoute();
const router = useRouter();

defineProps({
  reduced: {
    type: Boolean,
    default: false,
  },
});

const searchTextField = ref<HTMLInputElement | null>(null);

const searchStore = useSearchStore();
const {
  HELP_TOPICS_MODAL_NAME,
  showHelpModal,
  closeHelpModal,
} = useHelp();
const {
  searchValue,
  toggleSearchState,
} = useSearch();
const { showCreateModal } = useTodo();

watch(() => searchStore.todoSearchState.search, (state) => {
  if (state) {
    setTimeout(() => searchTextField.value?.focus(), 0);
  }
});

defineEmits(['create']);

defineOptions({
  name: 'PrimaryHeader',
});
</script>
