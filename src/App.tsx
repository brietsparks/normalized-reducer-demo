import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
// import Example from './components/card/Example';
import Create from './examples-basic/create';
import AttachDetach from './examples-basic/attach-detach';
import { Update } from './examples-basic/update';
import Delete from './examples-basic/delete';
import { Move } from './examples-basic/move';
// import CompositeTree from './examples-advanced/composite-tree';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>

      <Create.Basic/>
      <Create.WithIndex/>
      <Update/>
      <Move/>
      <Delete.Basic/>
      <AttachDetach.ManyToMany/>
      <AttachDetach.OneToOne/>
      <AttachDetach.OneToMany/>

      {/*<KanbanApp/>*/}
      {/*<CompositeTree/>*/}
    </MuiThemeProvider>
  );
};

export default App;
