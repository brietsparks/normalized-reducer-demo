import React, { useReducer, useState, useRef, MutableRefObject } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import normalizedSlice, { Schema, Id } from 'normalized-reducer';


import { ContentLayout } from '../../components/layout';
import { Card, CardsContainer } from '../../components/card';
import { randomString } from '../../util';
import { useStyles } from './styles';
import { useEnterHandler } from './hooks';
import { InfoSections, Section, Label } from '../../components/info';
import Typography from '@material-ui/core/Typography';

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
  actionCreators,
  selectors
} = normalizedSlice<State>(schema);

const initialState = {
  entities: {
    item: {
      'i1': { name: 'Lorem' },
      'i2': { name: 'Ispum' },
      'i3': { name: 'Dolor' },
      'i4': { name: 'Sit Amet' }
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3', 'i4']
  }
};

export default function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ids = selectors.getIds(state, { type: 'item' });

  const createItem = (name: string, index: number) => {
    const id = randomString();
    dispatch(actionCreators.create('item', id, { name }, index));
  };

  const main = (
    <Container>
      <InfoSections
        title="Create, indexed"
        summary="Add an entity to a collection at a given index."
        action="create"
        docElemId="create"
        example="actionCreators.create('item', id, { a: 'foo' }, 2)"
      />

      <Section>
        <Label>Demo:</Label>
        <Typography>Add some items. Each entity will get added to the <code>state.entities.item</code> object, and its id will be inserted at the appropriate index in the <code>state.ids.item</code> array.</Typography>
      </Section>

      <NewItemForm onSubmit={createItem} />

      <CardsContainer>
        {ids.map(id => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });
          return (
            <Card key={id} body={item?.name} isSelectable={false}/>
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

interface NewItemFormProps {
  onSubmit: (name: string, index: number) => void
}

function NewItemForm({ onSubmit }: NewItemFormProps) {
  const [index, setIndex] = useState(2);
  const [name, setName] = useState('');
  const cleanName = name.trim();

  const classNames = useStyles();

  const nameInputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const indexInputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const handleSubmit = () => {
    if (!!cleanName) {
      onSubmit(cleanName, index);
      setName('');
      nameInputRef.current.focus();
    }
  };

  const handleKeyPressName = useEnterHandler(handleSubmit, nameInputRef);
  const handleKyPressIndex = useEnterHandler(handleSubmit, indexInputRef);

  const nameInputProps = {
    onKeyPress: handleKeyPressName,
    ref: nameInputRef
  };

  const indexInputProps = {
    onKeyPress: handleKyPressIndex,
    ref: indexInputRef
  };

  return (
    <div className={classNames.form}>
      <TextField
        autoFocus
        className={classNames.formItemName}
        inputProps={nameInputProps}
        placeholder="Item name:"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <TextField
        inputProps={indexInputProps}
        placeholder="Index:"
        value={index}
        onChange={e => e && setIndex(Number(e.target.value))}
        type="number"
        label="Index"
      />

      <div>
        <IconButton onClick={handleSubmit} color="primary" disabled={!cleanName}>
          <AddIcon/>
        </IconButton>
      </div>
    </div>
  );
}
