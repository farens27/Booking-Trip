"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  listNewsletterSubscribers,
  NewsletterSubscriber,
  removeNewsletterSubscriber,
} from "@/lib/newsletter";

export function AdminNewsletterClient() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  const refreshSubscribers = () => setSubscribers(listNewsletterSubscribers());

  useEffect(() => {
    refreshSubscribers();
  }, []);

  const removeSubscriber = (id: string) => {
    removeNewsletterSubscriber(id);
    refreshSubscribers();
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Local engagement</p>
        <h2 className="text-2xl font-bold">Newsletter subscribers</h2>
        <p className="mt-2 text-muted-foreground">
          Subscribers are saved in this browser only. No emails are sent yet.
        </p>
      </div>

      {subscribers.length > 0 ? (
        <div className="space-y-3">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  {subscriber.email}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Subscribed {new Date(subscriber.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeSubscriber(subscriber.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No local newsletter subscribers yet.
        </div>
      )}
    </section>
  );
}
