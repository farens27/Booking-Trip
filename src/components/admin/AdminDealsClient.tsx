"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createAdminDealDraft,
  deleteAdminDeal,
  listAdminDeals,
  saveAdminDeal,
} from "@/lib/admin";
import { Deal } from "@/types";

export function AdminDealsClient() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const refreshDeals = () => setDeals(listAdminDeals());

  useEffect(() => {
    refreshDeals();
  }, []);

  const handleDelete = (id: string) => {
    deleteAdminDeal(id);
    refreshDeals();
    toast.success("Deal removed locally");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">Promotion CRUD</p>
            <h2 className="text-2xl font-bold">Deals</h2>
          </div>
          <Button
            type="button"
            onClick={() => setEditingDeal(createAdminDealDraft())}
            className="gradient-primary gradient-primary-hover text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add deal
          </Button>
        </div>

        <div className="space-y-3">
          {deals.map((deal) => (
            <div key={deal.id} className="rounded-2xl border border-border p-4">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="font-bold text-foreground">
                    {deal.destination}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {deal.country} · ${deal.discountedPrice} from $
                    {deal.originalPrice} · {deal.discount}% off
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDeal(deal)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(deal.id)}
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

      <DealForm
        deal={editingDeal}
        onCancel={() => setEditingDeal(null)}
        onSaved={() => {
          setEditingDeal(null);
          refreshDeals();
        }}
      />
    </div>
  );
}

function DealForm({
  deal,
  onCancel,
  onSaved,
}: {
  deal: Deal | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<Deal | null>(deal);

  useEffect(() => {
    setDraft(deal);
  }, [deal]);

  if (!draft) {
    return (
      <aside className="h-fit rounded-3xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
        Select a deal to edit or add a new one.
      </aside>
    );
  }

  const updateDraft = (updates: Partial<Deal>) =>
    setDraft({ ...draft, ...updates });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAdminDeal(draft);
    toast.success("Deal saved locally");
    onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5"
    >
      <h2 className="text-xl font-bold">Edit deal</h2>
      <div className="mt-5 grid gap-4">
        <Field
          label="Destination"
          value={draft.destination}
          onChange={(value) => updateDraft({ destination: value })}
        />
        <Field
          label="Country"
          value={draft.country}
          onChange={(value) => updateDraft({ country: value })}
        />
        <Field
          label="Image URL"
          value={draft.image}
          onChange={(value) => updateDraft({ image: value })}
        />
        <Field
          label="Original Price"
          type="number"
          value={String(draft.originalPrice)}
          onChange={(value) => updateDraft({ originalPrice: Number(value) })}
        />
        <Field
          label="Discounted Price"
          type="number"
          value={String(draft.discountedPrice)}
          onChange={(value) => updateDraft({ discountedPrice: Number(value) })}
        />
        <Field
          label="Discount"
          type="number"
          value={String(draft.discount)}
          onChange={(value) => updateDraft({ discount: Number(value) })}
        />
        <Field
          label="End Date"
          type="date"
          value={draft.endDate}
          onChange={(value) => updateDraft({ endDate: value })}
        />
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
  const id = `deal-${label.toLowerCase().replaceAll(" ", "-")}`;

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
