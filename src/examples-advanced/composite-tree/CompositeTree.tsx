import normalizedSlice, { Id, State as BaseState } from 'normalized-reducer';
import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { randomString } from '../../util';

export interface Group {
  id: Id;
  name: string;
  parentGroupId?: Id,
  childGroupIds?: Id[];
  itemIds?: Id[];
}

export interface Item {
  id: Id,
  name: string;
  groupId: Id
}

const schema = {
  group: {
    parentGroupId: { type: 'group', cardinality: 'one', reciprocal: 'childGroupIds' },
    childGroupIds: { type: 'group', cardinality: 'many', reciprocal: 'parentGroupId' },
    itemIds: { type: 'item', cardinality: 'many', reciprocal: 'groupId' }
  },
  item: {
    groupId: { type: 'group', cardinality: 'one', reciprocal: 'itemIds' }
  }
};

export interface State extends BaseState {
  entities: {
    group: Record<Id, Group>,
    item: Record<Id, Item>,
  },
  ids: {
    group: Id[],
    item: Id[],
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
    group: {
      'g1': {
        id: 'g1', name: 'Group 1',
        childGroupIds: ['g1.1'], itemIds: ['i1'],
      },
      'g1.1': {
        id: 'g1.1', name: 'Group 1.1',
        parentGroupId: 'g1', childGroupIds: ['g1.1.1'], itemIds: ['i2', 'i3']
      },
      'g1.1.1': {
        id: 'g1.1', name: 'Group 1.1.1',
        parentGroupId: 'g1.1', childGroupIds: [], itemIds: ['i4']
      },
      'g2': {
        id: 'g1', name: 'Group 2',
        childGroupIds: [], itemIds: ['i5'],
      }
    },
    item: {
      'i1': { id: 'i1', name: 'Item 1', groupId: 'g1' },
      'i2': { id: 'i2', name: 'Item 2', groupId: 'g1.1' },
      'i3': { id: 'i3', name: 'Item 3', groupId: 'g1.1' },
      'i4': { id: 'i4', name: 'Item 4', groupId: 'g1.1.1' },
      'i5': { id: 'i5', name: 'Item 5', groupId: 'g2' },
    }
  },
  ids: {
    group: ['g1', 'g1.1', 'g1.1.1', 'g2'],
    item: ['i1', 'i2', 'i3', 'i4', 'i5']
  }
};

const getRootGroupIds = (state: State) => {
  const ids = selectors.getIds(state, { type: 'group' });
  return ids.filter(id => {
    const group = selectors.getEntity<Group>(state, { type: 'group', id });
    return !!group && !group.parentGroupId;
  });
};

const store = createStore(reducer, initialState);

export default function Example() {
  return (
    <Provider store={store}>
      <RootGroupsList/>
    </Provider>
  );
}

function RootGroupsList() {
  const rootIds = useSelector<State, Id[]>(state => getRootGroupIds(state));

  const dispatch = useDispatch();
  const createRootGroup = (name: string) => {
    const id = randomString();
    dispatch(actionCreators.create('group', id, { name }));
  };

  return (
    <div style={{ padding: 20 }}>
      {rootIds.map(id => (
        <GroupCard key={id} id={id}/>
      ))}

      <Form onSubmit={createRootGroup} type="Group"/>
    </div>
  );
}

interface GroupCardProps {
  id: Id,
}

function GroupCard({ id }: GroupCardProps) {
  const group = useSelector<State, Group | undefined>(state => selectors.getEntity<Group>(state, {
    type: 'group',
    id
  }));

  const dispatch = useDispatch();
  const createChildGroup = (name: string) => {
    const childId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('group', childId, { name }),
      actionCreators.attach('group', childId, 'parentGroupId', id)
    ));
  };
  const createItem = (name: string) => {
    const itemId = randomString();
    dispatch(actionCreators.batch(
      actionCreators.create('item', itemId, { name }),
      actionCreators.attach('item', itemId, 'groupId', id)
    ));
  };

  if (!group) {
    return null;
  }

  return (
    <div style={{ border: 'solid 1px', paddingLeft: 20 }}>
      <p style={{ fontWeight: 'bold' }}>{group.name}</p>

      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          {group.itemIds?.map(itemId => (
            <ItemCard key={itemId} id={itemId}/>
          ))}
          <Form onSubmit={createItem} type="Item"/>
        </div>

        <div>
          {group.childGroupIds?.map(childGroupId => (
            <GroupCard key={childGroupId} id={childGroupId}/>
          ))}
          <Form onSubmit={createChildGroup} type="Group"/>
        </div>
      </div>
    </div>
  );
}

interface ItemCardProps {
  id: Id
}

function ItemCard({ id }: ItemCardProps) {
  const item = useSelector<State, Item | undefined>(state => selectors.getEntity<Item>(state, { type: 'item', id }));

  if (!item) {
    return null;
  }

  return (
    <div>
      <p>{item.name}</p>
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
    <div style={{ marginTop: 10 }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={`Add ${type}:`}
        style={{ fontSize: 14 }}
      />
      <button
        onClick={handleClickSubmit}
        disabled={!name}
        style={{ fontSize: 14 }}
      >+ {type}</button>
    </div>
  );
}
