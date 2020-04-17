import React, { useReducer } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
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
        title="Delete"
        summary="Delete an entity"
        action="delete"
        docElemId="delete"
        example="actionCreators.delete('item', 'i1')"
      />

      <Label>Demo:</Label>
      <Typography>Delete some items. The item will be removed from the <code>state.entities.item</code> object, and its id will be removed from the <code>state.ids.item</code> array.</Typography>

      <CardsContainer>
        {ids.map(id => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });

          const del = () => dispatch(actionCreators.delete('item', id));

          return (
            <Card
              isSelectable={false}
              body={item?.name}
              right={
                <IconButton onClick={del}>
                  <DeleteIcon/>
                </IconButton>
              }
              isRightShown={true}
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
