import { Card, SectionTitle } from "@/components/Card";
import { useTheme } from "@/lib/theme";
import { Moon, Sun, Trash2 } from "lucide-react";

export default function Settings() {
  const { theme, toggle } = useTheme();

  const clearAll = () => {
    if (!confirm("Clear all local data (tasks, notes, goals, projects)?")) return;
    ["tasks", "notes", "goals", "projects"].forEach((k) => localStorage.removeItem(k));
    location.reload();
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
        <SectionTitle title="Data" description="Everything is stored locally in your browser." />
        <button
          onClick={clearAll}
          className="flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/25 dark:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
          Clear all data
        </button>
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
