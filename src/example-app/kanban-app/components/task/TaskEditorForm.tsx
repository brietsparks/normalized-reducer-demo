import React, { useState } from 'react';

export interface Props {
  onSubmit: (title: string, description: string) => void
  onCancel: () => void
}

export default function TaskEditorForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!!title) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <input
        autoFocus
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit} disabled={!title}>Add</button>
    </div>
  );
}
