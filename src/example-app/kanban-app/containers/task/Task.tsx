import React from 'react';

import { Id } from '../../model';
import { useTask, useUpdateTask, useDeleteTask } from '../../hooks/entity-hooks';
import { Task as TaskPresentation } from '../../components/task';

import TaskComments from './TaskComments';

export interface Props {
  id: Id
}

export default function Task({ id }: Props) {
  const task = useTask(id);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  if (!task) {
    return null;
  }

  return (
    <TaskPresentation
      id={id}
      title={task.title}
      description={task.description}
      statusId={task.statusId}
      creatorId={task.creatorId}
      assigneeId={task?.assigneeId}
      tagIds={task?.tagIds}
      rootCommentIds={task?.rootCommentIds}
      Comments={TaskComments}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  );
}
