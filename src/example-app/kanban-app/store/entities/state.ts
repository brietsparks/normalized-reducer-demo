import { State as NormalizedState } from 'normalized-reducer';
import { Board, Comment, Id, Lane, Tag, Task, User } from '../../model';

export { emptyState } from './normalized';

export interface State extends NormalizedState {
  entities: {
    user: Record<Id, User>,
    task: Record<Id, Task>,
    lane: Record<Id, Lane>,
    board: Record<Id, Board>,
    tag: Record<Id, Tag>,
    comment: Record<Id, Comment>,
  },
  ids: {
    user: Id[],
    task: Id[],
    lane: Id[],
    board: Id[],
    tag: Id[],
    comment: Id[],
  }
}

