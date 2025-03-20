<template>
  <primary-header :reduced="reduced" />
  <main class="mx-auto mb-4 mt-2 p-1 sm:p-2">
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
import PrimaryHeader from '@/components/PrimaryHeader.vue';
import { ROUTES_WITH_TOOLBAR } from './constants/route';

const route = useRoute();
const reduced = computed(() => !ROUTES_WITH_TOOLBAR.includes(route.name));

defineOptions({
  name: 'AppRoot',
});
</script>
