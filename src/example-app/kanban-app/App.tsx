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
          statusIds: ['s1','s2', 's3', 's4', 's5']
        }
      },
      status: {
        's1': {
          id: 's1',
          title: 'Backlog',
          boardId: 'b1',
          taskIds: ['t1', 't2', 't3']
        },
        's2': {
          id: 's2',
          title: 'Todo',
          boardId: 'b1'
        },
        's3': {
          id: 's3',
          title: 'In Progress',
          boardId: 'b1'
        },
        's4': {
          id: 's4',
          title: 'QA',
          boardId: 'b1'
        },
        's5': {
          id: 's5',
          title: 'Done',
          boardId: 'b1'
        },
      },
      task: {
        't1': {
          id: 't1',
          title: 'Task 1',
          statusId: 's1',
          creatorId: 'u1',
        },
        't2': {
          id: 't2',
          title: 'Task 2',
          statusId: 's1',
          creatorId: 'u1',
        },
        't3': {
          id: 't3',
          title: 'Task 3',
          statusId: 's1',
          creatorId: 'u1',
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
      board: ['b1'],
      status: ['s1', 's2', 's3', 's4', 's5'],
      task: ['t1', 't2', 't3'],
      comment: [
        'c1',
        'c1.1',
        'c1.1.1',
        'c1.2',
      ],

    }
  },
};

export default function App() {
  return (
    <AuthContextProvider authId="u1" role={Role.USER}>
      <StoreProvider state={state}>
        <Board id="b1"/>
        {/*<Comment id={'c1'} />*/}
      </StoreProvider>
    </AuthContextProvider>
  );
}
