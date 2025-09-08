<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transform transition-opacity duration-200 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transform transition-opacity duration-200 ease-in-out">
    <slot />
  </transition>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UtilFadeInTransition',
});
</script>
