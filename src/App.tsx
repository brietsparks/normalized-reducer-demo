import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
// import Example from './components/card/Example';
import Create from './examples-basic/create';
import AttachDetach from './examples-basic/attach-detach';
// import CompositeTree from './examples-advanced/composite-tree';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>

      <Create.Basic/>
      <Create.WithIndex/>
      <AttachDetach.ManyToMany/>
      <AttachDetach.OneToOne/>
      <AttachDetach.OneToMany/>

      {/*<KanbanApp/>*/}
      {/*<CompositeTree/>*/}
    </MuiThemeProvider>
  );
};

export default App;
