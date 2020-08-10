import React, { ReactNode, MouseEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { useStyles } from './styles';

export interface Props {
  body: ReactNode|string,
  left?: ReactNode,
  right?: ReactNode,
  isLeftShown?: boolean,
  isRightShown?: boolean,
  isSelectable?: boolean,
  isSelected?: boolean,
  onSelect?: () => void,
  onDeselect?: () => void,
  deletable?: boolean,
}

export default function Card({
  body,
  left,
  right,
  isLeftShown = true,
  isRightShown = true,
  isSelectable,
  isSelected,
  onSelect,
  onDeselect,
  deletable,
}: Props) {
  const classes = useStyles({ isSelectable, isSelected });

  const handleClick = () => {
    if (isSelectable && !isSelected && onSelect) {
      onSelect();
    }
  };

  return (
    <Grid container>
      {left && (
        <Grid item xs={2} className={classes.left}>
          <div>{isLeftShown && left}</div>
        </Grid>
      )}

      <Grid
        item
        xs={(left || right || deletable) ? (left && right ? 8 : 10) : 12}
        className={classes.cardBody}
      >
        <Paper className={classes.cardWrapper} onClick={handleClick}>
          {typeof body === 'string' ? <Typography>{body}</Typography> : body}
        </Paper>
      </Grid>

      {right && (
        <Grid item xs={2}><div>{isRightShown && right}</div></Grid>
      )}
    </Grid>
  );
}

export interface CardContainerProps {
  children: ReactNode
}

export function CardsContainer({ children }: CardContainerProps) {
  const classes = useStyles();

  return (
    <div>
      {React.Children.map(children, (child, index) => {
        return (
          <div className={classes.cardContainer}>{child}</div>
        )
      })}
    </div>
  );
}
