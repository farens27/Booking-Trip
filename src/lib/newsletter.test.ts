import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  addNewsletterSubscriber,
  listNewsletterSubscribers,
  NEWSLETTER_SUBSCRIBERS_STORAGE_KEY,
  removeNewsletterSubscriber,
} from "./newsletter";

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

describe("newsletter helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("adds normalized subscribers", () => {
    const result = addNewsletterSubscriber(" USER@Example.COM ");

    expect(result.status).toBe("created");
    expect(listNewsletterSubscribers()[0].email).toBe("user@example.com");
  });

  it("prevents duplicates", () => {
    addNewsletterSubscriber("user@example.com");
    const duplicate = addNewsletterSubscriber(" USER@example.com ");

    expect(duplicate.status).toBe("duplicate");
    expect(listNewsletterSubscribers()).toHaveLength(1);
  });

  it("removes corrupt storage", () => {
    window.localStorage.setItem(NEWSLETTER_SUBSCRIBERS_STORAGE_KEY, "not-json");

    expect(listNewsletterSubscribers()).toEqual([]);
  });

  it("removes a subscriber by id", () => {
    const result = addNewsletterSubscriber("user@example.com");
    removeNewsletterSubscriber(result.subscriber!.id);

    expect(listNewsletterSubscribers()).toEqual([]);
  });
});
