import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors, State } from '../store';
import { Id } from '../model';

export function useCreateUser() {
  const dispatch = useDispatch();
  return useCallback((user: {firstName: string, lastName: string}) => {
    dispatch(actions.createUser(user));
  }, [dispatch]);
}


export function useCreateTask() {
  const dispatch = useDispatch();
  return useCallback((task: { title: string, creatorId: Id, statusId: Id, description?: string }) => {
    dispatch(actions.createTask(task));
  }, [dispatch]);
}
export function useUpdateTask() {
  const dispatch = useDispatch();
  return useCallback((id: Id, task: { title?: string, description?: string }) => {
    dispatch(actions.updateTask(id, task));
  }, [dispatch]);
}
export function useDeleteTask() {
  const dispatch = useDispatch();
  return useCallback((id: Id) => {
    dispatch(actions.deleteTask(id));
  }, [dispatch]);
}


export function useCreateStatus() {
  const dispatch = useDispatch();
  return useCallback((status: { title: string, boardId: Id }) => {
    dispatch(actions.createStatus(status));
  }, [dispatch]);
}
export function useUpdateStatus() {
  const dispatch = useDispatch();
  return useCallback((id: Id, status: { title?: string }) => {
    dispatch(actions.updateStatus(id, status));
  }, [dispatch]);
}
export function useDeleteStatus() {
  const dispatch = useDispatch();
  return useCallback((id: Id) => {
    dispatch(actions.deleteStatus(id));
  }, [dispatch]);
}



export function useCreateBoard() {
  const dispatch = useDispatch();
  return useCallback((board: { title: string }) => {
    dispatch(actions.createBoard(board));
  }, [dispatch]);
}
export function useCreateTag() {
  const dispatch = useDispatch();
  return useCallback((tag: { value: string }) => {
    dispatch(actions.createTag(tag));
  }, [dispatch]);
}
export function useCreateRootComment() {
  const dispatch = useDispatch();
  return useCallback((comment: { value: string, taskId: Id }) => {
    dispatch(actions.createRootComment(comment));
  }, [dispatch]);
}
export function useCreateChildComment() {
  const dispatch = useDispatch();
  return useCallback((comment: { value: string, parentCommentId: Id }) => {
    dispatch(actions.createChildComment(comment));
  }, [dispatch]);
}



export function useMoveBoardStatus() {
  const dispatch = useDispatch();
  return useCallback((boardId: Id, src: number, dest: number) => {
    dispatch(actions.moveBoardStatus(boardId, src, dest));
  }, [dispatch]);
}

export function useMoveBoardStatusTask() {
  const dispatch = useDispatch();
  return useCallback((taskId: Id, srcStatusId: Id, src: number, destStatusId: Id, dest: number) => {
    dispatch(actions.moveStatusTask(taskId, srcStatusId, src, destStatusId, dest));
  }, [dispatch]);
}


export function useUserIds() {
  return useSelector((state: State) => selectors.getUserIds(state));
}
export function useTaskIds() {
  return useSelector((state: State) => selectors.getTaskIds(state));
}
export function useStatusIds() {
  return useSelector((state: State) => selectors.getStatusIds(state));
}
export function useBoardIds() {
  return useSelector((state: State) => selectors.getBoardIds(state));
}
export function useTagIds() {
  return useSelector((state: State) => selectors.getTagIds(state));
}
export function useCommentIds() {
  return useSelector((state: State) => selectors.getCommentIds(state));
}


export function useUser(id: Id) {
  return useSelector((state: State) => selectors.getUser(state, { id }));
}
export function useTask(id: Id) {
  return useSelector((state: State) => selectors.getTask(state, { id }));
}
export function useStatus(id: Id) {
  return useSelector((state: State) => selectors.getStatus(state, { id }));
}
export function useBoard(id: Id) {
  return useSelector((state: State) => selectors.getBoard(state, { id }));
}
export function useTag(id: Id) {
  return useSelector((state: State) => selectors.getTag(state, { id }));
}
export function useComment(id: Id) {
  return useSelector((state: State) => selectors.getComment(state, { id }));
}
