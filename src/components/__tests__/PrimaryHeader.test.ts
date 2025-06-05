import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import PrimaryHeader from '../PrimaryHeader.vue';

// Mock composables
vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({
    toggleTheme: vi.fn(),
    isDarkTheme: false,
  }),
}));

vi.mock('@/composables/useTodo', () => ({
  useTodo: () => ({
    showCreateModal: vi.fn(),
  }),
}));

vi.mock('@/composables/useHelp', () => ({
  useHelp: () => ({
    HELP_TOPICS_MODAL_NAME: 'help-topics',
    showHelpModal: vi.fn(),
    closeHelpModal: vi.fn(),
  }),
}));

// Create router instance for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: {
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: {
      },
    },
  ],
});

describe('PrimaryHeader.vue', () => {
  beforeEach(() => {
    router.push('/');
  });

  it('renders the title correctly', () => {
    const wrapper = mount(PrimaryHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="title-link"]').text()).toBe('Things TODO');
  });

  it('shows add button when not in reduced mode', () => {
    const wrapper = mount(PrimaryHeader, {
      props: {
        reduced: false,
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="add-todo-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="add-todo-btn"]').attributes('aria-haspopup')).toBe('dialog');
  });

  it('hides add button when in reduced mode', () => {
    const wrapper = mount(PrimaryHeader, {
      props: {
        reduced: true,
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="add-todo-btn"]').exists()).toBe(false);
  });

  it('shows dashboard button on todo route', async () => {
    await router.push('/');
    const wrapper = mount(PrimaryHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="analyse-todo-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="view-todo-btn"]').exists()).toBe(false);
  });

  it('shows todo button on dashboard route', async () => {
    await router.push('/dashboard');
    const wrapper = mount(PrimaryHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="analyse-todo-btn"]').exists()).toBe(false);
    expect(wrapper.find('[data-test-id="view-todo-btn"]').exists()).toBe(true);
  });

  it('shows help button and triggers help modal', async () => {
    const wrapper = mount(PrimaryHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="help-todo-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="help-todo-btn"]').attributes('aria-haspopup')).toBe('dialog');
  });

  it('shows theme toggle button with correct icon', () => {
    const wrapper = mount(PrimaryHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('[data-test-id="theme-todo-btn"]').exists()).toBe(true);
  });
});
