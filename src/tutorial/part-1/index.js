import React, { useReducer, createContext, useContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import makeNormalizedSlice from 'normalized-reducer';

import { randomNumber } from '../util';
import schema from '../schema';
import styles from '../styles';
import theme from '../../theme';

const {
  emptyState,
  actionCreators,
  reducer,
  selectors,
  actionTypes,
} = makeNormalizedSlice(schema);

const ModelContext = createContext();

function Store({ children }) {
  const [state, dispatch] = useReducer(reducer, emptyState);
  console.log(state);
  const value = { state, dispatch }
  return (
    <ModelContext.Provider value={value}>
      {children}
    </ModelContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={styles.container}>
        <Store>
          <Profiles/>
        </Store>
      </Container>
    </ThemeProvider>
  );
}

function Profiles() {
  const { state, dispatch } = useContext(ModelContext);
  const ids = selectors.getIds(state, { type: 'profile' });

  const createProfile = () => {
    const id = randomNumber();
    dispatch(actionCreators.create('profile', id, { id }));
  }

  return (
    <div>
      <Button onClick={createProfile} color="primary">New Profile</Button>

      <div style={styles.profilesInner}>
        {ids.map(id => (
          <Card key={id} style={styles.card}>
            {id}
          </Card>
        ))}
      </div>
    </div>
  );
}
