import React, { ReactNode, useReducer } from 'react';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import makeNormalizedSlice from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { Summary, Code, Label, ExternalLink } from '../../components/info';
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

const DragHandle = SortableHandle(
  (props: { children: React.ReactNode }) => {
    return (
      <span style={{cursor: 'grab'}} {...props}>
        {props.children}
      </span>
    );
  }
);

const SortableChip = SortableElement((props: ChipProps) => {
  const classNames = useStyles();

  return (
    <div><Chip {...props} className={classNames.chip}/></div>
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

  const classNames = useStyles();

  const main = (
    <div>
      <Summary
        title="Sortable Tags"
        summary="Setting up state for a sortable list is easy."
      />

      <Label>Setup:</Label>
      <Code>
{`const schema = {
  tag: {}
};

const { selectors, actionCreators, reducer } = makeNormalizedSlice(schema);`}
      </Code>

      <Typography className={classNames.sourceLink}>
        <ExternalLink
          url="https://github.com/brietsparks/normalized-reducer-demo/blob/master/src/example-features/sortable-tags/SortableTags.tsx"
          text="Source"
        />
      </Typography>

      <Label>Demo:</Label>
      <div className={classNames.demo}>
        <SortableList
          axis="xy"
          onSortStart={handleSortStart}
          onSortEnd={handleSortEnd}
          useDragHandle
        >
          {ids.map((id, index) => {
            const tag = selectors.getEntity<Tag>(state, { type: 'tag', id });
            const handleDelete = () => dispatch(actionCreators.delete('tag', id));
            return (
              <SortableChip
                key={id}
                index={index}
                label={<DragHandle>{tag?.value}</DragHandle>}
                onDelete={handleDelete}
              />
            )
          })}
        </SortableList>
      </div>
    </div>
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
