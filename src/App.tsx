import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
// import Example from './components/card/Example';
// import Example from './examples-basic/create';
import AttachDetach from './examples-basic/attach-detach';
// import CompositeTree from './examples-advanced/composite-tree';
import Example from './A';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>

      {/*<Example/>*/}

      <AttachDetach.ManyToMany/>
      <AttachDetach.OneToOne/>
      <AttachDetach.OneToMany/>

      {/*<KanbanApp/>*/}
      {/*<CompositeTree/>*/}
    </MuiThemeProvider>
  );
};

export default App;
