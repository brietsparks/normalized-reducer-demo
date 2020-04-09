import React, { ComponentType } from 'react';
import Typography from '@material-ui/core/Typography';
import { Draggable, DraggableProvided, Droppable, DroppableProvided, } from 'react-beautiful-dnd';

import { Id } from '../../model';
import { useStyles } from './styles';

export interface Props {
  id: Id,
  title: string,
  boardId: Id,
  taskIds?: Id[],
  Task: ComponentType<TaskProps>
}

export interface TaskProps {
  statusId: Id,
  id: Id,
}

export default function Status({ id, title, boardId, taskIds = [], Task }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.status}>
      <Typography>{title}</Typography>

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
