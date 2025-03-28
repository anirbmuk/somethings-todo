<template>
  <div class="flex h-20 flex-col items-start justify-start dark:text-white">
    <div class="my-2 flex items-center justify-between px-2 text-3xl md:px-4">
      Help Topics
    </div>
    <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
  </div>
  <div class="max-h-[calc(60dvh-50px)] md:max-h-[60dvh] overflow-auto md:p-4 p-2 dark:text-white text-pretty">
    <h1 class="uppercase md:text-4xl font-semibold text-primary dark:text-white -mt-2">Somethings TODO</h1>
    <p class="mt-2">A light and fast todo-app, built with Vue3 and Pinia</p>
    <h2 class="mt-6 md:text-3xl font-semibold text-primary dark:text-white">Features</h2>
    <details class="mt-2">
      <summary class="font-semibold">Lightweight UI</summary>
      <p>Makes use of light UI components, so that your app remains featherlight and blazing fast!</p>
    </details>
    <details class="mt-2">
      <summary class="font-semibold">Strong Search</summary>
      <p>Searches your TODOs by text or heading or due-date tags. e.g. search for <mark>grocery</mark>, <mark>due tomorrow</mark>, <mark>next week</mark> etc.</p>
      <p>You can also use arithmetic operators such as <mark>{{ '=, >, <, >=, <=' }}</mark>. For example, <mark>{{ '= 7 or >= 5 or < 3' }}</mark> to filter on the due date.</p>
    </details>
    <details class="mt-2">
      <summary class="font-semibold">Uses LocalStorage</summary>
      <p>Uses your browser's local-storage. So remember, a new browser means a new set of TODOs :-)</p>
    </details>
    <details class="mt-2">
      <summary class="font-semibold">Dark Mode Support</summary>
      <p>Turn on dark mode on your mobile/laptop/PC and the page looks as elegant as it can get.</p>
    </details>
    <details class="mt-2">
      <summary class="font-semibold">Easy Share</summary>
      <p>Share your TODO items on your favourite medium.</p>
    </details>
    <details class="mt-2">
      <summary class="font-semibold">Hybrid App</summary>
      <p>Install as hybrid app on Android or add to your home-screen on iOS.</p>
    </details>
    <h3 class="mt-6 md:text-2xl font-semibold text-primary dark:text-white">May I see the source code?</h3>
    <p>Sure, why not! Just go to the <a
      href="https://github.com/anirbmuk/somethings-todo.git"
      target="_blank"
      class="font-semibold max-md:underline md:navlink relative">GitHub project</a>.</p>
    <p>Found a bug? Just open an issue.</p>
    <h6 class="mt-6 text font-semibold text-primary dark:text-white">Who am I?</h6>
    <p>Ah! I would be <a
      href="https://anirbmuk.appspot.com/en"
      target="_blank"
      class="font-semibold max-md:underline md:navlink relative">Anirban Mukherjee</a>.</p>
  </div>
  <hr class="mx-2 w-[calc(100%-1rem)] md:mx-4 md:w-[calc(100%-2rem)]">
  <div class="mb-2 mt-4 flex items-center justify-end">
    <button
      type="button"
      class="min-w-24 cursor-pointer rounded-sm border-none bg-primary px-5 py-2.5 text-center text-white shadow-lg outline-primary md:hover:bg-primary"
      @click="$emit('close-help')">
      OK
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close-help']);
</script>

<style lang="css" scoped>
p {
  @apply text-justify text-pretty;
}
</style>
