import { useRef, useState } from "react";
import { Card, SectionTitle, Button, Badge } from "@/components/ui/primitives";
import { useTheme } from "@/lib/theme";
import { Download, FileJson, Moon, Sun, Trash2, Upload, Bell, Shield, User, Globe } from "lucide-react";

const DATA_KEYS = ["tasks", "notes", "goals", "projects"] as const;

export default function Settings() {
  const { theme, toggle } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (!/\.json$/i.test(f.name) && f.type !== "application/json") {
      setMessage({ kind: "err", text: "Please drop a .json backup file." });
      return;
    }
    importData(f);
  };

  const clearAll = () => {
    if (!confirm("Clear all local data?")) return;
    DATA_KEYS.forEach((k) => localStorage.removeItem(k));
    setMessage({ kind: "ok", text: "Local data cleared." });
  };

  const exportData = () => {
    const payload: Record<string, unknown> = {
      app: "zenflow-dashboard",
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
    a.download = `zenflow-backup-${stamp}.json`;
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
      if (!confirm("This will replace your current local data. Continue?")) return;
      DATA_KEYS.forEach((k) => {
        if (k in data && data[k] !== null && data[k] !== undefined) {
          localStorage.setItem(k, JSON.stringify(data[k]));
        }
      });
      setMessage({ kind: "ok", text: "Data restored." });
    } catch (e) {
      setMessage({ kind: "err", text: `Could not import: ${e instanceof Error ? e.message : "invalid file"}` });
    }
  };

  return (
    <div className="space-y-6 pt-2">
      <div>
        <Badge>Settings</Badge>
        <h1 className="mt-2 font-display text-2xl font-bold">Workspace settings</h1>
        <p className="text-sm text-muted-foreground">Appearance, account, notifications and data management.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <SectionTitle title="Appearance" description="Light / dark theme." action={<Globe className="h-4 w-4 text-muted-foreground" />} />
          <button
            onClick={toggle}
            className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 transition hover:bg-muted"
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === "dark" ? "Dark" : "Light"} mode
            </span>
            <span className="text-xs text-muted-foreground">Toggle</span>
          </button>
        </Card>

        <Card>
          <SectionTitle title="Profile" action={<User className="h-4 w-4 text-muted-foreground" />} />
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full gradient-prestige font-display text-base font-bold text-primary-foreground">SS</div>
            <div>
              <p className="font-display font-semibold">Sai Shekar</p>
              <p className="font-mono text-[11px] text-muted-foreground">admin · all access</p>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Notifications" action={<Bell className="h-4 w-4 text-muted-foreground" />} />
          {["Deployment events", "Pipeline failures", "Cost anomalies"].map((n) => (
            <label key={n} className="flex items-center justify-between py-2 text-sm">
              <span>{n}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
            </label>
          ))}
        </Card>
      </div>

      <Card>
        <SectionTitle title="Data" description="Backup or restore your local workspace." action={<Shield className="h-4 w-4 text-muted-foreground" />} />
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportData} icon={<Download className="h-4 w-4" />}>Export JSON</Button>
          <Button onClick={clearAll} variant="danger" icon={<Trash2 className="h-4 w-4" />}>Clear all data</Button>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Import JSON backup. Click, press Enter, or drop a file here."
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; if (!dragOver) setDragOver(true); }}
          onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); if (e.currentTarget === e.target) setDragOver(false); }}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary ${
            dragOver ? "border-primary bg-primary/10 scale-[1.01]" : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50"
          }`}
        >
          <div className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${dragOver ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {dragOver ? <FileJson className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
          </div>
          <p className="text-sm font-medium">{dragOver ? "Drop to restore backup" : "Drag & drop a JSON backup"}</p>
          <p className="text-xs text-muted-foreground">or <span className="underline">click / press Enter</span> to choose a file</p>
        </div>

        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden"
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
        {message && (
          <p className={`mt-3 text-xs ${message.kind === "ok" ? "text-success" : "text-danger"}`}>{message.text}</p>
        )}
      </Card>
    </div>
  );
}
