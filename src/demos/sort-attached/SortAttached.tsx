import React, { useReducer } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import posed, { PoseGroup } from 'react-pose';

import { Card, CardsContainer } from '../../components/card';
import { useStyles } from './styles';
import { ContentLayout } from '../../components/layout';
import { InfoSections, Label, Section } from '../../components/info';

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

const { selectors, reducer, actionCreators } = normalizedSlice<EntitiesState>(schema);

const initialState: EntitiesState = {
  entities: {
    list: {
      'l1': { title: 'List 1', itemIds: ['i2', 'i3', 'i1'] },
      'l2': { title: 'List 2', itemIds: ['i4', 'i6', 'i5'] },
    },
    item: {
      'i1': { name: 'Item 1', listId: 'l1' },
      'i2': { name: 'Item 2', listId: 'l1' },
      'i3': { name: 'Item 3', listId: 'l1' },
      'i4': { name: 'Item 4', listId: 'l2' },
      'i5': { name: 'Item 5', listId: 'l2' },
      'i6': { name: 'Item 6', listId: 'l2' },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
    list: ['l1', 'l2']
  }
};

const AnimatedItem = posed.div({
  flip: {
    transition: {
      duration: 525,
    },
  },
});

export default function MoveAttached() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const listIds = selectors.getIds(state, { type: 'list' });

  const sortListItemsAsc = (listId: Id) => {
    dispatch(actionCreators.sortAttached<Item>('list', listId, 'itemIds', (a, b) => (a.name > b.name ? 1 : -1)));
  };

  const sortListItemsDesc = (listId: Id) => {
    dispatch(actionCreators.sortAttached<Item>('list', listId, 'itemIds', (a, b) => (a.name < b.name ? 1 : -1)));
  };


  const classNames = useStyles();

  const main = (
    <Container>
      <InfoSections
        title="Sort attached"
        summary="Sort an attached entity collection"
        action="sortAttached"
        docElemId="sortAttached"
        example="actionCreators.sortAttached('list', 'l1', 'itemIds', (a, b) => (a.name > b.name ? 1 : -1))"
      />

      <Section>
        <Label>Demo:</Label>
        <Typography>Click the buttons to sort a list's items by name. The ids will be sorted inside the <code>itemIds</code> array of the list inside <code>state.entities.list</code>.</Typography>
      </Section>

      <CardsContainer>
        {listIds.map(listId => {
          const list = selectors.getEntity<List>(state, { type: 'list', id: listId });

          const sortAsc = () => sortListItemsAsc(listId);
          const sortDesc = () => sortListItemsDesc(listId);

          const body = (
            <div>
              <Typography className={classNames.listTitle}>{list?.title}</Typography>

              <div className={classNames.buttons}>
                <Button onClick={sortAsc}>Sort by Name Asc</Button>
                <Button onClick={sortDesc}>Sort by Name Desc</Button>
              </div>

              <PoseGroup>
                {list?.itemIds.map((itemId, index) => {
                  const item = selectors.getEntity<Item>(state, { type: 'item', id: itemId });

                  return (
                    <AnimatedItem key={itemId} index={index}>
                      <div className={classNames.item}>
                        <Typography>{item?.name}</Typography>
                      </div>
                    </AnimatedItem>
                  )
                })}
              </PoseGroup>
            </div>
          );

          return (
            <Card
              key={listId}
              isRightShown={true}
              body={body}
            />
          )
        })}
      </CardsContainer>
    </Container>
  );

  return (
    <ContentLayout
      main={main}
      state={state}
    />
  )
}
