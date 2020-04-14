import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import normalizedSlice, { Schema, Cardinalities, Id } from 'normalized-reducer';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

interface Comment {
  value: string,
  childIds?: Id[],
  parentId?: Id
}

const schema: Schema = {
  comment: {
    parentId: {
      type: 'comment',
      cardinality: Cardinalities.ONE,
      reciprocal: 'childIds'
    },
    childIds: {
      type: 'comment',
      cardinality: Cardinalities.MANY,
      reciprocal: 'parentId'
    }
  }
};

export interface State {
  entities: {
    comment: Record<Id, Comment>
  },
  ids: {
    comment: Id[]
  }
}

export const {
  emptyState,
  actionCreators,
  reducer,
  selectors,
  actionTypes,
} = normalizedSlice(schema);

const initialState: State = {
  entities: {
    comment: {
      'c1': {
        childIds: ['c1.1'],
        value: 'Boboddy - what does the first b stand for?',
      },
      'c1.1': {
        parentId: 'c1', childIds: ['c1.1.1', 'c1.1.2'],
        value: 'Biznus!'
      },
      'c1.1.1': {
        parentId: 'c1.1',
        value: 'I LIKE IT',
      },
      'c1.1.2': {
        parentId: 'c1.1',
        value: 'we need a new manager',
      },
      'c2': {
        childIds: ['c2.1'],
        value: 'Maybe there is some sort of animal we can make a sacrifice to - like a giant buffalo.',
      },
      'c2.1': {
        parentId: 'c2', childIds: ['2.1.1'],
        value: 'Or some sort of monster like something with the body of a walrus with the head of a sea lion.',
      },
      'c2.1.1': {
        parentId: 'c2.1', childIds: ['2.1.1.1'],
        value: 'Or something with the body of an egret with the head of a meerkat.'
      },
      'c2.1.1.1': {
        parentId: 'c2.1.1',
        value: 'Or just the head of a monkey with the antlers of a reindeer...with the body of a porcupine.'
      }
    }
  },
  ids: {
    comment: ['c1', 'c2']
  }
};

const store = createStore(reducer, initialState);

export default function Example() {
  return (
    <Provider store={store}>
      <RootComments/>
    </Provider>
  );
}

const getRootCommentIds = (state: State) => {
  const ids = selectors.getIds(state, { type: 'comment' });
  return ids.filter(id => {
    const comment = selectors.getEntity<Comment>(state, { type: 'comment', id });
    return !!comment && !comment.parentId;
  });
};

function RootComments() {
  const ids = useSelector<State, Id[]>(state => getRootCommentIds(state));

  const classNames = useStyles();

  return (
    <div className={classNames.rootComments}>
      {ids.map(id => (
        <CommentViewer key={id} id={id} />
      ))}
    </div>
  );
}

interface CommentViewerProps {
  id: Id,
}
function CommentViewer({ id }: CommentViewerProps) {
  const comment = useSelector<State, Comment|undefined>(state => selectors.getEntity(state, { type: 'comment', id }));

  const classNames = useStyles();

  if (!comment) {
    return null;
  }

  return (
    <div className={classNames.comment}>
      {comment.childIds &&
      <div className={classNames.commentSideline} />
      }

      <div className={classNames.commentContent}>
        <Typography>{comment.value}</Typography>

        {comment.childIds?.map(childId => (
          <CommentViewer key={childId} id={childId} />
        ))}
      </div>
    </div>
  );
}
