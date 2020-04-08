import React from 'react';

import { Id } from '../../model';
import { useTask } from '../../hooks/entity-hooks';
import { Task as TaskPresentation } from '../../components/task';

import TaskComments from './TaskComments';

export interface Props {
  id: Id
}

export default function Task({ id }: Props) {
  const task = useTask(id);

  if (!task) {
    return null;
  }

  return (
    <TaskPresentation
      id={id}
      title={task.title}
      description={task.description}
      laneId={task.laneId}
      creatorId={task.creatorId}
      assigneeId={task?.assigneeId}
      tagIds={task?.tagIds}
      rootCommentIds={task?.rootCommentIds}
      Comments={TaskComments}
    />

  );
}
