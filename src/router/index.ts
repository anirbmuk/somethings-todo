import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import { nextTick } from 'vue';
import { APP_ROUTES } from '@/constants/route';

const DEFAULT_TITLE = 'Things TODO';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: APP_ROUTES,
});

router.beforeEach((to) => {
  nextTick(() => {
    document.title = to.meta.title ? `${DEFAULT_TITLE} | ${to.meta.title}` : DEFAULT_TITLE;
  });
});

router.afterEach(() => window.scrollTo({
  left: 0,
  top: 0,
  behavior: 'smooth',
}));

export default router;
