import React from 'react';
import { combineReducers } from 'redux'
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeNormalizedSlice from 'normalized-reducer';

import { randomString } from '../../util';
import { ContentLayout } from '../../components/layout';
import { ExternalLink, SummarySection } from '../../components/info';
import { useStyles } from './styles';

export const schema = {
  item: {}
};

const {
  reducer: entitiesReducer,
  actionCreators: entitiesActionCreators,
  selectors: entitiesSelectors,
} = makeNormalizedSlice(schema);

const countReducer = createReducer(0, {
  INCREMENT: state => state + 1,
  DECREMENT: state => state - 1,
});

const countActions = {
  increment: createAction('INCREMENT'),
  decrement: createAction('DECREMENT')
};

const rootReducer = combineReducers({
  count: countReducer,
  entities: entitiesReducer
});

const initialState = {
  count: 2,
  entities: {
    entities: {
      item: {
        'i1': { name: 'Item 1' },
        'i2': { name: 'Item 2' }
      }
    },
    ids: {
      item: ['i1', 'i2']
    }
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

export default function Example() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

function Main() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // count
  const count = useSelector(state => state.count);
  const handleClickIncrement = () => dispatch(countActions.increment());
  const handleClickDecrement = () => dispatch(countActions.decrement());

  // items
  const itemIds = useSelector(state => entitiesSelectors.getIds(state.entities, { type: 'item' }));
  const handleAddItem = () => {
    const id = randomString();
    dispatch(entitiesActionCreators.create('item', id, { name: `Item ${id}` }))
  };

  const classNames = useStyles();

  const main = (
    <div>
      <SummarySection
        title="With Redux Toolkit"
        summary="Normalized Reducer integrates easily into Redux Toolkit."
      />

      <Typography className={classNames.sourceLink}>
        <ExternalLink
          url="https://github.com/brietsparks/normalized-reducer-demo/blob/master/src/example-features/with-redux-toolkit/WithReduxToolkit.js"
          text="Source"
        />
      </Typography>

      <div className={classNames.count}>
        <Typography className={classNames.heading}>State slice from Redux Toolkit <code>createReducer</code></Typography>
        <Typography>Count: {count}</Typography>
        <Button onClick={handleClickIncrement} className={classNames.incrementButton}>Increment</Button>
        <Button onClick={handleClickDecrement}>Decrement</Button>
      </div>

      <div>
        <Typography className={classNames.heading}>State slice from Normalized Reducer</Typography>
        <Button onClick={handleAddItem}>Add Item</Button>
        <ul>
          {itemIds.map(id => (
            <li key={id}>
              <Item id={id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <ContentLayout
      state={state}
      main={main}
    />
  )
}

function Item({ id }) {
  const item = useSelector(state => entitiesSelectors.getEntity(state.entities, { type: 'item', id }));

  return (
    <Typography>{item.name}</Typography>
  );
}
