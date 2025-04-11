import {
  computed,
  ref,
} from 'vue';
import type {
  AddTodo,
  FilterBy,
  GroupBy,
  GroupedTodo,
  ImportStatus,
  ITodo,
  UpdateTodo,
} from '@/types/todo';
import { useGroupStore } from '@/stores/group';
import { useFilterStore } from '@/stores/filter';
import { useTodoStore } from '@/stores/todo';
import { useSearch } from './useSearch';
import { useModal } from './useModal';
import {
  decryptTodo,
  encryptTodo,
  getPerformance,
  getStatus,
} from '@/helpers/todo';
import { getReadableDate } from '@/helpers/date';

const groupBy = ref<GroupBy>('day');
const filterBy = ref<FilterBy>('show');

const defaultSort = (todo1: ITodo, todo2: ITodo) =>
  +new Date(todo1.duedate) - +new Date(todo2.duedate);

const COMPLETE_STATUS = {
  remaining: undefined,
  state: 'done',
  message: 'Done',
} satisfies ITodo['additional'];

const CREATE_UPDATE_MODAL_NAME = 'create-update-todo-modal' as const;

const todoToBeEdited = ref<ITodo | undefined>();

export const useTodo = () => {

  const filterStore = useFilterStore();
  const groupStore = useGroupStore();
  const todoStore = useTodoStore();

  const { conditions } = useSearch();

  const {
    showModal: showCreateOrUpdateModal,
    closeModal: closeCreateOrUpdateModal,
  } = useModal(CREATE_UPDATE_MODAL_NAME);

  const getAdditionalInfo = (todo: ITodo): ITodo['additional'] => {
    return todo.status === 'Incomplete'
      ? getStatus(todo.duedate)
      : COMPLETE_STATUS;
  };

  const getPerformanceInfo = (todo: ITodo) => {
    return todo.status === 'Complete'
      ? getPerformance(todo.duedate, todo.completedon)
      : undefined;
  };

  const groupByFn = (duedate: Date, groupby: GroupBy): string => {
    if (groupby === 'day') {
      return `${duedate.getFullYear()}-${(duedate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${duedate.getDate().toString().padStart(2, '0')}`;
    } else if (groupby === 'month') {
      return `${duedate.getFullYear()}-${(duedate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
    }
    return '';
  };

  groupBy.value = groupStore.groupBy;
  filterBy.value = filterStore.filterBy;

  const hydratedTodos = computed<ITodo[]>(() => {
    const hydratedTodos = todoStore.todos.map((todo) => {
      const additional = getAdditionalInfo(todo);
      const performance = getPerformanceInfo(todo);
      return {
        ...todo,
        additional,
        ...(performance && {
          performance,
        }),
      };
    });
    return hydratedTodos.sort(defaultSort);
  });

  const todos = computed<ITodo[]>(() => {
    let filteredTodos = [...hydratedTodos.value];
    for (const condition of conditions.value) {
      filteredTodos = filteredTodos?.filter(condition) || [];
    }
    return filteredTodos;
  });

  const groupedTodos = computed<{ pending: number; groupedTodos: GroupedTodo[] }>(() => {
    const dategroups = new Set<string>();
    for (const todo of todos.value) {
      dategroups.add(groupByFn(new Date(todo.duedate), groupStore.groupBy));
    }
    const groupedByTodos: GroupedTodo[] = [];
    let totalPending = 0;
    for (const group of [...dategroups].sort()) {
      const todosInGroup = todos.value.filter(
        (todo) =>
          groupByFn(new Date(todo.duedate), groupStore.groupBy) === group,
      );
      const incompleteTodosInGroup = todosInGroup
        .filter((todo) => todo.status === 'Incomplete')
        .sort(defaultSort);
      const completeTodosInGroup = todosInGroup
        .filter((todo) => todo.status === 'Complete')
        .sort(defaultSort);
      const pending = incompleteTodosInGroup.length;
      totalPending += pending;
      const groupedTodo: GroupedTodo = {
        datedivider: group,
        todos: [...incompleteTodosInGroup, ...completeTodosInGroup],
        pending,
      };
      groupedByTodos.push(groupedTodo);
    }
    return {
      pending: totalPending,
      groupedTodos: groupedByTodos,
    };
  });

  const showCreateModal = () => {
    todoToBeEdited.value = undefined;
    showCreateOrUpdateModal();
  };

  const showUpdateModal = (todoid: ITodo['todoid']) => {
    const indexOfTodoToBeEdited = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeEdited < 0) {
      return;
    }
    todoToBeEdited.value = todos.value[indexOfTodoToBeEdited];
    showCreateOrUpdateModal();
  };

  const addTodo = (todo: AddTodo) => todoStore.addTodo(todo);

  const importTodo = (content: string): ImportStatus => {
    const decryptedTodo = decryptTodo(content);
    if (!decryptedTodo) {
      return {
        status: 'failure',
        message: 'Could not decrypt malformed TODO content',
      };
    }
    const { todoid } = decryptedTodo;
    if (!todoid) {
      return {
        status: 'failure',
        message: 'Missing required \'todoid\' in the import data',
      };
    }
    const indexOfTodoToBeImported = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeImported > -1) {
      updateTodo({
        todoid,
        todo: {
          ...decryptedTodo,
          status: 'Incomplete',
          completedon: undefined,
        },
      });
      return {
        status: 'success',
        message: 'The TODO is successfully updated',
      };
    }
    todoStore.importTodo(decryptedTodo);
    return {
      status: 'success',
      message: 'The TODO is successfully imported',
    };
  };

  const updateTodo = ({
    todoid,
    todo,
  }: { todoid: ITodo['todoid']; todo: UpdateTodo }) => todoStore.updateTodo({
    todoid,
    todo,
  });

  const toggleTodo = (todoid: ITodo['todoid']) => todoStore.toggleTodo(todoid);

  const shareTodo = (todoid: ITodo['todoid']) => {
    const indexOfTodoToBeShared = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeShared < 0) {
      return;
    }
    const todoToBeShared = todos.value[indexOfTodoToBeShared];
    const todoConfig = encryptTodo(todoToBeShared);
    const headingLength = Math.max(Math.floor(todoToBeShared.heading.length * 2), 10);
    const fill = (new Array(headingLength) as string[]).fill('-', 0).join('');
    const due = `Due: ${getReadableDate(todoToBeShared.duedate)}`;
    const url = window.location.href || 'https://somethings-todo.netlify.app/';
    const urlForImport = `${url}import/${todoConfig}`;
    const text = `${todoToBeShared.heading || ''}\n${fill}\n${todoToBeShared.text || ''}\n\n${due}\n\nImport this TODO by visiting: ${urlForImport}`;
    if (typeof window?.navigator?.share !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('Sharing is not supported on this platform');
      return;
    }
    window?.navigator?.share?.({
      title: 'Sharing my TODO item',
      text,
    // eslint-disable-next-line no-console
    }).catch(() => console.warn('Sharing event was cancelled'));
  };

  const deleteTodo = (todoid: ITodo['todoid']) => todoStore.deleteTodo(todoid);

  return {
    groupBy,
    filterBy,
    groupByState: computed(() => groupStore.groupBy),
    filterByState: computed(() => filterStore.filterBy),
    hydratedTodos,
    todos,
    groupedTodos,
    addTodo,
    importTodo,
    updateTodo,
    toggleTodo,
    shareTodo,
    deleteTodo,
    CREATE_UPDATE_MODAL_NAME,
    closeCreateOrUpdateModal,
    showCreateModal,
    showUpdateModal,
    todoToBeEdited,
  };
};
