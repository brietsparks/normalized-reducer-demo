import React, { useReducer, useState } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';

import { Card, CardsContainer } from '../../components/card';
import { useStyles } from './styles';
import { Layout } from '../../components/layout';
import { randomString } from '../../util';
import { Info, Label } from '../../components/info';

export interface Item {
  name: string,
  listId: Id
}

export interface List {
  title: string,
  itemIds: Id[]
}

export interface EntitiesState {
  entities: {
    item: Record<Id, Item>,
    list: Record<Id, List>
  },
  ids: {
    item: Id[],
    list: Id[],
  }
}

const schema: Schema = {
  item: {
    listId: {
      type: 'list',
      cardinality: Cardinalities.ONE,
      reciprocal: 'itemIds',
    }
  },
  list: {
    itemIds: {
      type: 'item',
      cardinality: Cardinalities.MANY,
      reciprocal: 'listId'
    }
  }
};

const { selectors, emptyState, reducer, actionCreators } = normalizedSlice<EntitiesState>(schema);

export default function Example() {
  const [state, dispatch] = useReducer(reducer, emptyState);

  const [listNumber, setListNumber] = useState(1);

  const listIds = selectors.getIds(state, { type: 'list' });

  const addListWithItems = () => {
    const [
      listId,
      itemId1,
      itemId2,
      itemId3
    ] = [randomString(), randomString(), randomString(), randomString()];

    dispatch(actionCreators.batch(
      actionCreators.create('list', listId, { title: `List ${listNumber}` }),
      actionCreators.create('item', itemId1, { name: `Item ${listNumber}.1` }),
      actionCreators.create('item', itemId2, { name: `Item ${listNumber}.2` }),
      actionCreators.create('item', itemId3, { name: `Item ${listNumber}.3` }),
      actionCreators.attach('list', listId, 'itemIds', itemId1),
      actionCreators.attach('list', listId, 'itemIds', itemId2),
      actionCreators.attach('list', listId, 'itemIds', itemId3),
    ));

    setListNumber(listNumber + 1);
  };

  const classNames = useStyles();

  const main = (
    <Container>
      <Info
        title="Batch"
        summary="Run a batch of actions in a single reduction"
        action="batch"
        docElemId="batch"
        example={[
          "actionCreators.batch(",
          "  actionCreators.create('list', 'l1'),",
          "  actionCreators.create('item', 'i1'),",
          "  actionCreators.attach('list', 'l1', 'itemIds', 'i1'),",
          ")",
        ]}
      />

      <Label>Demo:</Label>
      <Typography>Click the button to dispatch an action that contains multiple actions. Each one will create a list, three items, and then attach the items to the list.</Typography>

      <Button onClick={addListWithItems}>Create List with Items</Button>

      <CardsContainer>
        {listIds.map(listId => {
          const list = selectors.getEntity<List>(state, { type: 'list', id: listId });

          const body = (
            <div>
              <Typography className={classNames.listTitle}>{list?.title}</Typography>

              <div>
                {list?.itemIds.map((itemId, index) => {
                  const item = selectors.getEntity<Item>(state, { type: 'item', id: itemId });

                  return (
                    <div className={classNames.item}>
                      <Typography>{item?.name}</Typography>
                    </div>
                  )
                })}
              </div>
            </div>
          );

          return (
            <Card
              isRightShown={true}
              body={body}
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
