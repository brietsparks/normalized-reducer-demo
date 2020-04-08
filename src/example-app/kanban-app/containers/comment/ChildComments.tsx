import React from 'react';

import { Id } from '../../model';

import Comment from './Comment';

export interface Props {
  parentCommentId: Id,
  ids: Id[]
}

export default function ChildComments({ parentCommentId, ids = [] }: Props) {
  return (
    <div>
      {ids.map(id => {
        return (
          <Comment
            key={id}
            parentCommentId={parentCommentId}
            id={id}
          />
        )
      })}
    </div>
  );
}
