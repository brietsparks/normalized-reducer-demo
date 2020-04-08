import React from 'react';

import { StoreProvider, State, emptyState } from './store';
import AuthContextProvider from './Auth';
import { Role } from './model';
// import { Comment } from './containers/comment';
import { Board } from './containers/board';

const state: State = {
  entities: {
    entities: {
      ...emptyState.entities.entities,
      board: {
        'b1': {
          id: 'b1',
          title: 'Board 1',
        }
      },
      comment: {
        'c1': {
          id: 'c1',
          childCommentIds: ['c1.1', 'c1.2'],
          value: 'what is babby?'
        },
        'c1.1': {
          id: 'c1.1',
          parentCommentId: 'c1',
          childCommentIds: ['c1.1.1'],
          value: 'check yourself before you reck yourselct'
        },
        'c1.1.1': {
          id: 'c1.1.1',
          value: 'where did yo uget this?'
        },
        'c1.2': {
          id: 'c1.2',
          value: 'troll'
        }
      }
    },
    ids: {
      ...emptyState.entities.ids,
      comment: [
        'c1',
        'c1.1',
        'c1.1.1',
        'c1.2',
      ]
    }
  },
};

export default function App() {
  return (
    <AuthContextProvider authId="" role={Role.USER}>
      <StoreProvider state={state}>
        <Board id="b1"/>
        {/*<Comment id={'c1'} />*/}
      </StoreProvider>
    </AuthContextProvider>
  );
}
