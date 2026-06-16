import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getLocalAuthSession,
  isAdmin,
  isSignedIn,
  setLocalRole,
  signInLocal,
  signOutLocal,
} from "./auth";

function mockWindowStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
  });
}

describe("local auth helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("starts signed out", () => {
    expect(getLocalAuthSession()).toBeNull();
    expect(isSignedIn()).toBe(false);
  });

  it("signs in as user", () => {
    const session = signInLocal("USER");

    expect(session.role).toBe("USER");
    expect(isSignedIn()).toBe(true);
    expect(isAdmin()).toBe(false);
  });

  it("switches role to admin", () => {
    signInLocal("USER");
    const session = setLocalRole("ADMIN");

    expect(session.role).toBe("ADMIN");
    expect(isAdmin()).toBe(true);
  });

  it("signs out", () => {
    signInLocal("ADMIN");
    signOutLocal();

    expect(getLocalAuthSession()).toBeNull();
  });
});
