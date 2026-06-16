"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createAdminDestinationDraft,
  deleteAdminDestination,
  listAdminDestinations,
  saveAdminDestination,
} from "@/lib/admin";
import { Destination } from "@/types";

export function AdminDestinationsClient() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);

  const refreshDestinations = async () => {
    try {
      const response = await fetch("/api/dev/destinations");
      if (!response.ok) throw new Error("Turso dev API unavailable");

      const data = (await response.json()) as { destinations: Destination[] };
      setDestinations(data.destinations);
    } catch {
      setDestinations(listAdminDestinations());
    }
  };

  useEffect(() => {
    void refreshDestinations();
  }, []);

  const startCreate = () =>
    setEditingDestination(createAdminDestinationDraft());

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/dev/destinations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Turso delete unavailable");

      await refreshDestinations();
      toast.success("Destination removed from Turso");
    } catch {
      deleteAdminDestination(id);
      await refreshDestinations();
      toast.success("Destination removed locally");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">Content CRUD</p>
            <h2 className="text-2xl font-bold">Destinations</h2>
          </div>
          <Button
            type="button"
            onClick={startCreate}
            className="gradient-primary gradient-primary-hover text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add destination
          </Button>
        </div>

        <div className="space-y-3">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="rounded-2xl border border-border p-4"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="font-bold text-foreground">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {destination.country} · {destination.region || "No region"}{" "}
                    · ${destination.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDestination(destination)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(destination.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DestinationForm
        destination={editingDestination}
        onCancel={() => setEditingDestination(null)}
        onSaved={async () => {
          setEditingDestination(null);
          await refreshDestinations();
        }}
      />
    </div>
  );
}

function DestinationForm({
  destination,
  onCancel,
  onSaved,
}: {
  destination: Destination | null;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState<Destination | null>(destination);

  useEffect(() => {
    setDraft(destination);
  }, [destination]);

  if (!draft) {
    return (
      <aside className="h-fit rounded-3xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
        Select a destination to edit or add a new one.
      </aside>
    );
  }

  const updateDraft = (updates: Partial<Destination>) =>
    setDraft({ ...draft, ...updates });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const destination = {
      ...draft,
      slug: draft.slug || draft.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || draft.id,
    };

    try {
      const response = await fetch("/api/dev/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination),
      });
      if (!response.ok) throw new Error("Turso save unavailable");

      toast.success("Destination saved to Turso");
    } catch {
      saveAdminDestination(destination);
      toast.success("Destination saved locally");
    }

    await onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5"
    >
      <h2 className="text-xl font-bold">Edit destination</h2>
      <div className="mt-5 grid gap-4">
        <Field
          label="Name"
          value={draft.name}
          onChange={(value) => updateDraft({ name: value })}
        />
        <Field
          label="Slug"
          value={draft.slug ?? ""}
          onChange={(value) => updateDraft({ slug: value })}
        />
        <Field
          label="Country"
          value={draft.country}
          onChange={(value) => updateDraft({ country: value })}
        />
        <Field
          label="Region"
          value={draft.region ?? ""}
          onChange={(value) => updateDraft({ region: value })}
        />
        <Field
          label="Image URL"
          value={draft.image}
          onChange={(value) => updateDraft({ image: value })}
        />
        <Field
          label="Price"
          type="number"
          value={String(draft.price)}
          onChange={(value) => updateDraft({ price: Number(value) })}
        />
        <Field
          label="Rating"
          type="number"
          value={String(draft.rating)}
          onChange={(value) => updateDraft({ rating: Number(value) })}
        />
        <div className="space-y-2">
          <Label htmlFor="destination-description">Description</Label>
          <textarea
            id="destination-description"
            value={draft.description ?? ""}
            onChange={(event) =>
              updateDraft({ description: event.target.value })
            }
            rows={4}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button
          type="submit"
          className="gradient-primary gradient-primary-hover text-white"
        >
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  const id = `destination-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </div>
  );
}
