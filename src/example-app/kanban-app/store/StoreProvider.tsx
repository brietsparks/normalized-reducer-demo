import React, { ReactNode } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducer';
import { State, emptyState } from './state';


export interface Props {
  children: ReactNode,
  state?: State
}
export default function StoreProvider({ children, state = emptyState }: Props) {
  // @ts-ignore // todo
  const store = createStore(rootReducer, state);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
