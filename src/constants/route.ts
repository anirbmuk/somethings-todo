import type {
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from 'vue-router';
import TodoView from '@/views/TodoView.vue';

export const ROUTES_WITH_TOOLBAR = ['todo'] as RouteRecordNameGeneric[];

export const APP_ROUTES = [
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
] satisfies RouteRecordRaw[];
