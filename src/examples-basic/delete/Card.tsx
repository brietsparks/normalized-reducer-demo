import React from 'react';
import { Id } from 'normalized-reducer';
import { Card as CardPresentation } from '../../components/card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';


import { useStyles } from './styles';

export interface Props {
  id: Id,
  text?: string,
  attached?: Id[] | Id,
  delete: (id: Id) => void,
}

export default function Card({
  id,
  text,
  attached,
  delete: del,
}: Props) {
  const handleClickDelete = () => del(id);

  return (
    <CardPresentation
      key={id}
      isSelectable={false}
      body={
        <CardBody
          id={id}
          text={text}
          ids={attached}
          onClickDelete={handleClickDelete}
        />
      }
    />
  )
}


interface CardBodyProps {
  id: Id,
  text?: string,
  ids?: Id[] | Id,
  onClickDelete: () => void;
}

function CardBody({
  id,
  text,
  ids,
  onClickDelete,
}: CardBodyProps) {
  const classes = useStyles();

  return (
    <div className={classes.cardBody}>
      <div>
        <Typography variant="caption">{id}</Typography>
        <Typography>{text}</Typography>

        <div className={classes.cardAttached}>
          <Typography variant="caption">Attached Ids:</Typography>
          <pre className={classes.cardAttachedIds}>{ids ? JSON.stringify(ids) : " "}</pre>
        </div>
      </div>

      <div>
        <IconButton onClick={onClickDelete}>
          <DeleteIcon/>
        </IconButton>
      </div>
    </div>
  );
}
