import React, { useReducer, useState } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Grid from '@material-ui/core/Grid';

import { Layout } from '../../components/layout';
import { CardsContainer } from '../../components/card';
import Card from './Card';

export interface Item {
  name: string,
  tagIds: Id[]
}

export interface Tag {
  title: string,
  itemIds: Id[]
}

export interface EntitiesState {
  entities: {
    item: Record<Id, Item>,
    tag: Record<Id, Tag>
  },
  ids: {
    item: Id[],
    tag: Id[],
  }
}

const schema: Schema = {
  item: {
    tagIds: {
      type: 'tag',
      cardinality: Cardinalities.MANY,
      reciprocal: 'itemIds',
    }
  },
  tag: {
    itemIds: {
      type: 'item',
      cardinality: Cardinalities.MANY,
      reciprocal: 'tagIds'
    }
  }
};

const { selectors, reducer, actionCreators } = normalizedSlice<EntitiesState>(schema);

const initialState: EntitiesState = {
  entities: {
    item: {
      'i1': { name: 'Item 1', tagIds: ['t2', 't3'] },
      'i2': { name: 'Item 2', tagIds: [] },
      'i3': { name: 'Item 3', tagIds: [] }
    },
    tag: {
      't1': { title: 'Tag 1', itemIds: [] },
      't2': { title: 'Tag 2', itemIds: ['i1'] },
      't3': { title: 'Tag 3', itemIds: ['i1'] },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3'],
    tag: ['t1', 't2', 't3']
  }
};

export default function Example() {
  const [entitiesState, dispatch] = useReducer(reducer, initialState);
  const [selectedItem, setSelectedItem] = useState<Id|undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<Id|undefined>(undefined);

  const deselectItem = () => setSelectedItem(undefined);
  const deselectTag = () => setSelectedTag(undefined);

  const selectItem = (id: Id) => {
    setSelectedItem(id);
    deselectTag();
  };

  const selectTag = (id: Id) => {
    setSelectedTag(id);
    deselectItem();
  };

  const itemIds = selectors.getIds(entitiesState, { type: 'item' });
  const tagIds = selectors.getIds(entitiesState, { type: 'tag' });

  const attach = (ids: { itemId: Id, tagId: Id }) => {
    dispatch(actionCreators.attach('item', ids.itemId, 'tagIds', ids.tagId));
  };

  const detach = (ids: { itemId: Id, tagId: Id }) => {
    dispatch(actionCreators.detach('item', ids.itemId, 'tagIds', ids.tagId));
  };

  const main = (
    <Grid container>
      <Grid item sm={6}>
        <CardsContainer>
          {itemIds.map(itemId => {
            const item = selectors.getEntity<Item>(entitiesState, { type: 'item', id: itemId });

            if (!item) {
              return null;
            }

            return (
              <Card
                id={itemId}
                text={item.name}
                isSelected={itemId === selectedItem}
                attached={item.tagIds}
                selectedRelatedId={selectedTag}
                select={selectItem}
                deselect={deselectItem}
                attach={(itemId: Id, tagId: Id) => attach({ itemId, tagId })}
                detach={(itemId: Id, tagId: Id) => detach({ itemId, tagId })}
                checkboxSide="right"
              />
            )
          })}
        </CardsContainer>
      </Grid>
      <Grid item sm={6}>
        <CardsContainer>
          {tagIds.map(tagId => {
            const tag = selectors.getEntity<Tag>(entitiesState, { type: 'tag', id: tagId });

            if (!tag) {
              return null;
            }

            return (
              <Card
                id={tagId}
                text={tag.title}
                isSelected={tagId === selectedTag}
                attached={tag.itemIds}
                selectedRelatedId={selectedItem}
                select={selectTag}
                deselect={deselectTag}
                attach={(tagId: Id, itemId: Id) => attach({ tagId, itemId })}
                detach={(tagId: Id, itemId: Id) => detach({ tagId, itemId })}
                checkboxSide="left"
              />
            )
          })}
        </CardsContainer>
      </Grid>
    </Grid>
  );

  return (
    <Layout
      main={main}
      state={entitiesState}
    />
  )
}
