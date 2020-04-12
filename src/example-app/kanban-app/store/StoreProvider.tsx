import React, { ReactNode } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './normalized';
import { State, emptyState } from './state';


export interface Props {
  children: ReactNode,
  state?: State
}
export default function StoreProvider({ children, state = emptyState }: Props) {
  const store = createStore(reducer, state);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
