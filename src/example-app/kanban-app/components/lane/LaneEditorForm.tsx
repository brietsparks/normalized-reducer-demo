import React, { useState } from 'react';

export interface Props {
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function LaneCreationForm({ onSubmit, onCancel }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!!value) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setValue('');
  };

  return (
    <div>
      <input autoFocus value={value} onChange={e => setValue(e.target.value)} />

      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit} disabled={!value}>Add</button>
    </div>
  );
}
