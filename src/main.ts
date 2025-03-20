import { registerSW } from 'virtual:pwa-register';
import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Reload the page immediately when there is a service-worker update
registerSW({
  immediate: true,
})();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
