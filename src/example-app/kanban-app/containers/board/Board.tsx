import React from 'react';

import { Id } from '../../model';
import { useBoard } from '../../hooks/entity-hooks';
import { Board as BoardPresentation } from '../../components/board';

import BoardLanes from './BoardLanes';

export interface Props {
  id: Id
}

export default function Board({ id }: Props) {
  const board = useBoard(id);

  if (!board) {
    return null;
  }

  return (
    <BoardPresentation
      id={board.id}
      title={board.title}
      laneIds={board.laneIds}
      Lanes={BoardLanes}
    />
  );
}
