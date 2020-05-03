import React, { useReducer } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';
import posed, { PoseGroup } from 'react-pose';

import { Card, CardsContainer } from '../../components/card';
import { useStyles } from './styles';
import { ContentLayout } from '../../components/layout';
import { InfoSections, Label, Section } from '../../components/info';

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
    list: {
      'l1': { title: 'List 1', itemIds: ['i1', 'i2', 'i3'] },
      'l2': { title: 'List 2', itemIds: ['i4', 'i5', 'i6'] },
    },
    item: {
      'i1': { name: 'Item 1', listId: 'l1' },
      'i2': { name: 'Item 2', listId: 'l1' },
      'i3': { name: 'Item 3', listId: 'l1' },
      'i4': { name: 'Item 4', listId: 'l2' },
      'i5': { name: 'Item 5', listId: 'l2' },
      'i6': { name: 'Item 6', listId: 'l2' },
    }
  },
  ids: {
    item: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
    list: ['l1', 'l2']
  }
};

const AnimatedItem = posed.div({
  flip: {
    transition: {
      duration: 525,
    },
  },
});

export default function MoveAttached() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const listIds = selectors.getIds(state, { type: 'list' });

  const classNames = useStyles();

  const main = (
    <Container>
      <InfoSections
        title="Move attached"
        summary="Change the ordinal position of an attached entity id"
        action="moveAttached"
        docElemId="moveAttached"
        example="actionCreators.moveAttached('list', 'l1', 'itemIds', 2, 5)"
      />

      <Section>
        <Label>Demo:</Label>
        <Typography>Move an item within a list. Inside the list's data in <code>state.entities.list</code>, the item's id will be moved to the new index in <code>itemIds</code>.</Typography>
      </Section>

      <CardsContainer>
        {listIds.map(listId => {
          const list = selectors.getEntity<List>(state, { type: 'list', id: listId });

          const moveItemUp = (index: number) => {
            dispatch(actionCreators.moveAttached('list', listId, 'itemIds', index, index - 1));
          };

          const moveItemDown = (index: number) => {
            dispatch(actionCreators.moveAttached('list', listId, 'itemIds', index, index + 1));
          };

          const body = (
            <div>
              <Typography className={classNames.listTitle}>{list?.title}</Typography>

              <PoseGroup>
                {list?.itemIds.map((itemId, index) => {
                  const item = selectors.getEntity<Item>(state, { type: 'item', id: itemId });

                  const moveUp = () => moveItemUp(index);
                  const moveDown = () => moveItemDown(index);

                  return (
                    <AnimatedItem key={itemId} index={index}>
                      <ItemViewer
                        name={item?.name}
                        moveUp={moveUp}
                        moveDown={moveDown}
                      />
                    </AnimatedItem>
                  )
                })}
              </PoseGroup>
            </div>
          );

          return (
            <Card
              key={listId}
              isRightShown={true}
              body={body}
            />
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

interface ItemProps {
  name?: string,
  moveUp: () => void,
  moveDown: () => void,
}

function ItemViewer({ name, moveUp, moveDown }: ItemProps) {
  const classNames = useStyles();

  return (
    <div className={classNames.item}>
      <Typography>{name}</Typography>
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
  );
}
