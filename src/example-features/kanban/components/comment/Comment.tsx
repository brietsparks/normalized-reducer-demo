import React, { ComponentType, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { Id } from '../../model';

import Reply from './Reply';

export interface Props {
  id: Id,
  value: string,
  childCommentIds?: Id[],
  ChildComments?: ComponentType<ChildCommentsProps>,
  onSubmitReply?: (id: Id, value: string) => void,
}

export interface ChildCommentsProps {
  parentCommentId: Id,
  ids: Id[],
}

export default function Comment({
  id,
  value,
  childCommentIds = [],
  ChildComments,
  onSubmitReply,
}: Props) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleSubmitReply = (replyValue: string) => {
    if (onSubmitReply) {
      onSubmitReply(id, replyValue);
    }

    setIsReplyOpen(false);
  };

  const handleCancelReply = () => setIsReplyOpen(false);

  return (
    <div>
      <Typography>{value}</Typography>

      <button onClick={() => setIsReplyOpen(true)}>Reply</button>

      {isReplyOpen &&
      <Reply onSubmit={handleSubmitReply} onCancel={handleCancelReply}/>
      }

      <div style={{ marginLeft: 20 }}>
      {ChildComments && (
        <ChildComments parentCommentId={id} ids={childCommentIds} />
      )}
      </div>
    </div>
  );
}
