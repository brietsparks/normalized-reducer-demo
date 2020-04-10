import React, { ComponentType, useState } from 'react';
import Typography from '@material-ui/core/Typography';
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

  const handleSubmitNewTask = (title: string, description?: string) => {
    if (createTask && creatorId) {
      createTask({ title, description, statusId: id, creatorId });
    }
    setIsFormOpen(false);
  };

  const handleCancelNewTask = () => setIsFormOpen(false);

  return (
    <div className={`${classes.status} board-status`}>
      <Typography align="center">{title}</Typography>

      {createTask && creatorId && (
        <div>
          {isFormOpen
            ? <TaskEditorForm onSubmit={handleSubmitNewTask} onCancel={handleCancelNewTask} />
            : <button onClick={() => setIsFormOpen(true)}>+ Add</button>
          }
        </div>
      )}

      <Droppable type="task" droppableId={id.toString()}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.tasks}>
              {taskIds.map((taskId, index) => (
                <Draggable key={taskId} draggableId={taskId.toString()} index={index}>
                  {(provided: DraggableProvided) => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <span {...provided.dragHandleProps}>=</span>
                        <Task statusId={id} id={taskId}/>
                      </div>
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
