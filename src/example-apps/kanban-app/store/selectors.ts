import { Board, Comment, Id, Status, Tag, Task, User } from '../model';
import { selectors} from './normalized';
import { State } from './state';

export const getUserIds = (state: State) => selectors.getIds(state, { type: 'user' });
export const getTaskIds = (state: State) => selectors.getIds(state, { type: 'task' });
export const getStatusIds = (state: State) => selectors.getIds(state, { type: 'status' });
export const getBoardIds = (state: State) => selectors.getIds(state, { type: 'board' });
export const getTagIds = (state: State) => selectors.getIds(state, { type: 'tag' });
export const getCommentIds = (state: State) => selectors.getIds(state, { type: 'comment' });

export const getUser = (state: State, args: { id: Id }) => selectors.getEntity<User>(state, { type: 'user', id: args.id });
export const getTask = (state: State, args: { id: Id }) => selectors.getEntity<Task>(state, { type: 'task', id: args.id });
export const getStatus = (state: State, args: { id: Id }) => selectors.getEntity<Status>(state, { type: 'status', id: args.id });
export const getBoard = (state: State, args: { id: Id }) => selectors.getEntity<Board>(state, { type: 'board', id: args.id });
export const getTag = (state: State, args: { id: Id }) => selectors.getEntity<Tag>(state, { type: 'tag', id: args.id });
export const getComment = (state: State, args: { id: Id }) => selectors.getEntity<Comment>(state, { type: 'comment', id: args.id });
