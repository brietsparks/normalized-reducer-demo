import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';

import { Id, Role } from './model';

interface AuthValue {
  authId?: Id,
  role?: Role,
  setAuthId?: (authId: Id) => void,
  setRole?: (role: Role) => void,
}

export type SetAuthId = (authId: Id) => void;
export type SetRole = (role: Role) => void;

const authContext = createContext<AuthValue>({});

export interface Props {
  authId: Id,
  role: Role
  children: ReactNode
}
export default function AuthContextProvider({
  authId: initialAuthId,
  role: initialRole,
  children
}: Props) {
  const [authId, setAuthId] = useState<Id>(initialAuthId);
  useEffect(() => setAuthId(initialAuthId), [setAuthId, initialAuthId]);

  const [role, setRole] = useState<Role>(initialRole);
  useEffect(() => setRole(initialRole), [setRole, initialRole]);

  const value = { authId, setAuthId, role, setRole };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthId(): Id {
  const { authId } = useContext(authContext);
  return authId as Id;
}

export function useRole(): Role {
  const { role } = useContext(authContext);
  return role as Role;
}

export function useSetAuthId(authId: Id): SetAuthId {
  const { setAuthId } = useContext(authContext);
  return setAuthId as SetAuthId;
}

export function useSetRole(role: Role): SetRole {
  const { setRole } = useContext(authContext);
  return setRole as SetRole;
}
