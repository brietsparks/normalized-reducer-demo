import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useTaskEditorStyles } from './styles';

export interface Props {
  title?: string,
  description?: string,
  onSubmit: (title: string, description: string) => void
  onCancel: () => void
}

export default function TaskEditorForm({
  onSubmit,
  onCancel,
  title: initialTitle = '',
  description: initialDescription = ''
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const classes = useTaskEditorStyles();

  const handleSubmit = () => {
    if (title) {
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
      <TextField
        autoFocus
        fullWidth
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        fullWidth
        multiline
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
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
