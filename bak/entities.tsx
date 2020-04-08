import React, { Dispatch, ReactNode, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import normalizedSlice, { Cardinalities, Id, Schema, Reducer } from 'normalized-reducer';

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

export interface EntitiesContextValue {
  state: EntitiesState,
  dispatch?: Dispatch<any>,
}

const entitiesContext = createContext<EntitiesContextValue>({ state: emptyState });

interface EntitiesProviderProps {
  children: ReactNode,
  initialState: EntitiesState
}

export const EntitiesProvider = ({ children, initialState = emptyState }: EntitiesProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<EntitiesState>>(reducer, initialState);
  const value: EntitiesContextValue = { state, dispatch };
  return (
    <entitiesContext.Provider value={value}>{children}</entitiesContext.Provider>
  )
};


const getItemIds = (state: EntitiesState) => selectors.getIds(state, { type: 'item' });
const getItem = (state: EntitiesState, args: { id: Id }) => selectors.getEntity<Item>(state, { type: 'item', id: args.id });
const getTagIds = (state: EntitiesState) => selectors.getIds(state, { type: 'tag' });
const getTag = (state: EntitiesState, args: { id: Id }) => selectors.getEntity<Tag>(state, { type: 'tag', id: args.id });

//
// selector hooks
//
export function useItemIds() {
  return useContextSelector(entitiesContext, ({ state }) => {
    return getItemIds(state);
  })
}

export function useTagIds() {
  return useContextSelector(entitiesContext, ({ state }) => {
    return getTagIds(state)
  })
}

export function useItem(id: string) {
  return useContextSelector(entitiesContext, ({ state }) => {
    return getItem(state, { id });
  })
}

export function useTag(id: string) {
  return useContextSelector(entitiesContext, ({ state }) => {
    return getTag(state, { id });
  })
}


//
// action hooks
//
export function useDispatch() {
  return useContextSelector(entitiesContext, ({ dispatch }) => {
    return dispatch as Dispatch<any>;
  });
}

export function useAttachItemToTag() {
  const dispatch = useDispatch();
  return (itemId: string, tagId: string) => dispatch(actionCreators.attach('item', itemId, 'tagId', tagId));
}

export function useDetachItemFromTag() {
  const dispatch = useDispatch();
  return (itemId: string, tagId: string) => dispatch(actionCreators.detach('item', itemId, 'tagId', tagId));
}
