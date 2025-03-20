import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import TodoView from '@/views/TodoView.vue';
import { nextTick } from 'vue';

const DEFAULT_TITLE = 'Things TODO';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/notfound',
      name: 'page-not-found',
      component: () => import('@/views/PageNotFoundView.vue'),
      meta: {
        title: '404 - Not Found',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'no-match',
      redirect: '/notfound',
    },
  ],
});

router.beforeEach((to) => {
  nextTick(() => {
    document.title = to.meta.title ? `${DEFAULT_TITLE} | ${to.meta.title}` : DEFAULT_TITLE;
  });
});

export default router;
