import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderClosedIcon from '@material-ui/icons/Folder';
import FolderOpenedIcon from '@material-ui/icons/FolderOpen';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import InputAdornment from '@material-ui/core/InputAdornment';
import NewFileIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import OptionsIcon from '@material-ui/icons/MoreHoriz';
import normalizedSlice, { Id, State as BaseState } from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { randomString } from '../../util';
import { useStyles } from './styles';
import './override.css';

export interface Directory {
  id: Id;
  name: string;
  parentDirectoryId?: Id,
  childDirectoryIds?: Id[];
  fileIds?: Id[];
}

export interface File {
  id: Id,
  name: string;
  directoryId: Id
}

const schema = {
  directory: {
    parentDirectoryId: {
      type: 'directory',
      cardinality: 'one',
      reciprocal: 'childDirectoryIds'
    },
    childDirectoryIds: {
      type: 'directory',
      cardinality: 'many',
      reciprocal: 'parentDirectoryId'
    },
    fileIds: {
      type: 'file',
      cardinality: 'many',
      reciprocal: 'directoryId'
    }
  },
  file: {
    directoryId: {
      type: 'directory',
      cardinality: 'one',
      reciprocal: 'fileIds'
    }
  }
};

export interface State extends BaseState {
  entities: {
    directory: Record<Id, Directory>,
    file: Record<Id, File>,
  },
  ids: {
    directory: Id[],
    file: Id[],
  }
}

export const {
  emptyState,
  actionCreators,
  reducer,
  selectors,
  actionTypes,
} = normalizedSlice(schema);

const initialState: State = {
  entities: {
    directory: {
      'd1': {
        id: 'd1', name: 'Directory 1',
        childDirectoryIds: ['d1.1'], fileIds: ['f1'],
      },
      'd1.1': {
        id: 'd1.1', name: 'Directory 1.1',
        parentDirectoryId: 'd1', childDirectoryIds: ['d1.1.1'], fileIds: ['f2', 'f3']
      },
      'd1.1.1': {
        id: 'd1.1', name: 'Directory 1.1.1',
        parentDirectoryId: 'd1.1', childDirectoryIds: [], fileIds: ['f4']
      },
      'g2': {
        id: 'd1', name: 'Directory 2',
        childDirectoryIds: [], fileIds: ['f5'],
      }
    },
    file: {
      'f1': { id: 'f1', name: 'File 1', directoryId: 'd1' },
      'f2': { id: 'f2', name: 'File 2', directoryId: 'd1.1' },
      'f3': { id: 'f3', name: 'File 3', directoryId: 'd1.1' },
      'f4': { id: 'f4', name: 'File 4', directoryId: 'd1.1.1' },
      'f5': { id: 'f5', name: 'File 5', directoryId: 'g2' },
    }
  },
  ids: {
    directory: ['d1', 'd1.1', 'd1.1.1', 'g2'],
    file: ['f1', 'f2', 'f3', 'f4', 'f5']
  }
};

const getTopLevelDirectoryIds = (state: State) => {
  const ids = selectors.getIds(state, { type: 'directory' });
  return ids.filter((id: Id) => {
    const directory = selectors.getEntity<Directory>(state, { type: 'directory', id });
    return !!directory && !directory.parentDirectoryId;
  });
};

const store = createStore(reducer, initialState);

export default function Example() {
  return (
    <Provider store={store}>
      <TopLevelDirectoryNodes/>
    </Provider>
  );
}

function TopLevelDirectoryNodes() {
  const topLevelIds = useSelector<State, Id[]>(state => getTopLevelDirectoryIds(state));
  const state = useSelector(state => state);

  const dispatch = useDispatch();
  const createTopLevelDirectory = (name: string) => {
    const id = randomString();
    dispatch(actionCreators.create('directory', id, { name }));
  };

  const main = (
    <div>
      {topLevelIds.map(id => (
        <DirectoryNode key={id} id={id}/>
      ))}

      <Form onSubmit={createTopLevelDirectory} placeholder="New Top Level Folder"/>
    </div>
  );

  return (
    <Layout
      main={main}
      state={state}
    />
  )
}

interface DirectoryCardProps {
  id: Id,
}

