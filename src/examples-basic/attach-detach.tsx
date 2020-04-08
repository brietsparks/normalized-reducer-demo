import React, { useReducer, useState, ReactNode, Dispatch } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema, Reducer } from 'normalized-reducer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import { Layout } from '../components/layout';
import { Card, CardsContainer } from '../components/card';

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

const { selectors, emptyState, reducer, actionCreators } = normalizedSlice<EntitiesState>(schema);

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

            const isSelected = selectedItem === itemId;
            const isChecked = selectedTag ? item.tagIds?.includes(selectedTag) : false;
            const handleCheckboxChange = (e: any, value: boolean) => {
              if (selectedTag) {
                value
                  ? attach({ itemId, tagId: selectedTag })
                  : detach({ itemId, tagId: selectedTag });
              }
            };

            return (
              <Card
                key={itemId}
                body={<CardBody id={itemId} text={item?.name} ids={item?.tagIds} />}
                right={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                onSelect={() => selectItem(itemId)}
                onDeselect={deselectItem}
                isSelectable
                isSelected={isSelected}
                isRightShown={!!selectedTag}
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

            const isSelected = selectedTag === tagId;
            const isChecked = selectedItem ? tag.itemIds?.includes(selectedItem) : false;
            const handleCheckboxChange = (e: any, value: boolean) => {
              if (selectedItem) {
                value
                  ? attach({ tagId, itemId: selectedItem })
                  : detach({ tagId, itemId: selectedItem });
              }
            };

            return (
              <Card
                key={tagId}
                body={<CardBody id={tagId} text={tag?.title} ids={tag?.itemIds} />}
                left={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                onSelect={() => selectTag(tagId)}
                onDeselect={deselectTag}
                isSelectable
                isSelected={isSelected}
                isLeftShown={!!selectedItem}
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

function CardBody(props: { id: Id, text: string, ids: Id[] }) {
  return (
    <div>
      <Typography variant="caption">{props.id}</Typography>
      <Typography>{props.text}</Typography>
      <pre>{JSON.stringify(props.ids)}</pre>
    </div>
  );
}
