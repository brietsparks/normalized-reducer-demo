import React from 'react';

import { Id } from '../../model';
import { useLane } from '../../hooks/entity-hooks';

import { Lane as LanePresentation } from '../../components/lane';
import LaneTasks from './LaneTasks';

export interface Props {
  id: Id
}

export default function Lane({ id }: Props) {
  const lane = useLane(id);

  if (!lane) {
    return null;
  }

  return (
    <LanePresentation
      id={id}
      title={lane.title}
      boardId={lane.boardId}
      taskIds={lane.taskIds}
      Tasks={LaneTasks}
    />
  );
}
