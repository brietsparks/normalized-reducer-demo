import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
// import Example from './components/card/Example';
import Create from './demo-actions/create';
import AttachDetach from './demo-actions/attach-detach';
import { Update } from './demo-actions/update';
import Delete from './demo-actions/delete';
import { Move } from './demo-actions/move';
import { MoveAttached } from './demo-actions/move-attached';
import { Sort } from './demo-actions/sort';
import { SortAttached } from './demo-actions/sort-attached';
import { SetState }  from './demo-actions/set-state';

import { NodeTree } from './example-features/node-tree';
import { BatchActions } from './demo-actions/batch-actions';
// import CompositeTree from './examples-advanced/composite-tree';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>

      <NodeTree/>

      <Create.Basic/>
      <Create.WithIndex/>
      <Update/>
      <Move/>
      <Delete.Basic/>
      <AttachDetach.ManyToMany/>
      <AttachDetach.OneToOne/>
      <AttachDetach.OneToMany/>
      <MoveAttached/>
      <Delete.WithAttachments/>
      <Sort/>
      <SortAttached/>
      <BatchActions/>
      <SetState/>

      {/*<KanbanApp/>*/}
      {/*<CompositeTree/>*/}
    </MuiThemeProvider>
  );
};

export default App;
