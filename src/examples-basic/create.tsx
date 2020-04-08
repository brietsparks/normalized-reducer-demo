import React, { useReducer, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import normalizedSlice, { Schema, Id } from 'normalized-reducer';

import { Layout } from '../components/layout';
import { Card, CardsContainer } from '../components/card';
import { StateViewer } from '../components/state-viewer';
import { randomString } from '../util';

interface Item {
  name: string
}

const schema: Schema = {
  'item': {
    // relation schemas would go here
  }
};

interface State {
  entities: {
    item: Record<Id, Item>
  },
  ids: {
    item: Id[]
  }
}

const {
  reducer,
  emptyState,
  actionCreators,
  selectors
} = normalizedSlice<State>(schema);

export default function Example() {
  const [state, dispatch] = useReducer(reducer, emptyState);

  const ids = selectors.getIds(state, { type: 'item' });

  const createItem = (name: string) => {
    const id = randomString();
    dispatch(actionCreators.create('item', id, { name }));
  };

  const main = (
    <div style={{ width: 300 }}>
      <NewItemForm onSubmit={createItem} />

      <hr/>

      <CardsContainer>
        {ids.map(id => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });
          return (
            <Card body={item?.name}/>
          )
        })}
      </CardsContainer>
    </div>
  );

  return (
    <Layout
      main={main}
      state={state}
    />
  )
}

interface NewItemFormProps {
  onSubmit: (name: string) => void
}

function NewItemForm({ onSubmit }: NewItemFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!!name) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <div>
      <Input
        placeholder="Item name:"
        value={name}
        onChange={e => setName(e.target.value)}
        // variant="outlined"
        margin="dense"
      />

      <Button
        onClick={handleSubmit}
        disabled={!name}
        variant="contained"
        color="primary"
        disableElevation
      ><AddIcon/></Button>
    </div>
  );
}
