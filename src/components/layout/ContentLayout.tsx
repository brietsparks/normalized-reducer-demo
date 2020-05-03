import React, { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { StateViewer } from '../state-viewer';
import { useStyles } from './styles';

export interface Props {
  main?: ReactNode | null,
  state?: any,
  stateName?: string,
}

export default function ContentLayout({
  main = null,
  state,
  stateName
}: Props) {
  const classNames = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Container className={classNames.scrollable}>
          <div className={classNames.main}>
            {main}
          </div>
        </Container>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div className={classNames.scrollable}>
          <StateViewer state={state} name={stateName}/>
        </div>
      </Grid>
    </Grid>
  );
}
