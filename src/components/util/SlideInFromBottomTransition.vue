<template>
  <transition
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    enter-active-class="transform transition-all duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
    leave-active-class="transform transition-all duration-200 ease-out">
    <slot />
  </transition>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UtilSlideInFromBottomTransition',
});
</script>
