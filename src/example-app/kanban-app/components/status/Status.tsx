import React, { ComponentType, useState } from 'react';
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';

import { Id } from '../../model';
import { TaskEditorForm } from '../task';
import { OptionsPopper } from '../options-popper';
import { useStyles } from './styles';
import StatusOptions from './StatusOptions';
import StatusEditorForm from './StatusEditorForm';
import './styles.css';

export interface Props {
  id: Id,
  title: string,
  boardId: Id,
  taskIds?: Id[],
  creatorId?: Id,
  Task: ComponentType<TaskProps>,
  updateStatus: (id: Id, status: { title?: string }) => void,
  createTask?: (task: { title: string, description?: string, statusId: Id, creatorId: Id }) => void,
  deleteTask?: (id: Id) => void,
}

export interface TaskProps {
  statusId: Id,
  id: Id,
}

export default function Status({
  id,
  title, boardId,
  taskIds = [],
  Task,
  creatorId,
  updateStatus,
  createTask,
  deleteTask,
}: Props) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const openTaskForm = () => setIsTaskFormOpen(true);
  const closeTaskForm = () => setIsTaskFormOpen(false);

  const [isStatusEditorOpen, setIsStatusEditorOpen] = useState(false);
  const openStatusEditor = () => setIsStatusEditorOpen(true);
  const closeStatusEditor = () => setIsStatusEditorOpen(false);

  const handleSubmitNewTask = (title: string, description?: string) => {
    if (createTask && creatorId) {
      createTask({ title, description, statusId: id, creatorId });
    }
    closeTaskForm();
  };

  const handleSubmitEditStatus = (title: string) => {
    if (updateStatus) {
      updateStatus(id, { title })
    }
    closeStatusEditor();
  };

  const handleClickDelete = () => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  const classes = useStyles();

  return (
    <div className={`${classes.status} board-status`}>
      <div className={classes.statusHeader}>
        <Typography align="center" className={classes.statusTitle}>{title}</Typography>

        <div className={classes.buttons}>
          <IconButton onClick={openTaskForm}>
            <AddIcon />
          </IconButton>

          <OptionsPopper>
            <StatusOptions
              onClickEdit={openStatusEditor}
              onClickDelete={handleClickDelete}
            />
          </OptionsPopper>
        </div>

        <Dialog open={isStatusEditorOpen}>
          <Paper className={classes.editorDialog}>
            <StatusEditorForm
              title={title}
              onSubmit={handleSubmitEditStatus}
              onCancel={closeStatusEditor}
            />
          </Paper>
        </Dialog>
      </div>

      <div className={classes.form}>
        {isTaskFormOpen && (
          <TaskEditorForm onSubmit={handleSubmitNewTask} onCancel={closeTaskForm}/>
        )}
      </div>

      <Droppable type="task" droppableId={id.toString()}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.tasks}>
              {taskIds.map((taskId, index) => (
                <Draggable key={taskId} draggableId={taskId.toString()} index={index}>
                  {(provided: DraggableProvided) => {
                    return (
                      <Paper
                        className={classes.task}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Task statusId={id} id={taskId}/>
                      </Paper>
                    )
                  }}
                </Draggable>
              ))}
            </div>
          )
        }}
      </Droppable>
    </div>
  );
}
