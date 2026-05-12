<template>
  <util-fade-in-transition>
    <template
      v-for="(notification, index) of notifications"
      :key="notification.id">
      <ui-notification
        :notification="notification"
        :style="{ top: `${(index + 1) * 5}px` }"/>
    </template>
  </util-fade-in-transition>
</template>

<script setup lang="ts">
import UiNotification from '@/components/ui/Notification.vue';
import UtilFadeInTransition from '@/components/util/FadeInTransition.vue';
import { useNotification } from '@/composables/useNotification';

const { notifications } = useNotification();
defineOptions({
  name: 'UiNotifications',
});
</script>
