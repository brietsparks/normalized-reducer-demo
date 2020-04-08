import React, { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { StateViewer } from '../state-viewer';

export interface Props {
  sidebar?: ReactNode|null,
  main?: ReactNode|null,
  state?: any,
  stateName?: string,
}

export default function Layout({
  sidebar = null,
  main = null,
  state,
  stateName
}: Props) {
  return (
    <Grid container>
      <Grid item sm={2}>
        {sidebar}
      </Grid>

      <Grid item sm={6}>
        <Container style={{ height: '100vh', overflowY: 'scroll' }}>
          {main}
        </Container>
      </Grid>

      <Grid item sm={4}>
        <div style={{ height: '100vh', overflowY: 'scroll' }}>
          <StateViewer state={state} name={stateName} />
        </div>
      </Grid>
    </Grid>
  );
}
