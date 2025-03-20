export type ITodo = {
  todoid: string;
  duedate: string;
  heading: string;
  text: string | undefined;
  status: Status;
  additional?: {
    state?: State;
    message?: string;
    remaining: number | undefined;
  };
  performance?: {
    variation: number;
    rating: Rating;
    message: string;
  };
  completedon?: string | undefined;
}

export type AddTodo = Pick<ITodo, 'heading' | 'text' | 'duedate'>;

export type UpdateTodo = Pick<
  ITodo,
  'heading' | 'text' | 'status' | 'duedate' | 'completedon'
>;

export type GroupedTodo = {
  datedivider: string;
  pending: number;
  todos: ITodo[];
};

export type GroupBy = 'month' | 'day';

export type FilterBy = 'show' | 'hide';

export type Status = 'Incomplete' | 'Complete';

export type State = 'error' | 'warn' | 'info' | 'moderate' | 'safe' | 'later' | 'done';

export type Rating = 'beforetime' | 'ontime' | 'delayed' | 'late';
