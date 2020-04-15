import React from 'react';

import { Id } from '../../model';
import { useCreateTask, useStatus, useUpdateStatus, useDeleteStatus } from '../../hooks/entity-hooks';
import { Status as StatusPresentation } from '../../components/status';
import { useAuthId } from '../../Auth';
import { Task } from '../task';

export interface Props {
  id: Id
}

export default function Status({ id, ...props }: Props) {
  const status = useStatus(id);
  const updateStatus = useUpdateStatus();
  const deleteStatus = useDeleteStatus();

  const createTask = useCreateTask();
  const authId = useAuthId();

  if (!status) {
    return null;
  }

  return (
    <StatusPresentation
      id={id}
      title={status.title}
      boardId={status.boardId}
      taskIds={status.taskIds}
      Task={Task}
      createTask={createTask}
      creatorId={authId}
      updateStatus={updateStatus}
      deleteStatus={deleteStatus}
      {...props}
    />
  );
}
