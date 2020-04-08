import { reducer as entitiesReducer } from './entities';
import { State } from './state';

export default function rootReducer(state: State, action: { type: string }) {
  return {
    entities: entitiesReducer(state.entities, action),
  }
}

