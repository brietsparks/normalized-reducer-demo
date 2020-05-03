import React, { ReactNode } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import theme from '../../theme';

export interface Props {
  sidebar?: ReactNode|null,
  main?: ReactNode|null,
}

export default function ContentLayout({
  sidebar = null, // todo
  main = null,
}: Props) {
  const classNames = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container>
        <Grid item xs={12} sm={2}>
          <div className={`${classNames.scrollable} ${classNames.sidebar}`}>
            <div>
              <Paper>{sidebar}</Paper>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={10}>
          {main}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
