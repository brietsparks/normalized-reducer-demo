import React, { useState } from 'react';

import { Id } from '../../model';
import { useCreateStatus } from '../../hooks/entity-hooks';
import { StatusEditorForm } from '../../components/status';
import { Status } from '../status';

export interface BoardStatuses {
  boardId: Id,
  ids: Id[]
}

export default function BoardStatuses({ boardId, ids }: BoardStatuses) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const createStatus = useCreateStatus();

  const handleSubmit = (title: string) => {
    createStatus({ title, boardId });
    setIsFormOpen(false);
  };

  const handleCancel = () => setIsFormOpen(false);

  return (
    <div>
      {
        isFormOpen
          ? <StatusEditorForm onSubmit={handleSubmit} onCancel={handleCancel} />
          : <button onClick={() => setIsFormOpen(true)}>+ Add</button>
      }
      {ids.map(id => (
        <Status id={id} />
      ))}
    </div>
  );
}
