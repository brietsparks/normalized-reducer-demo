import { actionCreators } from './normalized';
import { Id, makeId } from '../../model';

// user: Record<Id, User>,
// task: Record<Id, Task>,
// status: Record<Id, Status>,
// board: Record<Id, Board>,
// tag: Record<Id, Tag>,
// comment: Record<Id, Comment>,

export const createUser = (user: { id?: Id, firstName: string, lastName: string }) => {
  const id = user?.id || makeId();

  return actionCreators.create('user', id, { ...user, id });
};

export const createTask = (task: { id?: Id, creatorId: Id, statusId: Id, title: string }) => {
  const id = task?.id || makeId();

  // a task must have a creator and a status,
  // so create the task and attach it to the creator and status
  return actionCreators.batch(
    actionCreators.create('task', id, { ...task, id }),
    actionCreators.attach('task', id, 'creatorId', task.creatorId),
    actionCreators.attach('task', id, 'statusId', task.statusId),
  );
};

export const createStatus = (status: { id?: Id, boardId: Id, title: string }) => {
  const id = status?.id || makeId();

  // a status must have a board,
  // so create the status and attach it the board
  return actionCreators.batch(
    actionCreators.create('status', id, { ...status, id }),
    actionCreators.attach('status', id, 'boardId', status.boardId)
  );
};

export const createBoard = (board: { id?: Id, title: string }) => {
  const id = board?.id || makeId();

  return actionCreators.create('board', id, { ...board, id });
};

export const createTag = (tag: { id?: Id, value: string }) => {
  const id = tag?.id || makeId();

  return actionCreators.create('tag', id, { ...tag, id });
};

export const createRootComment = (comment: { id?: Id, taskId: Id, value: string }) => {
  const id = comment?.id || makeId();

  // a root comment must have a task
  // so create the comment and attach it to the task
  return actionCreators.batch(
    actionCreators.create('comment', id, { ...comment, id }),
    actionCreators.attach('comment', id, 'taskId', comment.taskId)
  );
};

export const createChildComment = (comment: { id?: Id, parentCommentId: Id, value: string }) => {
  const id = comment?.id || makeId();

  // a child comment must have a parent comment
  // so create the comment and attach it to the parent comment
  return actionCreators.batch(
    actionCreators.create('comment', id, { ...comment, id }),
    actionCreators.attach('comment', id, 'comment', comment.parentCommentId)
  );
};

export const moveBoardStatus = (boardId: Id, src: number, dest: number) => {
  return actionCreators.moveAttached('board', boardId, 'statusIds', src, dest);
};

export const moveStatusTask = (taskId: Id, srcStatusId: Id, src: number, destStatusId: Id, dest: number) => {
  if (srcStatusId === destStatusId) {
    return actionCreators.moveAttached('status', srcStatusId, 'taskIds', src, dest);
  } else {
    return actionCreators.attach('status', destStatusId, 'taskIds', taskId, { index: dest })
  }
};
