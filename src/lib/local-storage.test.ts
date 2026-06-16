import { beforeEach, describe, expect, it, vi } from "vitest";
import { readLocalJson, removeLocalKey, writeLocalJson } from "./local-storage";

function mockWindowStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
  });
  return store;
}

describe("local storage adapter", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("writes and reads JSON values", () => {
    writeLocalJson("test", { value: 1 });

    expect(readLocalJson("test", { value: 0 })).toEqual({ value: 1 });
  });

  it("returns fallback for missing values", () => {
    expect(readLocalJson("missing", ["fallback"])).toEqual(["fallback"]);
  });

  it("removes corrupt JSON and returns fallback", () => {
    window.localStorage.setItem("broken", "not-json");

    expect(readLocalJson("broken", [])).toEqual([]);
    expect(window.localStorage.getItem("broken")).toBeNull();
  });

  it("removes keys", () => {
    writeLocalJson("test", { value: 1 });
    removeLocalKey("test");

    expect(readLocalJson("test", null)).toBeNull();
  });
});
