import type { GroupBy } from './todo';

export type ITodoState = {
  showAll: boolean;
  groupBy: GroupBy;
  searchString: string | undefined | null;
}
