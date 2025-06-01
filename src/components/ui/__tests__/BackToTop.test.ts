import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import BackToTop from '../BackToTop.vue';

describe('BackToTop', () => {
  it('renders button correctly', () => {
    const wrapper = mount(BackToTop);
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('aria-label')).toBe('Click to scroll to the top of the page');
  });

  it('emits correct event on button click', async () => {
    const wrapper = mount(BackToTop);
    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('scrollToTop')).toBeDefined();
  });
});
