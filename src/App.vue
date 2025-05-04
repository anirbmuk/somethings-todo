<template>
  <primary-header :reduced="reduced" />
  <main class="mx-auto mb-4 px-1 pb-1 sm:px-2 sm:pb-2">
    <suspense>
      <router-view />
    </suspense>
  </main>
  <div id="backdrop" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  RouterView,
  useRoute,
} from 'vue-router';
import useThemeWatcher from '@/composables/useThemeWatcher';
import PrimaryHeader from '@/components/PrimaryHeader.vue';
import { ROUTES_WITH_TOOLBAR } from './constants/route';

useThemeWatcher();
const route = useRoute();
const reduced = computed(() => !ROUTES_WITH_TOOLBAR.includes(route.name));

defineOptions({
  name: 'AppRoot',
});
</script>
