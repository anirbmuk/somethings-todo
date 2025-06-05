<template>
  <div class="sticky inset-0 z-20 flex h-16 items-center justify-between bg-primary px-3 md:px-4 dark:border-b dark:border-b-white dark:bg-base">
    <h1
      class="text-xl text-white md:text-2xl"
      router-link="/">
      <router-link
        to="/"
        data-test-id="title-link">
        Things TODO
      </router-link>
    </h1>
    <div class="flex items-center justify-between gap-2 md:gap-4">
      <button
        v-if="!reduced"
        type="button"
        title="Create a TODO"
        aria-haspopup="dialog"
        data-test-id="add-todo-btn"
        @click="showCreateModal">
        <icon-add
          class="size-6 text-white"
          aria-hidden="true" />
      </button>
      <button
        v-if="route.name === 'todo'"
        type="button"
        title="Analyse TODOs"
        data-test-id="analyse-todo-btn"
        @click="router.push('/dashboard')">
        <lazy-icon-dashboard
          class="size-6 text-white"
          aria-hidden="true" />
      </button>
      <button
        v-else-if="route.name === 'dashboard' || route.name === 'import'"
        type="button"
        title="View TODOs"
        data-test-id="view-todo-btn"
        @click="router.push('/')">
        <icon-task
          class="size-6 text-white"
          aria-hidden="true" />
      </button>
      <button
        type="button"
        title="Help with TODOs"
        aria-haspopup="dialog"
        data-test-id="help-todo-btn"
        @click="showHelpModal">
        <icon-help
          class="size-6 text-white"
          aria-hidden="true" />
      </button>
      <button
        type="button"
        :title="isDarkTheme ? 'Turn on light mode' : 'Turn on dark mode'"
        data-test-id="theme-todo-btn"
        @click="toggleTheme">
        <icon-dark
          v-if="!isDarkTheme"
          class="size-6 text-white"
          aria-hidden="true" />
        <icon-light
          v-else
          class="size-6 text-white"
          aria-hidden="true" />
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
import { defineAsyncComponent } from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { useTodo } from '@/composables/useTodo';
import { useHelp } from '@/composables/useHelp';
import IconAdd from '@/assets/icons/create.svg';
import IconHelp from '@/assets/icons/help.svg';
import IconTask from '@/assets/icons/task.svg';
import IconLight from '@/assets/icons/light.svg';
import IconDark from '@/assets/icons/dark.svg';

const LazyUiModal = defineAsyncComponent(() => import('@/components/ui/Modal.vue'));
const LazyUiHelpContent = defineAsyncComponent(() => import('@/components/ui/HelpContent.vue'));
const LazyIconDashboard = defineAsyncComponent(() => import('@/assets/icons/dashboard.svg'));

const route = useRoute();
const router = useRouter();

const {
  toggleTheme,
  isDarkTheme,
} = useTheme();

defineProps({
  reduced: {
    type: Boolean,
    default: false,
  },
});

const {
  HELP_TOPICS_MODAL_NAME,
  showHelpModal,
  closeHelpModal,
} = useHelp();

const { showCreateModal } = useTodo();

defineEmits(['create']);

defineOptions({
  name: 'PrimaryHeader',
});
</script>
