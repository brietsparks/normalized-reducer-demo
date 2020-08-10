import React, { useReducer, createContext, useContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';
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
        {ids.map((id, index) => (
          <Card key={id} style={styles.card}>
            <Profile id={id} index={index} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function Profile({ id, index }) {
  const { state, dispatch } = useContext(ModelContext);

  const profile = selectors.getEntity(state, { type: 'profile', id });
  if (!profile) {
    return null;
  }

  const handleChangeName = e => {
    dispatch(actionCreators.update('profile', id, { name: e.target.value }))
  }

  const handleMoveUp = () => {
    dispatch(actionCreators.move('profile', index, index - 1));
  }

  const handleMoveDown = () => {
    dispatch(actionCreators.move('profile', index, index + 1));
  }

  const handleDelete = () => {
    dispatch(actionCreators.delete('profile', id, { bookmarkIds: {} }));
  }

  return (
    <div>
      <div style={styles.profile}>
        <div style={styles.profileMoveButtons}>
          <IconButton onClick={handleMoveUp}><UpIcon/></IconButton>
          <IconButton onClick={handleMoveDown}><DownIcon/></IconButton>
        </div>

        <div style={styles.profileName}>
          <TextField
            autoFocus
            fullWidth
            placeholder={`Profile: (ID ${id})`}
            value={profile.name || ''}
            onChange={handleChangeName}
          />

          <Bookmarks profileId={id} bookmarkIds={profile.bookmarkIds} />
        </div>

        <div>
          <IconButton
            onClick={handleDelete}
            color="secondary"
          ><DeleteIcon/></IconButton>
        </div>
      </div>
    </div>
  );
}

function Bookmarks({ profileId, bookmarkIds = [] }) {
  const { dispatch } = useContext(ModelContext);

  const createBookmark = () => {
    const bookmarkId = randomNumber();
    dispatch(actionCreators.create('bookmark', bookmarkId, { id: bookmarkId }));
    dispatch(actionCreators.attach('bookmark', bookmarkId, 'profileId', profileId));
  }

  return (
    <div>
      <Button onClick={createBookmark} color="primary">New Bookmark</Button>

      {bookmarkIds.map((id, index) =>
        <Bookmark key={id} profileId={profileId} id={id} index={index} />
      )}
    </div>
  );
}

function Bookmark({ profileId, id, index }) {
  const { state, dispatch } = useContext(ModelContext);
  const bookmark = selectors.getEntity(state, { type: 'bookmark', id });
  if (!bookmark) {
    return null;
  }

  const handleChangeUrl = e => {
    dispatch(actionCreators.update('bookmark', id, { url: e.target.value }))
  }

  const handleMoveUp = () => {
    dispatch(actionCreators.moveAttached('profile', profileId, 'bookmarkIds', index, index - 1));
  }

  const handleMoveDown = () => {
    dispatch(actionCreators.moveAttached('profile', profileId, 'bookmarkIds', index, index + 1));
  }

  const handleDelete = () => {
    dispatch(actionCreators.delete('bookmark', id));
  }

  return (
    <div style={styles.bookmark}>
      <div style={styles.bookmarkMoveButtons}>
        <IconButton onClick={handleMoveUp} size="small">
          <UpIcon fontSize="small"/>
        </IconButton>
        <IconButton onClick={handleMoveDown} size="small">
          <DownIcon fontSize="small"/>
        </IconButton>
      </div>

      <TextField
        autoFocus
        fullWidth
        placeholder={`URL: (ID ${id})`}
        value={bookmark.url || ''}
        onChange={handleChangeUrl}
      />

      <div>
        <IconButton
          onClick={handleDelete}
          color="secondary"
          size="small"
        ><DeleteIcon fontSize="small"/></IconButton>
      </div>
    </div>
  );
}
