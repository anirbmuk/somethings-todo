import type { KeyValue } from '@/types/key-value';
import type {
  FilterBy,
  GroupBy,
  ITodo,
} from '@/types/todo';

export const enumerables = [
  'todoid',
  'duedate',
  'heading',
  'text',
  'status',
  'completedon',
] satisfies (keyof ITodo)[];

export const GROUP_BY_OPTIONS = [
  {
    Key: 'Day',
    Value: 'day',
  },
  {
    Key: 'Month',
    Value: 'month',
  },
] satisfies KeyValue<GroupBy>[];

export const FILTER_OPTIONS = [
  {
    Key: 'Show',
    Value: 'show',
  },
  {
    Key: 'Hide',
    Value: 'hide',
  },
] satisfies KeyValue<FilterBy>[];

export const QUICK_FILTER_OPTIONS = [
  {
    Key: 'Done',
    Value: 'done',
    FilterBy: 'show',
  },
  {
    Key: 'Pending',
    Value: 'pending',
  },
  {
    Key: 'Past Due',
    Value: '< 0',
  },
  {
    Key: 'Late',
    Value: 'late',
    FilterBy: 'show',
  },
  {
    Key: 'On Time',
    Value: 'on time',
    FilterBy: 'show',
  },
] satisfies (KeyValue<string> & { FilterBy?: FilterBy })[];
