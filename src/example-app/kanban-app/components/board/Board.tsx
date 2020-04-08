import React, { ComponentType } from 'react';
import Typography from '@material-ui/core/Typography';

import { Id } from '../../model';

export interface Props {
  id: Id,
  title: string,
  laneIds?: Id[],
  Lanes: ComponentType<LanesProps>
}

export interface LanesProps {
  boardId: Id,
  ids: Id[],
}

export default function Board({ id, title, laneIds = [], Lanes }: Props) {
  return (
    <div>
      <Typography>{title}</Typography>

      <Lanes boardId={id} ids={laneIds} />
    </div>
  );
}
