import { useRef, useState } from "react";
import { Card, SectionTitle } from "@/components/Card";
import { useTheme } from "@/lib/theme";
import { Download, Moon, Sun, Trash2, Upload } from "lucide-react";

const DATA_KEYS = ["tasks", "notes", "goals", "projects"] as const;

export default function Settings() {
  const { theme, toggle } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const clearAll = () => {
    if (!confirm("Clear all local data (tasks, notes, goals, projects)?")) return;
    DATA_KEYS.forEach((k) => localStorage.removeItem(k));
    location.reload();
  };

  const exportData = () => {
    const payload: Record<string, unknown> = {
      app: "flow-dashboard",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: {} as Record<string, unknown>,
    };
    DATA_KEYS.forEach((k) => {
      const raw = localStorage.getItem(k);
      (payload.data as Record<string, unknown>)[k] = raw ? JSON.parse(raw) : null;
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `flow-backup-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ kind: "ok", text: "Backup downloaded." });
  };

  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const data = parsed?.data ?? parsed;
      if (!data || typeof data !== "object") throw new Error("Invalid file format");
      if (
        !confirm("This will replace your current tasks, notes, goals and projects. Continue?")
      ) {
        return;
      }
      DATA_KEYS.forEach((k) => {
        if (k in data && data[k] !== null && data[k] !== undefined) {
          localStorage.setItem(k, JSON.stringify(data[k]));
        }
      });
      setMessage({ kind: "ok", text: "Data restored. Reloading…" });
      setTimeout(() => location.reload(), 600);
    } catch (e) {
      setMessage({
        kind: "err",
        text: `Could not import: ${e instanceof Error ? e.message : "invalid file"}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle title="Appearance" description="Tune how Flow looks." />
        <button
          onClick={toggle}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 transition hover:bg-muted"
        >
          <span className="flex items-center gap-3 text-sm font-medium">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {theme === "dark" ? "Dark" : "Light"} mode
          </span>
          <span className="text-xs text-muted-foreground">Click to toggle</span>
        </button>
      </Card>

      <Card>
        <SectionTitle
          title="Data"
          description="Everything is stored locally in your browser. Back it up or move it between devices."
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportData}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            <Upload className="h-4 w-4" />
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importData(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/25 dark:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
            Clear all data
          </button>
        </div>
        {message && (
          <p
            className={`mt-3 text-xs ${
              message.kind === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </Card>

      <Card>
        <SectionTitle title="About" />
        <p className="text-sm text-muted-foreground">
          Flow is a lightweight, frontend-only personal dashboard. Built with React, Vite, TypeScript and Tailwind CSS — deployable as static files to any host (including Azure Linux Web App).
        </p>
      </Card>
    </div>
  );
}
