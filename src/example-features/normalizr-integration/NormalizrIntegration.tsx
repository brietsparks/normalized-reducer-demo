import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeNormalizedSlice, { Cardinalities, Schema, fromNormalizr, NormalizrOutput } from 'normalized-reducer';
import { normalize } from 'normalizr';

import normalizrSchema from './normalizr-schema';
import { useStyles } from './styles';
import { Layout } from '../../components/layout';
import { StateViewer } from '../../components/state-viewer';

export interface User {
  id: string,
  name: string,
  posts: string[]
  comments: string[]
}

export interface Post {
  id: string
  title: string
  user: string
  comments: string[]
}

export interface Comment {
  content: string
  post: string
  commenter: string
}

const denormalizedData = [
  {
    id: '1',
    title: 'My first post!',
    author: {
      id: '123',
      name: 'Paul'
    },
    comments: [
      {
        id: '249',
        content: 'Nice post!',
        commenter: {
          id: '245',
          name: 'Jane'
        }
      },
      {
        id: '250',
        content: 'Thanks!',
        commenter: {
          id: '123',
          name: 'Paul'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'This other post',
    author: {
      id: '123',
      name: 'Paul'
    },
    comments: [
      {
        id: '251',
        content: 'Your other post was nicer',
        commenter: {
          id: '245',
          name: 'Jane'
        }
      },
      {
        id: '252',
        content: 'I am a spammer!',
        commenter: {
          id: '246',
          name: 'Spambot5000'
        }
      }
    ]
  }
];

const schema: Schema = {
  user: {
    posts: {
      type: 'post',
      cardinality: Cardinalities.MANY,
      reciprocal: 'author'
    },
    comments: {
      type: 'comment',
      cardinality: Cardinalities.MANY,
      reciprocal: 'commenter'
    },
  },
  post: {
    author: {
      type: 'user',
      cardinality: Cardinalities.ONE,
      reciprocal: 'posts'
    },
    comments: {
      type: 'comment',
      cardinality: Cardinalities.MANY,
      reciprocal: 'post'
    }
  },
  comment: {
    post: {
      type: 'post',
      cardinality: Cardinalities.ONE,
      reciprocal: 'comments',
    },
    commenter: {
      type: 'user',
      cardinality: Cardinalities.ONE,
      reciprocal: 'comments'
    }
  }
};

const {
  // actionCreators,
  // reducer,
  // selectors,
  // emptyState,
  // actionTypes,
} = makeNormalizedSlice(schema);

export default function NormalizrIntegration() {
  const normalizedData: NormalizrOutput = normalize(denormalizedData, normalizrSchema);
  const initialState = fromNormalizr(normalizedData);

  const classNames = useStyles();

  return (
    <Grid container>
      <Grid item sm={2}>
        {null}
      </Grid>

      <Grid item sm={10}>
        <Grid container spacing={0}>
          <Grid item sm={4}>
            <div className={classNames.scrollable}>
              <StateViewer state={denormalizedData} />
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className={classNames.scrollable}>
              <StateViewer state={normalizedData} />
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className={classNames.scrollable}>
              <StateViewer state={initialState} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
