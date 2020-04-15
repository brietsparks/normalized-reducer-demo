import normalizedSlice, { Id, State as BaseState } from 'normalized-reducer';
import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FileIcon from '@material-ui/icons/InsertDriveFile';

import { randomString } from '../../util';

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
    parentDirectoryId: { type: 'directory', cardinality: 'one', reciprocal: 'childDirectoryIds' },
    childDirectoryIds: { type: 'directory', cardinality: 'many', reciprocal: 'parentDirectoryId' },
    fileIds: { type: 'file', cardinality: 'many', reciprocal: 'directoryId' }
  },
  file: {
    directoryId: { type: 'directory', cardinality: 'one', reciprocal: 'fileIds' }
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

const getRootDirectoryIds = (state: State) => {
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
      <RootDirectoryNodes/>
    </Provider>
  );
}

function RootDirectoryNodes() {
  const rootIds = useSelector<State, Id[]>(state => getRootDirectoryIds(state));

  const dispatch = useDispatch();
  const createRootDirectory = (name: string) => {
    const id = randomString();
    dispatch(actionCreators.create('directory', id, { name }));
  };

  return (
    <div>
      {rootIds.map(id => (
        <DirectoryNode key={id} id={id}/>
      ))}

      <Form onSubmit={createRootDirectory} type="Directory"/>
    </div>
  );
}

interface DirectoryCardProps {
  id: Id,
}

function DirectoryNode({ id }: DirectoryCardProps) {
  const directory = useSelector<State, Directory | undefined>(state => selectors.getEntity<Directory>(state, {
    type: 'directory',
    id
  }));

  const dispatch = useDispatch();
  const createChildDirectory = (name: string) => {
    const childId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('directory', childId, { name }),
      actionCreators.attach('directory', childId, 'parentDirectoryId', id)
    ));
  };
  const createFile = (name: string) => {
    const fileId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('file', fileId, { name }),
      actionCreators.attach('file', fileId, 'directoryId', id)
    ));
  };

  if (!directory) {
    return null;
  }

  return (
    <div>
      <p>{directory.name}</p>

      <div>
        <div>
          {directory.fileIds?.map(fileId => (
            <FileCard key={fileId} id={fileId}/>
          ))}
          <Form onSubmit={createFile} type="File"/>
        </div>

        <div>
          {directory.childDirectoryIds?.map(childDirectoryId => (
            <DirectoryNode key={childDirectoryId} id={childDirectoryId}/>
          ))}
          <Form onSubmit={createChildDirectory} type="Directory"/>
        </div>
      </div>
    </div>
  );
}

interface FileCardProps {
  id: Id
}

function FileCard({ id }: FileCardProps) {
  const file = useSelector<State, File | undefined>(state => selectors.getEntity<File>(state, { type: 'file', id }));

  if (!file) {
    return null;
  }

  return (
    <div>
      <p>{file.name}</p>
    </div>
  );
}

interface FormProps {
  onSubmit: (name: string) => void,
  type: string
}

function Form({ onSubmit, type }: FormProps) {
  const [name, setName] = useState('');

  const handleClickSubmit = () => {
    onSubmit(name);
    setName('');
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={`Add ${type}:`}
      />
      <button
        onClick={handleClickSubmit}
        disabled={!name}
      >+ {type}</button>
    </div>
  );
}
