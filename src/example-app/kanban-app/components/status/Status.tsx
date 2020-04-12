import React, { ComponentType, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';

import { Id } from '../../model';
import { TaskEditorForm } from '../task';
import { useStyles } from './styles';
import './styles.css';

export interface Props {
  id: Id,
  title: string,
  boardId: Id,
  taskIds?: Id[],
  creatorId?: Id,
  Task: ComponentType<TaskProps>,
  createTask?: (task: { title: string, description?: string, statusId: Id, creatorId: Id }) => void,
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
  createTask,
}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const classes = useStyles();
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleSubmitNewTask = (title: string, description?: string) => {
    if (createTask && creatorId) {
      createTask({ title, description, statusId: id, creatorId });
    }
    closeForm();
  };

  return (
    <div className={`${classes.status} board-status`}>
      <div className={classes.statusHeader}>
        <Typography align="center" className={classes.statusTitle}>{title}</Typography>

        <div className={classes.buttons}>
          <IconButton size="small" onClick={openForm}>
            <AddIcon fontSize="small" />
          </IconButton>

          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className={classes.form}>
        {isFormOpen && (
          <TaskEditorForm onSubmit={handleSubmitNewTask} onCancel={closeForm}/>
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
