import { readLocalJson, removeLocalKey, writeLocalJson } from "./local-storage";

export const LOCAL_AUTH_STORAGE_KEY = "tripexplorer.localAuth";

export type LocalUserRole = "USER" | "ADMIN";

export interface LocalAuthSession {
  id: string;
  name: string;
  role: LocalUserRole;
  signedInAt: string;
}

export function getLocalAuthSession() {
  return readLocalJson<LocalAuthSession | null>(LOCAL_AUTH_STORAGE_KEY, null);
}

export function signInLocal(role: LocalUserRole = "USER") {
  const session: LocalAuthSession = {
    id: "local-demo-user",
    name: role === "ADMIN" ? "Demo Admin" : "Demo Traveler",
    role,
    signedInAt: new Date().toISOString(),
  };

  writeLocalJson(LOCAL_AUTH_STORAGE_KEY, session);
  return session;
}

export function signOutLocal() {
  removeLocalKey(LOCAL_AUTH_STORAGE_KEY);
}

export function setLocalRole(role: LocalUserRole) {
  const currentSession = getLocalAuthSession();
  const nextSession: LocalAuthSession = {
    id: currentSession?.id ?? "local-demo-user",
    name: role === "ADMIN" ? "Demo Admin" : "Demo Traveler",
    role,
    signedInAt: currentSession?.signedInAt ?? new Date().toISOString(),
  };

  writeLocalJson(LOCAL_AUTH_STORAGE_KEY, nextSession);
  return nextSession;
}

export function isSignedIn() {
  return Boolean(getLocalAuthSession());
}

export function isAdmin() {
  return getLocalAuthSession()?.role === "ADMIN";
}
