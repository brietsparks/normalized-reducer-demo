import React, { ComponentType, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';

import { Id } from '../../model';
import { OptionsPopper } from '../options-popper';
import TaskOptions from './TaskOptions';
import { useStyles } from './styles';
import TaskEditorForm from './TaskEditorForm';

export interface Props {
  id: Id,
  title: string,
  description?: string,
  statusId: Id,
  creatorId: Id,
  assigneeId?: Id,
  tagIds?: Id[],
  Comments?: ComponentType<CommentsProps>,
  rootCommentIds?: Id[],
  updateTask?: (id: Id, data: { title?: string, description?: string }) => void,
  deleteTask?: (id: Id) => void,
}

export interface CommentsProps {
  taskId: Id,
  ids: Id[]
}

export default function Task({
  id,
  title,
  description,
  statusId,
  creatorId,
  assigneeId,
  tagIds,
  rootCommentIds = [],
  Comments,
  updateTask,
  deleteTask,
}: Props) {
  const classes = useStyles();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);
  const handleSubmitEdit = (title: string, description: string) => {
    if (updateTask) {
      updateTask(id, { title, description });
    }
    closeEditor();
  };
  const handleClickDelete = () => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  return (
    <div className={classes.task}>
      <div className={classes.taskHeader}>
        <Typography>{title}</Typography>

        <OptionsPopper>
          <TaskOptions
            onClickEdit={openEditor}
            onClickDelete={handleClickDelete}
          />
        </OptionsPopper>
      </div>

      {isEditorOpen &&
        <Dialog open={isEditorOpen}>
          <Paper className={classes.dialog}>
            <TaskEditorForm
              title={title}
              description={description}
              onSubmit={handleSubmitEdit}
              onCancel={closeEditor}
            />
          </Paper>
        </Dialog>
      }

      <div>
        {Comments &&
        <Comments taskId={id} ids={rootCommentIds}/>
        }
      </div>
    </div>
  );
}

