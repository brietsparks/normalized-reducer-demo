import { State as EntitiesState, emptyState as entitiesEmptyState } from './entities';

export interface State {
  entities: EntitiesState
}

export const emptyState = {
  entities: entitiesEmptyState
};
