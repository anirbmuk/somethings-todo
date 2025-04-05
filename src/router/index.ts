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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/import/:content',
      name: 'import',
      component: () => import('@/views/ImportView.vue'),
      meta: {
        title: 'Dashboard',
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
