import React from 'react';

import { Id } from '../../model';
import {
  useBoard,
  useCreateStatus,
  useMoveBoardStatus,
  useMoveBoardStatusTask,
} from '../../hooks/entity-hooks';
import { Board as BoardPresentation } from '../../components/board';

import { Status } from '../status';

export interface Props {
  id: Id
}

export default function Board({ id }: Props) {
  const board = useBoard(id);
  const createStatus = useCreateStatus();
  const moveBoardStatus = useMoveBoardStatus();
  const moveBoardStatusTask = useMoveBoardStatusTask();

  if (!board) {
    return null;
  }

  return (
    <BoardPresentation
      id={board.id}
      title={board.title}
      createStatus={createStatus}
      statusIds={board.statusIds}
      Status={Status}
      moveStatus={moveBoardStatus}
      moveTask={moveBoardStatusTask}
    />
  );
}
