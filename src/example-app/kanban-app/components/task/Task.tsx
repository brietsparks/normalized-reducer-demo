import React, { ComponentType } from 'react';
import Typography from '@material-ui/core/Typography';

import { Id } from '../../model';

import { useStyles } from './styles';

export interface Props {
  id: Id,
  title: string,
  description?: string,
  statusId: Id,
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
  statusId,
  creatorId,
  assigneeId,
  tagIds,
  rootCommentIds = [],
  Comments,
}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.comment}>
      <Typography>{title}</Typography>

      {Comments &&
      <Comments taskId={id} ids={rootCommentIds}/>
      }
    </div>
  );
}
