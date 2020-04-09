import React from 'react';

import { Id } from '../../model';
import { useStatus } from '../../hooks/entity-hooks';

import { Status as StatusPresentation } from '../../components/status';
import { Task } from '../task';

export interface Props {
  id: Id
}

export default function Status({ id }: Props) {
  const status = useStatus(id);

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
    />
  );
}
