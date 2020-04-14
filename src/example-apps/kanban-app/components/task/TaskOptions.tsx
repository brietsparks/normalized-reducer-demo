import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export interface Props {
  onClickEdit: () => void,
  onClickDelete: () => void
}

export default function StatusOptions({ onClickEdit, onClickDelete }: Props) {
  return (
    <List>
      <ListItem button>
        <ListItemText primary="Assign Task"/>
      </ListItem>
      <ListItem button onClick={onClickEdit}>
        <ListItemText primary="Edit Task"/>
      </ListItem>
      <ListItem button onClick={onClickDelete}>
        <ListItemText primary="Delete Task"/>
      </ListItem>
    </List>
  );
}
