import React from 'react';
import { Id } from 'normalized-reducer';
import { Card as CardPresentation } from '../../components/card';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { useAttachDetachStyles } from './styles';

export interface Props {
  id: Id,
  text: string,
  isSelected?: boolean,
  attached?: Id[]|Id,
  selectedRelatedId?: Id,
  select: (id: Id) => void,
  deselect: () => void
  attach: (id: Id, attachableId: Id) => void,
  detach: (id: Id, detachableId: Id) => void,
  checkboxSide: 'left'|'right',
}

export default function Card({
  id,
  text,
  isSelected,
  attached,
  selectedRelatedId,
  select,
  deselect,
  attach,
  detach,
  checkboxSide
}: Props) {
  let isAttachedToSelected: boolean = false;
  if (selectedRelatedId) {
    if (typeof attached === 'string') {
      isAttachedToSelected = selectedRelatedId === attached;
    }

    if (Array.isArray(attached)) {
      isAttachedToSelected = Boolean(selectedRelatedId && attached?.includes(selectedRelatedId))
    }
  }

  const handleCheckboxChange = (e: any, value: boolean) => {
    if (selectedRelatedId) {
      value
        ? attach(id, selectedRelatedId)
        : detach(id, selectedRelatedId);
    }
  };

  const checkboxProps = {
    [checkboxSide]: (
      <Checkbox
        checked={isAttachedToSelected}
        onChange={handleCheckboxChange}
      />
    ),
    [checkboxSide === 'left' ? 'isLeftShown' : 'isRightShown']: !!selectedRelatedId
  };


  return (
    <CardPresentation
      key={id}
      body={
        <CardBody
          id={id}
          text={text}
          ids={attached}
          isSelected={isSelected}
          isAttachedToSelected={isAttachedToSelected}
        />
      }
      onSelect={() => select(id)}
      onDeselect={deselect}
      isSelectable
      isSelected={isSelected}
      {...checkboxProps}
    />
  )
}


interface CardBodyProps {
  id: Id,
  text: string,
  ids?: Id[]|Id,
  isSelected?: boolean,
  isAttachedToSelected?: boolean,
}
function CardBody({
  id,
  text,
  ids,
  isSelected,
  isAttachedToSelected,
}: CardBodyProps) {
  const classes = useAttachDetachStyles({ isSelected, isAttachedToSelected });

  return (
    <div>
      <Typography variant="caption" className={classes.cardId}>{id}</Typography>
      <Typography>{text}</Typography>

      <div className={classes.cardAttached}>
        <Typography variant="caption">Attached Ids:</Typography>
        <pre className={classes.cardAttachedIds}>{JSON.stringify(ids)}</pre>
      </div>
    </div>
  );
}
