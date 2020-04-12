import React, { ComponentType, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DragIndicator from '@material-ui/icons/DragIndicator';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
} from 'react-beautiful-dnd';

import { Id } from '../../model';
import { StatusEditorForm } from '../status';

import { useStyles } from './styles';

export interface Props {
  id: Id,
  title: string,
  statusIds?: Id[],
  Status: ComponentType<StatusProps>
  createStatus?: (status: {boardId: Id, title: string}) => void,
  moveStatus?: (boardId: Id, src: number, dest: number) => void,
  moveTask?: (taskId: Id, srcStatusId: Id, src: number, destStatusId: Id, dest: number) => void,
}

export interface StatusProps {
  boardId: Id,
  id: Id,
}

export default function Board({
  id,
  title,
  statusIds = [],
  Status,
  createStatus,
  moveStatus,
  moveTask,
}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const classes = useStyles();

  const handleSubmitNewStatus = (title: string) => {
    if (createStatus) {
      createStatus({ boardId: id, title });
    }
    setIsFormOpen(false);
  };

  const handleCancelNewStatus = () => setIsFormOpen(false);

  const handleDragEnd = ({ type, source, destination, draggableId }: DropResult) => {
    if (source && destination) {
      if (type === 'status' && moveStatus) {
        moveStatus(id, source.index, destination.index);
      }

      if (type === 'task' && moveTask) {
        moveTask(
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
      }
    }

  };

  return (
    <div className={classes.board}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Typography>
          {title}
          <Button
            color="primary"
            onClick={() => setIsFormOpen(true)}
          >Add Column</Button>
        </Typography>

        {createStatus && (
          <Dialog open={isFormOpen}>
            <Paper className={classes.dialog}>
              <StatusEditorForm
                onSubmit={handleSubmitNewStatus}
                onCancel={handleCancelNewStatus}
              />
            </Paper>
          </Dialog>
        )}

        <Droppable type="status" droppableId={id.toString()} direction="horizontal">
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className={classes.lanes}>
                {statusIds.map((statusId, index) => (
                  <Draggable key={statusId} draggableId={statusId.toString()} index={index}>
                    {(provided: DraggableProvided) => {
                      return (
                        <Paper
                          elevation={0}
                          className={classes.lane}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <span {...provided.dragHandleProps} className={classes.dragHandle}>
                            <DragIndicator fontSize="small" />
                          </span>
                          <Status boardId={id} id={statusId} />
                        </Paper>
                      )
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
