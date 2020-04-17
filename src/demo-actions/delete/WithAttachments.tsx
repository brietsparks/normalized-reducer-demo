import React, { useReducer } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Grid from '@material-ui/core/Grid';

import { Layout } from '../../components/layout';
import { CardsContainer } from '../../components/card';
import Card from './Card';
import { Info, Label } from '../../components/info';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
      'i2': { name: 'Item 2', tagIds: ['t1', 't2', 't3'] },
      'i3': { name: 'Item 3', tagIds: [] }
    },
    tag: {
      't1': { title: 'Tag 1', itemIds: ['i2'] },
      't2': { title: 'Tag 2', itemIds: ['i1', 'i2'] },
      't3': { title: 'Tag 3', itemIds: ['i1', 'i2'] },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3'],
    tag: ['t1', 't2', 't3']
  }
};

export default function Example() {
  const [entitiesState, dispatch] = useReducer(reducer, initialState);

  const itemIds = selectors.getIds(entitiesState, { type: 'item' });
  const tagIds = selectors.getIds(entitiesState, { type: 'tag' });

  const deleteItem = (id: Id) => dispatch(actionCreators.delete('item', id));
  const deleteTag = (id: Id) => dispatch(actionCreators.delete('tag', id));

  const main = (
    <div>
      <Info
        title="Delete + detach"
        summary="Delete an entity and automatically detach all entities from it"
        action="delete"
        docElemId="delete"
        example="actionCreators.delete('item', 'i1')"
      />

      <Label>Demo:</Label>
      <Typography>Delete some items and tags. Deleting one will cause its id to be removed from the entity it was attached to.</Typography>

      <Grid container>
        <Grid item sm={6}>
          <CardsContainer>
            {itemIds.map(itemId => {
              const item = selectors.getEntity<Item>(entitiesState, { type: 'item', id: itemId });

              return (
                <Card
                  id={itemId}
                  text={item?.name}
                  attached={item?.tagIds}
                  delete={deleteItem}
                />
              )
            })}
          </CardsContainer>
        </Grid>
        <Grid item sm={6}>
          <CardsContainer>
            {tagIds.map(tagId => {
              const tag = selectors.getEntity<Tag>(entitiesState, { type: 'tag', id: tagId });

              return (
                <Card
                  id={tagId}
                  text={tag?.title}
                  attached={tag?.itemIds}
                  delete={deleteTag}
                />
              )
            })}
          </CardsContainer>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Layout
      main={main}
      state={entitiesState}
    />
  )
}
