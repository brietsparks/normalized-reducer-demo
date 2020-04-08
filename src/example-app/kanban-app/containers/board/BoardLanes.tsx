import React, { useState } from 'react';

import { Id } from '../../model';
import { useCreateLane } from '../../hooks/entity-hooks';
import { LaneEditorForm } from '../../components/lane';
import { Lane } from '../lane';

export interface BoardLanes {
  boardId: Id,
  ids: Id[]
}

export default function BoardLanes({ boardId, ids }: BoardLanes) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const createLane = useCreateLane();

  const handleSubmit = (title: string) => {
    createLane({ title, boardId });
    setIsFormOpen(false);
  };

  const handleCancel = () => setIsFormOpen(false);

  return (
    <div>
      {
        isFormOpen
          ? <LaneEditorForm onSubmit={handleSubmit} onCancel={handleCancel} />
          : <button onClick={() => setIsFormOpen(true)}>+ Add</button>
      }
      {ids.map(id => (
        <Lane id={id} />
      ))}
    </div>
  );
}
