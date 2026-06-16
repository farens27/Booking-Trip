import { readLocalJson, writeLocalJson } from "./local-storage";

export const NEWSLETTER_SUBSCRIBERS_STORAGE_KEY =
  "tripexplorer.newsletterSubscribers";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function listNewsletterSubscribers() {
  return readLocalJson<NewsletterSubscriber[]>(
    NEWSLETTER_SUBSCRIBERS_STORAGE_KEY,
    []
  );
}

export function addNewsletterSubscriber(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const subscribers = listNewsletterSubscribers();
  const exists = subscribers.some(
    (subscriber) => subscriber.email === normalizedEmail
  );

  if (exists) {
    return {
      status: "duplicate" as const,
      subscriber: subscribers.find(
        (subscriber) => subscriber.email === normalizedEmail
      ),
    };
  }

  const subscriber: NewsletterSubscriber = {
    id: `newsletter-${Date.now()}`,
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  writeLocalJson(NEWSLETTER_SUBSCRIBERS_STORAGE_KEY, [
    subscriber,
    ...subscribers,
  ]);

  return { status: "created" as const, subscriber };
}

export function removeNewsletterSubscriber(id: string) {
  const subscribers = listNewsletterSubscribers().filter(
    (subscriber) => subscriber.id !== id
  );
  writeLocalJson(NEWSLETTER_SUBSCRIBERS_STORAGE_KEY, subscribers);
}
