import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import normalizedSlice, { Schema, Id } from 'normalized-reducer';
import posed, { PoseGroup } from 'react-pose';

import { Layout } from '../../components/layout';
import { Card, CardsContainer } from '../../components/card';
import { useStyles } from './styles';
import { Info, Label } from '../../components/info';

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

const AnimatedItem = posed.div({
  flip: {
    transition: {
      duration: 525,
    },
  },
});

export default function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ids = selectors.getIds(state, { type: 'item' });

  const sortAsc = () => {
    dispatch(actionCreators.sort<Item>('item', (a, b) => (a.name > b.name ? 1 : -1)));
  };

  const sortDesc = () => {
    dispatch(actionCreators.sort<Item>('item', (a, b) => (a.name < b.name ? 1 : -1)));
  };

  const classNames = useStyles();

  const main = (
    <Container>
      <Info
        title="Sort"
        summary="Sort an entity collection"
        action="sort"
        docElemId="sort"
        example="actionCreators.sort('item', (a, b) => (a.name > b.name ? 1 : -1))"
      />

      <Label>Demo:</Label>

      <div className={classNames.buttons}>
        <Button onClick={sortAsc}>Sort by Name Asc</Button>
        <Button onClick={sortDesc}>Sort by Name Desc</Button>
      </div>

      <PoseGroup>
        {ids.map((id, index) => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });
          return (
            <AnimatedItem key={id} index={index}>
              <div className={classNames.card}>
                <Card body={item?.name} isSelectable={false}/>
              </div>
            </AnimatedItem>
          )
        })}
      </PoseGroup>
    </Container>
  );

  return (
    <Layout
      main={main}
      state={state}
    />
  )
}
