import { State, EntitiesByType, Entities } from 'normalized-reducer';

export interface Input {
  entities: EntitiesByType
}

export const deriveStateFromNormalizrData = <T extends State>(args: Input): T => {
  const { entities: entitiesByType } = args;

  const state: State = {
    entities: {},
    ids: {}
  };

  Object.entries<Entities>(entitiesByType).forEach(([type, entities]) => {
    state.entities[type] = entities;
    state.ids[type] = Object.keys(entities);
  });

  return state as T;
};
