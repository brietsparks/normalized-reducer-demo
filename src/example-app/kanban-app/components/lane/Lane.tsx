import React, { ComponentType } from 'react';
import Typography from '@material-ui/core/Typography';

import { Id } from '../../model';

export interface Props {
  id: Id,
  title: string,
  boardId: Id,
  taskIds?: Id[],
  Tasks: ComponentType<TasksProps>
}

export interface TasksProps {
  laneId: Id,
  ids: Id[],
}

export default function Lane({ id, title, boardId, taskIds = [], Tasks }: Props) {
  return (
    <div>
      <Typography>{title}</Typography>

      {Tasks && taskIds && (
        <Tasks laneId={id} ids={taskIds} />
      )}
    </div>
  );
}
