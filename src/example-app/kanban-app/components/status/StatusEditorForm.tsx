import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useStatusEditorStyles } from './styles';

export interface Props {
  title?: string,
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function StatusEditorForm({ title: initialTitle = '', onSubmit, onCancel }: Props) {
  const [value, setValue] = useState(initialTitle);

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setValue('');
  };

  const classes = useStatusEditorStyles();

  return (
    <div>
      <TextField
        autoFocus
        fullWidth
        placeholder="Title"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <div className={classes.buttons}>
        <Grid container spacing={1} >
          <Grid item xs={6}>
            <Button fullWidth onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleSubmit} color="primary">Done</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
