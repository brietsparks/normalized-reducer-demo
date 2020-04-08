import React, { useState } from 'react';

import { Id } from '../../model';
import { Task } from '../task';
import { TaskEditorForm } from '../../components/task';
import { useCreateTask } from '../../hooks/entity-hooks';
import { useAuthId } from '../../Auth';

export interface Props {
  laneId: Id,
  ids: Id[]
}

export default function LaneTasks({ laneId, ids }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const createTask = useCreateTask();
  const authId = useAuthId();

  const handleSubmit = (title: string, description: string) => {
    createTask({ title, description, laneId, creatorId: authId });
    setIsFormOpen(false);
  };

  const handleCancel = () => setIsFormOpen(false);

  return (
    <div>
      {isFormOpen
        ? <TaskEditorForm onSubmit={handleSubmit} onCancel={handleCancel}/>
        : <button onClick={() => setIsFormOpen(true)}>+ Add</button>
      }

      {ids.map(id => (
        <Task id={id} />
      ))}
    </div>
  );
}
