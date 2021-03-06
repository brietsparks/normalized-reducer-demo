import React, { useReducer, useState } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { ContentLayout } from '../../components/layout';
import { CardsContainer } from '../../components/card';
import Card from './Card';
import { ActionInfoSections, Label, SummarySection, Section } from '../../components/info';
import Typography from '@material-ui/core/Typography';

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
    item: {
      'i1': { name: 'Item 1', listId: 'l1' },
      'i2': { name: 'Item 2', listId: 'l1' },
      'i3': { name: 'Item 3', listId: 'l3' }
    },
    list: {
      'l1': { title: 'List 1', itemIds: ['i1', 'i2'] },
      'l2': { title: 'List 2', itemIds: [] },
      'l3': { title: 'List 3', itemIds: ['i3'] },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3'],
    list: ['l1', 'l2', 'l3']
  }
};

export default function Example() {
  const [entitiesState, dispatch] = useReducer(reducer, initialState);
  const [selectedItem, setSelectedItem] = useState<Id | undefined>(undefined);
  const [selectedList, setSelectedList] = useState<Id | undefined>(undefined);

  const deselectItem = () => setSelectedItem(undefined);
  const deselectList = () => setSelectedList(undefined);

  const selectItem = (id: Id) => {
    setSelectedItem(id);
    deselectList();
  };

  const selectList = (id: Id) => {
    setSelectedList(id);
    deselectItem();
  };

  const itemIds = selectors.getIds(entitiesState, { type: 'item' });
  const listId = selectors.getIds(entitiesState, { type: 'list' });

  const attach = (ids: { itemId: Id, listId: Id }) => {
    dispatch(actionCreators.attach('item', ids.itemId, 'listId', ids.listId));
  };

  const detach = (ids: { itemId: Id, listId: Id }) => {
    dispatch(actionCreators.detach('item', ids.itemId, 'listId', ids.listId));
  };

  const handleClickAway = () => {
    deselectItem();
    deselectList();
  };

  const main = (
    <Container>
      <SummarySection
        title="Attach/detach one-to-many"
        summary="Attach and detach entities of a one-to-many relationship"
      />
      <ActionInfoSections
        action="attach"
        docElemId="attach"
        example="actionCreators.attach('list', 'l1', 'itemIds', 'i1')"
      />
      <ActionInfoSections
        action="detach"
        docElemId="detach"
        example="actionCreators.detach('list', 'l1', 'itemIds', 'i1')"
      />

      <Section>
        <Label>Demo:</Label>
        <Typography>Click on a box. Then click the checkboxes in the opposite column to attach/detach it. Attaching and detaching will change both entities in <code>state.entities</code>. Notice that an item can only have one list at any given time.</Typography>
      </Section>

      <ClickAwayListener onClickAway={handleClickAway}>
        <Grid container>
          <Grid item sm={6}>
            <CardsContainer>
              {listId.map(listId => {
                const list = selectors.getEntity<List>(entitiesState, { type: 'list', id: listId });

                if (!list) {
                  return null;
                }

                return (
                  <Card
                    key={listId}
                    id={listId}
                    text={list.title}
                    isSelected={listId === selectedList}
                    attached={list.itemIds}
                    selectedRelatedId={selectedItem}
                    select={selectList}
                    deselect={deselectList}
                    attach={(listId: Id, itemId: Id) => attach({ listId, itemId })}
                    detach={(listId: Id, itemId: Id) => detach({ listId, itemId })}
                    checkboxSide="right"
                  />
                )
              })}
            </CardsContainer>
          </Grid>
          <Grid item sm={6}>
            <CardsContainer>
              {itemIds.map(itemId => {
                const item = selectors.getEntity<Item>(entitiesState, { type: 'item', id: itemId });

                if (!item) {
                  return null;
                }

                return (
                  <Card
                    key={itemId}
                    id={itemId}
                    text={item.name}
                    isSelected={itemId === selectedItem}
                    attached={item.listId}
                    selectedRelatedId={selectedList}
                    select={selectItem}
                    deselect={deselectItem}
                    attach={(itemId: Id, listId: Id) => attach({ itemId, listId })}
                    detach={(itemId: Id, listId: Id) => detach({ itemId, listId })}
                    checkboxSide="left"
                  />
                )
              })}
            </CardsContainer>
          </Grid>
        </Grid>
      </ClickAwayListener>
    </Container>
  );

  return (
    <ContentLayout
      main={main}
      state={entitiesState}
    />
  )
}
