"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createLocalDataBackup,
  getLocalPreviewStorageKeys,
  parseLocalDataBackup,
  resetAllLocalPreviewData,
  restoreLocalDataBackup,
} from "@/lib/data-export";

export function AdminDataClient() {
  const [importJson, setImportJson] = useState("");
  const [lastExport, setLastExport] = useState("");

  const exportBackup = () => {
    const backup = createLocalDataBackup();
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `tripexplorer-local-backup-${backup.exportedAt.slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setLastExport(json);
    toast.success("Local backup exported", {
      description: "The JSON file includes only TripExplorer preview keys.",
    });
  };

  const importBackup = () => {
    try {
      const backup = parseLocalDataBackup(importJson);
      restoreLocalDataBackup(backup);
      toast.success("Local backup restored", {
        description: "Refresh open pages to see restored local preview data.",
      });
    } catch (error) {
      toast.error("Import failed", {
        description:
          error instanceof Error ? error.message : "Unknown import error.",
      });
    }
  };

  const resetData = () => {
    resetAllLocalPreviewData();
    setImportJson("");
    setLastExport("");
    toast.success("Local preview data reset", {
      description:
        "All known TripExplorer localStorage preview keys were removed.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
        <p className="text-sm font-semibold text-primary">Backup manager</p>
        <h2 className="mt-1 text-2xl font-bold">
          Export / Import local preview data
        </h2>
        <p className="mt-2 text-muted-foreground">
          This tool only manages browser-local TripExplorer preview data. It
          does not upload anything.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={exportBackup}
            className="gradient-primary gradient-primary-hover text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          <Button type="button" variant="destructive" onClick={resetData}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset local preview data
          </Button>
        </div>

        <div className="mt-8 space-y-2">
          <label
            htmlFor="backup-json"
            className="text-sm font-semibold text-foreground"
          >
            Paste backup JSON
          </label>
          <textarea
            id="backup-json"
            value={importJson}
            onChange={(event) => setImportJson(event.target.value)}
            rows={12}
            placeholder="Paste exported TripExplorer backup JSON here..."
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button
            type="button"
            variant="outline"
            onClick={importBackup}
            disabled={!importJson.trim()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import backup
          </Button>
        </div>

        {lastExport && (
          <details className="mt-8 rounded-2xl border border-border bg-muted/40 p-4">
            <summary className="cursor-pointer font-semibold text-foreground">
              Last exported JSON preview
            </summary>
            <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
              {lastExport}
            </pre>
          </details>
        )}
      </section>

      <aside className="h-fit rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
        <h2 className="text-xl font-bold">Included keys</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Export/import is limited to these known preview keys.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          {getLocalPreviewStorageKeys().map((key) => (
            <li
              key={key}
              className="rounded-xl bg-muted/50 px-3 py-2 font-mono text-xs"
            >
              {key}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
