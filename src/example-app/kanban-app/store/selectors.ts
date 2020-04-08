import { Id } from '../model';
import { State } from './state';
import { selectors as entitiesSelectors } from './entities';

export const getUserIds = (state: State) => entitiesSelectors.getUserIds(state.entities);
export const getTaskIds = (state: State) => entitiesSelectors.getTaskIds(state.entities);
export const getLaneIds = (state: State) => entitiesSelectors.getLaneIds(state.entities);
export const getBoardIds = (state: State) => entitiesSelectors.getBoardIds(state.entities);
export const getTagIds = (state: State) => entitiesSelectors.getTagIds(state.entities);
export const getCommentIds = (state: State) => entitiesSelectors.getCommentIds(state.entities);

export const getUser = (state: State, args: { id: Id }) => entitiesSelectors.getUser(state.entities, args);
export const getTask = (state: State, args: { id: Id }) => entitiesSelectors.getTask(state.entities, args);
export const getLane = (state: State, args: { id: Id }) => entitiesSelectors.getLane(state.entities, args);
export const getBoard = (state: State, args: { id: Id }) => entitiesSelectors.getBoard(state.entities, args);
export const getTag = (state: State, args: { id: Id }) => entitiesSelectors.getTag(state.entities, args);
export const getComment = (state: State, args: { id: Id }) => entitiesSelectors.getComment(state.entities, args);
