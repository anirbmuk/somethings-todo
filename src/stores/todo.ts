import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type {
  AddTodo,
  ITodo,
  UpdateTodo,
} from '@/types/todo';
import { enumerables } from '@/constants/todo';
import { getStorageDate } from '@/helpers/date';

export const useTodoStore = defineStore('todos', () => {
  const todos = useStorage<ITodo[]>('todos', [], localStorage, {
    serializer: {
      read(raw) {
        return JSON.parse(raw);
      },
      write(value) {
        return JSON.stringify(value, enumerables);
      },
    },
  });

  const addTodo = (todo: AddTodo) => {
    const duedateUTC = getStorageDate(todo.duedate);
    const newTodo = {
      ...todo,
      todoid: generateTodoId(),
      status: 'Incomplete',
      ...(duedateUTC && {
        duedate: duedateUTC,
      }),
    } satisfies ITodo;
    todos.value.push(newTodo);
  };

  const updateTodo = ({
    todoid,
    todo,
  }: { todoid: ITodo['todoid']; todo: UpdateTodo }) => {
    const indexOfTodoToBeUpdated = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeUpdated < 0) {
      return;
    }
    todos.value[indexOfTodoToBeUpdated] = {
      ...todos.value[indexOfTodoToBeUpdated],
      ...todo,
    };
  };

  const toggleTodo = (todoid: ITodo['todoid']) => {
    const indexOfTodoToBeUpdated = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeUpdated < 0) {
      return;
    }
    const todoToBeUpdated = todos.value[indexOfTodoToBeUpdated];
    const newStatus = todoToBeUpdated.status === 'Complete' ? 'Incomplete' : 'Complete';
    updateTodo({
      todoid,
      todo: {
        ...todoToBeUpdated,
        status: newStatus,
        completedon:
        newStatus === 'Complete'
          ? getStorageDate()
          : undefined,
      },
    });
  };

  const deleteTodo = (todoid: ITodo['todoid']) => {
    const indexOfTodoToBeDeleted = todos.value.findIndex((todo) => todo.todoid === todoid);
    if (indexOfTodoToBeDeleted < 0) {
      return;
    }
    todos.value.splice(indexOfTodoToBeDeleted, 1);
  };

  const generateTodoId = () => btoa(`${+new Date()}-${Math.ceil(Math.random() * 1000)}`).slice(0, -2).toLowerCase();

  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
});
