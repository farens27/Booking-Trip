import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createAdminDestinationDraft,
  deleteAdminDestination,
  listAdminDestinations,
  resetAdminPreviewData,
  saveAdminDestination,
} from "./admin";
import { destinations } from "./data";

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

describe("admin helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("lists static destinations by default", () => {
    expect(listAdminDestinations()).toHaveLength(destinations.length);
  });

  it("saves local destination overrides", () => {
    const destination = { ...destinations[0], name: "Updated Bali" };
    saveAdminDestination(destination);

    expect(listAdminDestinations()[0].name).toBe("Updated Bali");
  });

  it("adds and deletes local destinations", () => {
    const draft = createAdminDestinationDraft();
    saveAdminDestination(draft);
    expect(listAdminDestinations().some((item) => item.id === draft.id)).toBe(
      true
    );

    deleteAdminDestination(draft.id);
    expect(listAdminDestinations().some((item) => item.id === draft.id)).toBe(
      false
    );
  });

  it("resets local admin preview data", () => {
    saveAdminDestination({ ...destinations[0], name: "Updated Bali" });
    resetAdminPreviewData();

    expect(listAdminDestinations()[0].name).toBe(destinations[0].name);
  });
});
