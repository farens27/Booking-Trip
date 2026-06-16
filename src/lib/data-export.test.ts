import { beforeEach, describe, expect, it, vi } from "vitest";
import { LOCAL_AUTH_STORAGE_KEY } from "./auth";
import { CONFIRMED_BOOKINGS_STORAGE_KEY } from "./dashboard";
import {
  createLocalDataBackup,
  getLocalPreviewStorageKeys,
  parseLocalDataBackup,
  resetAllLocalPreviewData,
  restoreLocalDataBackup,
} from "./data-export";

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

describe("data export helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("lists only TripExplorer preview keys", () => {
    expect(
      getLocalPreviewStorageKeys().every((key) =>
        key.startsWith("tripexplorer.")
      )
    ).toBe(true);
  });

  it("creates backup with known keys", () => {
    window.localStorage.setItem(
      LOCAL_AUTH_STORAGE_KEY,
      JSON.stringify({ role: "USER" })
    );
    const backup = createLocalDataBackup();

    expect(backup.version).toBe(1);
    expect(backup.data[LOCAL_AUTH_STORAGE_KEY]).toEqual({ role: "USER" });
  });

  it("parses and rejects backups", () => {
    const backup = createLocalDataBackup();

    expect(parseLocalDataBackup(JSON.stringify(backup)).version).toBe(1);
    expect(() => parseLocalDataBackup("not-json")).toThrow(
      "Invalid backup JSON"
    );
    expect(() =>
      parseLocalDataBackup(JSON.stringify({ version: 999 }))
    ).toThrow("Unsupported backup format");
  });

  it("restores and resets backup data", () => {
    const backup = createLocalDataBackup();
    backup.data[CONFIRMED_BOOKINGS_STORAGE_KEY] = [
      { confirmationNumber: "TRIP" },
    ];

    restoreLocalDataBackup(backup);
    expect(
      JSON.parse(
        window.localStorage.getItem(CONFIRMED_BOOKINGS_STORAGE_KEY) ?? "[]"
      )
    ).toHaveLength(1);

    resetAllLocalPreviewData();
    expect(
      window.localStorage.getItem(CONFIRMED_BOOKINGS_STORAGE_KEY)
    ).toBeNull();
  });
});
