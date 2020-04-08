const uuid = require('uuid/v4');

export type Id = string|number;

export const makeId = () => uuid();

export interface User {
  id: Id,
  firstName: string,
  lastName: string
  createdTaskIds?: Id[],
  assignedTaskIds?: Id[],
}

export interface Task {
  id: Id,
  title: string,
  description: string,
  laneId: Id,
  creatorId: Id,
  assigneeId?: Id,
  tagIds?: Id[],
  rootCommentIds?: Id[],
}

export interface Lane {
  id: Id,
  title: string,
  boardId: Id,
  taskIds?: Id[]
}

export interface Board {
  id: Id,
  title: string,
  laneIds?: Id[]
}

export interface Tag {
  id: Id,
  value: string
  taskIds?: Id[]
}

export interface Comment {
  id: Id,
  value: string,
  taskId?: Id,
  parentCommentId?: Id,
  childCommentIds?: Id[]
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export const makeUser = (user: Partial<User>): User => {
  return {
    id: user.id || uuid(),
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    ...user
  };
};

export const makeTask = (task: Partial<Task>): Task => {
  return {
    id: task.id || uuid(),
    title: task.title || '',
    description: task.title || '',
    laneId: task.laneId || '',
    tagIds: task.tagIds || [],
    creatorId: task.creatorId || '',
    assigneeId: task.assigneeId,
    rootCommentIds: task.rootCommentIds || [],
  }
};