function DirectoryNode({ id }: DirectoryCardProps) {
  const directory = useSelector<State, Directory | undefined>(state => selectors.getEntity<Directory>(state, {
    type: 'directory',
    id
  }));

  const [isOpen, setIsOpen] = useState(!directory?.parentDirectoryId);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const showOptions = () => setIsOptionsShown(true);
  const hideOptions = () => setIsOptionsShown(false);

  const [isFileFormShown, setIsFileFormShown] = useState(false);
  const [isDirectoryFormShown, setIsDirectoryFormShown] = useState(false);
  const showFileForm = () => {
    setIsFileFormShown(true);
    setIsDirectoryFormShown(false);
    setIsOptionsShown(false);
  };
  const showDirectoryForm = () => {
    setIsDirectoryFormShown(true);
    setIsFileFormShown(false);
    setIsOptionsShown(false);
  };
  const hideFileForm = () => setIsFileFormShown(false);
  const hideDirectoryForm = () => setIsDirectoryFormShown(false);

  const hideFormAndOptions = () => {
    hideFileForm();
    hideDirectoryForm();
    hideOptions();
  };

  const dispatch = useDispatch();

  const classNames = useStyles();

  const createChildDirectory = (name: string) => {
    const childId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('directory', childId, { name }),
      actionCreators.attach('directory', childId, 'parentDirectoryId', id)
    ));
    hideFormAndOptions();
  };
  const createFile = (name: string) => {
    const fileId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('file', fileId, { name }),
      actionCreators.attach('file', fileId, 'directoryId', id)
    ));
    hideFormAndOptions();
  };

  if (!directory) {
    return null;
  }

  return (
    <div>
      <div className={classNames.nodeLine}>
        {!isOpen &&
        <IconButton onClick={open}><FolderClosedIcon/></IconButton>
        }

        {isOpen &&
        <IconButton onClick={close}><FolderOpenedIcon/></IconButton>
        }

        <Typography>{directory.name}</Typography>
      </div>

      {isOpen &&
      <div className={classNames.nodeChildren}>
        <div className={classNames.options}>
          <span>
            <IconButton onClick={showOptions}><OptionsIcon/></IconButton>
          </span>

          {(isOptionsShown || isDirectoryFormShown || isFileFormShown) &&
          <ClickAwayListener onClickAway={hideFormAndOptions}>
            <div>
              {isOptionsShown &&
              <span>
                <IconButton onClick={showDirectoryForm}><NewFolderIcon/></IconButton>
                <IconButton onClick={showFileForm}><NewFileIcon/></IconButton>
              </span>
              }

              {isDirectoryFormShown &&
              <Form onSubmit={createChildDirectory} placeholder="New Folder:" autoFocus={true}/>
              }

              {isFileFormShown &&
              <Form onSubmit={createFile} placeholder="New File:" autoFocus={true}/>
              }
            </div>
          </ClickAwayListener>
          }
        </div>

        <div>
          {directory.fileIds?.map(fileId => (
            <FileNode key={fileId} id={fileId}/>
          ))}
        </div>
        <div>
          {directory.childDirectoryIds?.map(childDirectoryId => (
            <DirectoryNode key={childDirectoryId} id={childDirectoryId}/>
          ))}
        </div>
      </div>
      }
    </div>
  );
}

interface FileNodeProps {
  id: Id
}

function FileNode({ id }: FileNodeProps) {
  const file = useSelector<State, File | undefined>(state => selectors.getEntity<File>(state, { type: 'file', id }));

  const classNames = useStyles();

  if (!file) {
    return null;
  }

  return (
    <div className={`${classNames.nodeLine} directory-file`}>
      <FileIcon/>
      <Typography>{file.name}</Typography>
    </div>
  );
}

interface FormProps {
  onSubmit: (name: string) => void,
  placeholder: string,
  autoFocus?: boolean,
}

function Form({ onSubmit, placeholder, autoFocus }: FormProps) {
  const [name, setName] = useState('');
  const cleanName = name.trim();

  const handleClickSubmit = () => {
    if (cleanName) {
      onSubmit(cleanName);
      setName('');
    }
  };

  return (
    <div>
      <TextField
        autoFocus={autoFocus}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickSubmit} color="primary" disabled={!cleanName}>
                <AddIcon/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
