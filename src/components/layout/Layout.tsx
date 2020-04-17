import React, { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { StateViewer } from '../state-viewer';
import { Links } from '../../nav';
import { useStyles } from './styles';

export interface Props {
  sidebar?: ReactNode|null,
  main?: ReactNode|null,
  state?: any,
  stateName?: string,
}

export default function Layout({
  sidebar = <Links/>,
  main = null,
  state,
  stateName
}: Props) {
  const classNames = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={2}>
        <div className={classNames.scrollable}>
          {sidebar}
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Container className={classNames.scrollable}>
          {main}
        </Container>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div className={classNames.scrollable}>
          <StateViewer state={state} name={stateName} />
        </div>
      </Grid>
    </Grid>
  );
}
