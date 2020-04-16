import React, { useReducer } from 'react';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import posed, { PoseGroup } from 'react-pose';
import normalizedSlice, { Id, Schema } from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { Card } from '../../components/card';
import { useStyles } from './style';
import { Info, Label } from '../../components/info';

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
  ids: {
    item: ['i1', 'i2', 'i3']
  },
  entities: {
    item: {
      'i1': { name: 'Foo' },
      'i2': { name: 'Bar' },
      'i3': { name: 'Baz' }
    }
  }
};

const AnimatedItem = posed.div({
  flip: {
    transition: {
      duration: 525,
    },
  },
});

export default function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ids = selectors.getIds(state, { type: 'item' });

  const classNames = useStyles();

  const main = (
    <Container>
      <Info
        title="Move"
        summary="Change the ordinal position of an entity with respect to its top-level collection"
        action="move"
        docElemId="move"
        example="actionCreators.move('item', 1, 3)"
      />

      <Label>Demo:</Label>

      <PoseGroup>
        {ids.map((id, index) => {
          const item = selectors.getEntity<Item>(state, { type: 'item', id });

          const moveUp = () => dispatch(actionCreators.move('item', index, index - 1));
          const moveDown = () => dispatch(actionCreators.move('item', index, index + 1));

          return (
            <AnimatedItem key={id} index={index}>
              <div className={classNames.card}>
                <Card
                  isSelectable={false}
                  body={
                    <div className={classNames.body}>
                      <Typography>{item?.name}</Typography>
                      <div>
                        <div>
                          <IconButton onClick={moveUp}>
                            <UpIcon/>
                          </IconButton>
                        </div>
                        <div>
                          <IconButton onClick={moveDown}>
                            <DownIcon/>
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </AnimatedItem>
          )
        })}
      </PoseGroup>
    </Container>
  );

  return (
    <Layout
      main={main}
      state={{
        ids: state.ids,
        entities: state.entities,
      }}
    />
  )
}
