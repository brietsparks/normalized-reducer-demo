import makeNormalizedSlice from 'normalized-reducer';

import schema from './schema';
import { State } from './state';

export const {
  actionCreators,
  selectors,
  emptyState,
  actionTypes,
  reducer,
} = makeNormalizedSlice<State>(schema);




