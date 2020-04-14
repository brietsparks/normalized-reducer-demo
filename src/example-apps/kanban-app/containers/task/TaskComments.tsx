import React from 'react';

import { Comment } from '../comment';
import { Id } from '../../model';

export interface Props {
  taskId: Id,
  ids: Id[],
}

export default function TaskComments({ taskId, ids = [] }: Props) {
  return (
    <div>
      {ids.map(id => (
        <Comment id={id} taskId={taskId} />
      ))}
    </div>
  );
}
