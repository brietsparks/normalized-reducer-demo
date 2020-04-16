import React, { useReducer, ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import makeNormalizedSlice from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { useStyles } from './style';

interface Tag {
  value: string
}

const schema = {
  tag: {}
};

const { selectors, actionCreators, reducer } = makeNormalizedSlice(schema);

const initialState = {
  entities: {
    tag: {
      't1': { value: 'React' },
      't2': { value: 'normalization' },
      't4': { value: 'reducer' },
      't3': { value: 'normalizr' },
      't5': { value: 'Redux' },
      't6': { value: 'relational data' }
    }
  },
  ids: {
    tag: ['t1', 't2', 't3', 't4', 't5', 't6']
  }
};

const SortableList = SortableContainer(
  (props: { children: ReactNode }) => {
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{props.children}</div>;
  }
);

const SortableChip = SortableElement((props: ChipProps) => {
  const classNames = useStyles();

  return (
    <div><Chip {...props} className={classNames.chip} /></div>
  )
});

export default function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSortStart = () => {
    document.body.style.cursor = 'grabbing';
  };

  const handleSortEnd = (indices: { oldIndex: number; newIndex: number }) => {
    document.body.style.cursor = 'initial';
    dispatch(actionCreators.move('tag', indices.oldIndex, indices.newIndex));
  };

  const ids = selectors.getIds(state, { type: 'tag' });

  const main = (
    <Container maxWidth="xs">
      <SortableList
        axis="xy"
        onSortStart={handleSortStart}
        onSortEnd={handleSortEnd}
      >
        {ids.map((id, index) => {
          const tag = selectors.getEntity<Tag>(state, { type: 'tag', id });
          return (
            <SortableChip label={tag?.value} index={index} />
          )
        })}
      </SortableList>
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
  );
}
