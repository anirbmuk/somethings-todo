import type { ITodo } from '@/types/todo';
import {
  isNextMonth,
  isThisMonth,
} from './date';
import {
  toValue, type MaybeRefOrGetter,
} from 'vue';

const ending = 'pending TODO';

const getRating = (variation: number): ITodo['performance'] => {
  if (variation < 0) {
    return {
      variation,
      rating: 'beforetime',
      message: 'Completed before due date :-)',
    };
  } else if (variation < 1) {
    return {
      variation,
      rating: 'ontime',
      message: 'Completed on time :-)',
    };
  } else if (variation < 2) {
    return {
      variation,
      rating: 'delayed',
      message: 'Almost on time :-|',
    };
  }
  return {
    variation,
    rating: 'late',
    message: 'Task was delayed :-(',
  };
};

export const getTodoCountText = (value: number | null | undefined, text = false): string => {
  if (!value || value < 0) {
    return text ? 'All caught up ✔' : '';
  }
  if (value === 1) {
    return `1 ${ending}`;
  }
  return `${value} ${ending}s`;
};

export const getStatus = (date: string): ITodo['additional'] | undefined => {
  const now = new Date();
  const duedate = new Date(date);

  const formattedNow = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now
    .getDate()
    .toString()
    .padStart(2, '0')}T00:00:00.000Z`;
  const formattedNowDate = new Date(formattedNow);

  const formattedDue = `${duedate.getFullYear()}-${(duedate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${duedate
    .getDate()
    .toString()
    .padStart(2, '0')}T00:00:00.000Z`;
  const formattedDueDate = new Date(formattedDue);

  const remaining = Math.round(
    (+formattedDueDate - +formattedNowDate) / (24 * 60 * 60 * 1000),
  );

  if (+formattedDueDate < +formattedNowDate) {
    return {
      state: 'error',
      message: 'Past due date',
      remaining,
    };
  }

  if (remaining === 0) {
    return {
      state: 'warn',
      message: 'Due today',
      remaining,
    };
  } else if (remaining === 1) {
    return {
      state: 'warn',
      message: 'Due tomorrow',
      remaining,
    };
  } else if (remaining > 1 && remaining < 7) {
    return {
      state: 'warn',
      message: `Due in ${remaining} days`,
      remaining,
    };
  } else if (remaining >= 7 && remaining < 8) {
    return {
      state: 'info',
      message: 'Due next week',
      remaining,
    };
  } else if (
    remaining >= 8 &&
    isThisMonth(formattedDueDate, formattedNowDate)
  ) {
    return {
      state: 'moderate',
      message: 'Due this month',
      remaining,
    };
  } else if (
    remaining >= 8 &&
    isNextMonth(formattedDueDate, formattedNowDate)
  ) {
    return {
      state: 'safe',
      message: 'Due next month',
      remaining,
    };
  }
  return {
    state: 'later',
    message: 'Due later',
    remaining,
  };
};

export const getPerformance = (
  duedate: string,
  completeddate: string | undefined,
): ITodo['performance'] | undefined => {
  if (!completeddate) {
    return getRating(0);
  }

  const [formattedDueDateString] = duedate.split('T');
  const formattedDueDate = new Date(
    `${formattedDueDateString}T00:00:00.000Z`,
  );

  const [formattedcompletedDateString] = completeddate.split('T');
  const formattedcompletedDate = new Date(
    `${formattedcompletedDateString}T00:00:00.000Z`,
  );

  const variation =
    Math.round(+formattedcompletedDate - +formattedDueDate) /
    (24 * 60 * 60 * 1000);
  return getRating(variation);
};

export const getCompletedTodoCount = (todos: MaybeRefOrGetter<ITodo[]>) => {
  const todosValue = toValue(todos);
  if (!todosValue.length) {
    return 0;
  }
  return todosValue.filter((todo) => todo.status === 'Complete').length;
};

export const getInCompleteTodoCount = (todos: MaybeRefOrGetter<ITodo[]>) => {
  const todosValue = toValue(todos);
  if (!todosValue.length) {
    return 0;
  }
  return todosValue.filter((todo) => todo.status === 'Incomplete').length;
};

export const getOnTimeTodoCount = (todos: MaybeRefOrGetter<ITodo[]>) => {
  const todosValue = toValue(todos);
  if (!todosValue.length) {
    return 0;
  }
  return todosValue.filter((todo) => todo.status === 'Complete' && ['beforetime', 'ontime'].includes(todo?.performance?.rating || '')).length;
};

export const getLateTodoCount = (todos: MaybeRefOrGetter<ITodo[]>) => {
  const todosValue = toValue(todos);
  if (!todosValue.length) {
    return 0;
  }
  return todosValue.filter((todo) => todo.status === 'Complete' && ['delayed', 'late'].includes(todo?.performance?.rating || '')).length;
};

export const getPastDueTodoCount = (todos: MaybeRefOrGetter<ITodo[]>) => {
  const todosValue = toValue(todos);
  if (!todosValue.length) {
    return 0;
  }
  return todosValue.filter((todo) => todo.status === 'Incomplete' && (todo?.additional?.remaining ?? 0) < 0).length;
};
