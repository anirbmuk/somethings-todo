import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import StatusPanel from '../StatusPanel.vue';

describe('StatusPanel', () => {
  it('renders with complete status correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Complete Tasks',
        type: 'complete',
        value: 5,
      },
    });

    expect(wrapper.find('[data-test-id="status-complete-tasks-label"]').text()).toBe('Complete Tasks');
    expect(wrapper.find('[data-test-id="status-complete-tasks-count"]').text()).toBe('5');
    expect(wrapper.classes()).toContain('rounded');
    expect(wrapper.classes('bg-green-50')).toBe(true);
    expect(wrapper.classes('border-green-100')).toBe(true);
  });

  it('renders with incomplete status correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Incomplete Tasks',
        type: 'incomplete',
        value: 3,
      },
    });

    expect(wrapper.find('[data-test-id="status-incomplete-tasks-label"]').text()).toBe('Incomplete Tasks');
    expect(wrapper.find('[data-test-id="status-incomplete-tasks-count"]').text()).toBe('3');
    expect(wrapper.classes('bg-red-50')).toBe(true);
    expect(wrapper.classes('border-red-100')).toBe(true);
  });

  it('renders with ontime status correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'On Time',
        type: 'ontime',
        value: 2,
      },
    });

    expect(wrapper.find('[data-test-id="status-on-time-label"]').text()).toBe('On Time');
    expect(wrapper.find('[data-test-id="status-on-time-count"]').text()).toBe('2');
    expect(wrapper.classes('bg-blue-50')).toBe(true);
    expect(wrapper.classes('border-blue-100')).toBe(true);
  });

  it('renders with late status correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Late Tasks',
        type: 'late',
        value: 1,
      },
    });

    expect(wrapper.find('[data-test-id="status-late-tasks-label"]').text()).toBe('Late Tasks');
    expect(wrapper.find('[data-test-id="status-late-tasks-count"]').text()).toBe('1');
    expect(wrapper.classes('bg-orange-50')).toBe(true);
    expect(wrapper.classes('border-orange-100')).toBe(true);
  });

  it('renders with past status correctly', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Past Tasks',
        type: 'past',
        value: 4,
      },
    });

    expect(wrapper.find('[data-test-id="status-past-tasks-label"]').text()).toBe('Past Tasks');
    expect(wrapper.find('[data-test-id="status-past-tasks-count"]').text()).toBe('4');
    expect(wrapper.classes('bg-red-50')).toBe(true);
    expect(wrapper.classes('border-red-100')).toBe(true);
  });

  it('uses default value of 0 when value prop is not provided', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Test Tasks',
        type: 'complete',
      },
    });

    expect(wrapper.find('[data-test-id="status-test-tasks-count"]').text()).toBe('0');
  });

  it('displays correct title attribute', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Test Tasks',
        type: 'complete',
        value: 5,
      },
    });

    expect(wrapper.attributes('title')).toBe('5 Test Tasks');
  });

  it('displays "None" in title when value is 0', () => {
    const wrapper = mount(StatusPanel, {
      props: {
        label: 'Test Tasks',
        type: 'complete',
        value: 0,
      },
    });

    expect(wrapper.attributes('title')).toBe('None Test Tasks');
  });
});
