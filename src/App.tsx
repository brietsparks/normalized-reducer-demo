import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
import { Router } from './nav';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Router/>
    </MuiThemeProvider>
  );
};

export default App;
