import React from 'react';

import { Id } from '../../model';
import { Comment as ComponentPresentation } from '../../components/comment';
import { useComment } from '../../hooks/entity-hooks';

import ChildComments from './ChildComments';

export interface Props {
  id: Id,
  taskId?: Id,
  parentCommentId?: Id,
}

export default function Comment({ id, taskId, parentCommentId, }: Props) {
  const comment = useComment(id);

  if (!comment) {
    return null;
  }

  return (
    <ComponentPresentation
      id={id}
      value={comment.value}
      childCommentIds={comment.childCommentIds}
      ChildComments={ChildComments}
    />
  );
}
