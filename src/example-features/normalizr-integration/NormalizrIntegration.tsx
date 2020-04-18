import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { normalize } from 'normalizr';
import { Cardinalities, fromNormalizr, NormalizrOutput, Schema } from 'normalized-reducer';

import normalizrSchema from './normalizr-schema';
import { useStyles } from './styles';
import { StateViewer } from '../../components/state-viewer';
import { Links } from '../../nav';
import { Code, ExternalLink, Summary } from '../../components/info';


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

export default function NormalizrIntegration() {
  const normalizedData: NormalizrOutput = normalize(denormalizedData, normalizrSchema);
  const initialState = fromNormalizr(normalizedData);
  const classNames = useStyles();

  return (
    <Grid container>
      <Grid item sm={2}>
        <div className={classNames.scrollable}>
          <Links/>
        </div>
      </Grid>

      <Grid item sm={10}>
        <div className={classNames.scrollable}>
          <div className={classNames.heading}>
            <Summary title="Normalizr Integration"/>

            <Typography>
              Normalized-reducer integrates with normalizr via an adapter function
              that transforms data normalized from normalizr into state that can
              be fed into the reducer.
            </Typography>
          </div>

          <Typography className={classNames.sourceLink}>
            <ExternalLink
              url="https://github.com/brietsparks/normalized-reducer-demo/blob/master/src/example-features/normalizr-integration/NormalizrIntegration.tsx"
              text="Source"
            />
          </Typography>

          <Code>
            {`const denormalizedData = {...}
const normalizedData: NormalizrOutput = normalize(denormalizedData, normalizrSchema);
const initialState = fromNormalizr(normalizedData);`}
          </Code>
          <div className={classNames.state}>
            <Grid container spacing={0}>
            <Grid item sm={4}>
              <div>
                <StateViewer
                  state={denormalizedData}
                  name="denormalizedData"
                  fullHeight={false}
                />
              </div>
            </Grid>
            <Grid item sm={4}>
              <div>
                <StateViewer
                  state={normalizedData}
                  name="normalizedData"
                  fullHeight={false}
                />
              </div>
            </Grid>
            <Grid item sm={4}>
              <div>
                <StateViewer
                  state={initialState}
                  fullHeight={false}
                />
              </div>
            </Grid>
          </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
