import React, { ChangeEvent, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import normalizedSlice, { Schema, Id } from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { Card, CardsContainer } from '../../components/card';
import { Info, Label } from '../../components/info';
import Typography from '@material-ui/core/Typography';

interface Item {
  name: string
}

const schema: Schema = {
  'item': {
    // the minimum entity schema is an empty object
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

const initialState = {
  entities: {
    item: {
      'i1': { name: 'Foo' },
      'i2': { name: 'Bar' },
      'i3': { name: 'Baz' }
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3']
  }
};

export default function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ids = selectors.getIds(state, { type: 'item' });

  const main = (
    <Container>
      <Info
        title="Update"
        summary="Update an existing entity."
        action="update"
        docElemId="update"
        example="actionCreators.update('item', 'i1', { name: 'x' })"
      />

      <Label>Demo:</Label>
      <Typography>Edit some items. Each entity will get updated in the <code>state.entities.item</code> object.</Typography>

      <CardsContainer>
        {ids.map(id => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });

          const update = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(actionCreators.update('item', id, { name: e.target.value }));
          };

          return (
            <Card
              isSelectable={false}
              body={
                <TextField
                  value={item?.name}
                  onChange={update}
                  placeholder="Item name:"
                />
              }
            />
          )
        })}
      </CardsContainer>
    </Container>
  );

  return (
    <Layout
      main={main}
      state={state}
    />
  )
}
