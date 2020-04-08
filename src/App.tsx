import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// import Example from './components/card/Example';
// import Example from './examples-basic/create';
// import AttachDetach from './examples-basic/attach-detach';
import { KanbanApp } from './example-app/kanban-app';

const App: React.FC = () => {
  return (
    <div>
      <KanbanApp/>
    </div>
  );
};

export default App;
