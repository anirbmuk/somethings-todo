import type { ITodo } from './todo';

export type ITodoCondition = (item: ITodo) => boolean
