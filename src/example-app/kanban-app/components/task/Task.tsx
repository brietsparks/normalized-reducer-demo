import React, { ComponentType } from 'react';
import Typography from '@material-ui/core/Typography';

import { Id } from '../../model';

export interface Props {
  id: Id,
  title: string,
  description: string,
  laneId: Id,
  creatorId: Id,
  assigneeId?: Id,
  tagIds?: Id[],
  Comments?: ComponentType<CommentsProps>,
  rootCommentIds?: Id[],
}

export interface CommentsProps {
  taskId: Id,
  ids: Id[]
}

export default function Task({
  id,
  title,
  laneId,
  creatorId,
  assigneeId,
  tagIds,
  rootCommentIds = [],
  Comments,
}: Props) {
  return (
    <div>
      <Typography>{title}</Typography>

      {Comments &&
      <Comments taskId={id} ids={rootCommentIds}/>
      }
    </div>
  );
}
