import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
// import Example from './components/card/Example';
// import Example from './examples-basic/create';
// import AttachDetach from './examples-basic/attach-detach';
import { KanbanApp } from './example-app/kanban-app';
import CompositeTree from './examples-advanced/composite-tree';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <KanbanApp/>
      {/*<CompositeTree/>*/}
    </MuiThemeProvider>
  );
};

export default App;
