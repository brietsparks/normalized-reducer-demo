import React, { useReducer } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema, State } from 'normalized-reducer';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { ContentLayout } from '../../components/layout';
import { useStyles } from './styles';
import { InfoSections, Label, Section } from '../../components/info';
import Typography from '@material-ui/core/Typography';

export interface Item {
  name: string,
  listId: Id
}

export interface List {
  title: string,
  itemIds: Id[]
}

export interface EntitiesState extends State {
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

const { reducer, emptyState, actionCreators } = normalizedSlice<EntitiesState>(schema);

const initialState: EntitiesState = {
  entities: {
    list: {
      'l1': { title: 'List 1', itemIds: ['i1', 'i2', 'i3'] },
      'l2': { title: 'List 2', itemIds: ['i4', 'i5'] },
    },
    item: {
      'i1': { name: 'Item 1', listId: 'l1' },
      'i2': { name: 'Item 2', listId: 'l1' },
      'i3': { name: 'Item 3', listId: 'l1' },
      'i4': { name: 'Item 4', listId: 'l2' },
      'i5': { name: 'Item 5', listId: 'l2' },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3', 'i4', 'i5'],
    list: ['l1', 'l2']
  }
};


export default function MoveAttached() {
  const [state, dispatch] = useReducer(reducer, emptyState);

  const setState = () => dispatch(actionCreators.setState(initialState));
  const clearState = () => dispatch(actionCreators.setState(emptyState));

  const classNames = useStyles();

  const main = (
    <Container>
      <InfoSections
        title="Set state"
        summary="Set the normalized state"
        action="setState"
        docElemId="setState"
        example="actionCreators.setState(myInitialState)"
      />

      <Section>
        <Label>Demo:</Label>
        <Typography>Click the buttons to set/clear an entire object in the state.</Typography>
      </Section>

      <div className={classNames.buttons}>
        <Button onClick={setState}>Set State</Button>
        <Button onClick={clearState}>Clear State</Button>
      </div>

      <div>
        <pre>{JSON.stringify(initialState, null, 2)}</pre>
      </div>
    </Container>
  );

  return (
    <ContentLayout
      main={main}
      state={state}
    />
  )
}
