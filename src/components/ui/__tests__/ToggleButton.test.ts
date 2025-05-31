import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import ToggleButton from '../ToggleButton.vue';
import type { KeyValue } from '../../../types/key-value';

describe('ToggleButton', () => {
  const defaultProps = {
    id: 'test-toggle',
    options: [
      {
        Key: 'Option 1',
        Value: 'option1',
      },
      {
        Key: 'Option 2',
        Value: 'option2',
      },
    ] as KeyValue<string>[],
  };

  it('renders all options correctly', () => {
    const wrapper = mount(ToggleButton, {
      props: defaultProps,
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toBe('Option 1');
    expect(buttons[1].text()).toBe('Option 2');
  });

  it('applies correct default styling', () => {
    const wrapper = mount(ToggleButton, {
      props: defaultProps,
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('min-w-14');
    expect(button.classes()).toContain('p-3');
  });

  it('applies correct pill styling when type is pill', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        type: 'pill',
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('rounded-full');
    expect(button.classes()).toContain('min-w-20');
  });

  it('emits update:model-value event when option is clicked', async () => {
    const wrapper = mount(ToggleButton, {
      props: defaultProps,
    });

    await wrapper.find('[data-test-id="toggle-option-option-1"]').trigger('click');
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(wrapper.emitted('update:model-value')![0]).toEqual(['option1']);
  });

  it('converts value to lowercase when useLowercase is true', async () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        useLowercase: true,
        options: [
          {
            Key: 'Option',
            Value: 'UPPERCASE',
          },
        ] as KeyValue<string>[],
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:model-value')![0]).toEqual(['uppercase']);
  });

  it('handles boolean values correctly', async () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        options: [
          {
            Key: 'Yes',
            Value: true,
          },
          {
            Key: 'No',
            Value: false,
          },
        ] as KeyValue<boolean>[],
      },
    });

    await wrapper.find('[data-test-id="toggle-option-yes"]').trigger('click');
    expect(wrapper.emitted('update:model-value')![0]).toEqual([true]);
  });

  it('disables all buttons when disabled prop is true', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        disabled: true,
      },
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      expect(button.attributes('disabled')).toBeDefined();
    });
  });

  it('does not emit event when clicked while disabled', async () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        disabled: true,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:model-value')).toBeFalsy();
  });

  it('marks the selected option correctly', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        modelValue: 'option1',
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons[0].attributes('aria-pressed')).toBe('true');
    expect(buttons[1].attributes('aria-pressed')).toBe('false');
    expect(buttons[0].classes()).toContain('!border-primary');
    expect(buttons[0].classes()).toContain('!bg-primary');
  });

  it('handles case-sensitive comparison correctly when useLowercase is false', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        ...defaultProps,
        options: [
          {
            Key: 'Option',
            Value: 'UPPERCASE',
          },
        ] as KeyValue<string>[],
        modelValue: 'UPPERCASE',
        useLowercase: false,
      },
    });

    const button = wrapper.find('button');
    expect(button.attributes('aria-pressed')).toBe('true');
    expect(button.attributes('aria-label')).toBe('Select Option');
  });

  it('sets correct ARIA attributes', () => {
    const wrapper = mount(ToggleButton, {
      props: defaultProps,
    });

    const group = wrapper.find('div');
    expect(group.attributes('role')).toBe('group');
  });
});
