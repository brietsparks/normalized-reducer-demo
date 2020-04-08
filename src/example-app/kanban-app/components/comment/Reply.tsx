import React, { useState } from 'react';

export interface Props {
  onSubmit: (value: string) => void,
  onCancel: () => void,
}

export default function Reply({ onSubmit, onCancel }: Props) {
  const [value, setValue] = useState('');

  const handleClickSubmit = () => {
    if (!!value) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleClickCancel = () => {
    onCancel();
    setValue('');
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleClickCancel}>Cancel</button>
      <button onClick={handleClickSubmit}>Reply</button>
    </div>
  );
}
