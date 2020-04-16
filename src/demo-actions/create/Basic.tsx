import React, { useReducer, useState, useRef, MutableRefObject } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import normalizedSlice, { Schema, Id } from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { Card, CardsContainer } from '../../components/card';
import { ActionInfo, Label } from '../../components/action-info';
import { randomString } from '../../util';
import { useStyles } from './styles';
import { useEnterHandler } from './hooks';

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
  emptyState,
  actionCreators,
  selectors
} = normalizedSlice<State>(schema);

export default function Example() {
  const [state, dispatch] = useReducer(reducer, emptyState);

  const ids = selectors.getIds(state, { type: 'item' });

  const createItem = (name: string) => {
    const id = randomString();
    dispatch(actionCreators.create('item', id, { name }));
  };

  const main = (
    <Container>
      <ActionInfo
        title="Create"
        summary="Adds an entity to state."
        docElemId="create"
        example="actionCreators.create('item', id, { fieldA: 'arbitrary' , fieldB: 'anything' })"
      />

      <Label>Demo</Label>

      <NewItemForm onSubmit={createItem} />

      <CardsContainer>
        {ids.map(id => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });
          return (
            <Card body={item?.name} isSelectable={false}/>
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

interface NewItemFormProps {
  onSubmit: (name: string) => void
}

function NewItemForm({ onSubmit }: NewItemFormProps) {
  const [name, setName] = useState('');
  const cleanName = name.trim();

  const ref = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const handleSubmit = () => {
    if (!!cleanName) {
      onSubmit(cleanName);
      setName('');
      ref.current.focus();
    }
  };

  const handleKeyPress = useEnterHandler(handleSubmit, ref);

  const inputProps = {
    onKeyPress: handleKeyPress,
    ref
  };

  const classNames = useStyles();

  return (
    <div className={classNames.form}>
      <TextField
        autoFocus
        inputProps={inputProps}
        placeholder="Item name:"
        value={name}
        onChange={e => setName(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit} color="primary" disabled={!cleanName}>
                <AddIcon/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {!!cleanName &&
      <Typography className={classNames.formHint} variant="caption">press enter</Typography>
      }
    </div>
  );
}
