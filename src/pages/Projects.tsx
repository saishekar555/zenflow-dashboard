import { useState } from "react";
import { Card, SectionTitle } from "@/components/Card";
import { useLocalStorage } from "@/lib/storage";
import { Plus, Trash2 } from "lucide-react";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Planning" | "In Progress" | "Done";
  progress: number;
};

const statuses: Project["status"][] = ["Planning", "In Progress", "Done"];

const statusColors: Record<Project["status"], string> = {
  Planning: "bg-sky-500/20 text-sky-600 dark:text-sky-300",
  "In Progress": "bg-amber-500/20 text-amber-600 dark:text-amber-300",
  Done: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300",
};

export default function Projects() {
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
  const [name, setName] = useState("");

  const add = () => {
    const n = name.trim();
    if (!n) return;
    setProjects([
      { id: crypto.randomUUID(), name: n, description: "", status: "Planning", progress: 0 },
      ...projects,
    ]);
    setName("");
  };
  const update = (id: string, patch: Partial<Project>) =>
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const remove = (id: string) => setProjects(projects.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle title="Projects" description="Track what you're building." />
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="New project name…"
            className="flex-1 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
          <button
            onClick={add}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </Card>

      {projects.length === 0 ? (
        <Card>
          <p className="py-12 text-center text-sm text-muted-foreground">
            No projects yet. Start one above.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <input
                  value={p.name}
                  onChange={(e) => update(p.id, { name: e.target.value })}
                  className="flex-1 bg-transparent text-lg font-semibold outline-none"
                />
                <button
                  onClick={() => remove(p.id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={p.description}
                onChange={(e) => update(p.id, { description: e.target.value })}
                placeholder="What's this project about?"
                className="min-h-20 w-full resize-none rounded-lg border border-border bg-muted/30 p-2 text-sm outline-none"
              />
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => update(p.id, { status: s })}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                      p.status === s ? statusColors[s] : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={p.progress}
                  onChange={(e) => update(p.id, { progress: Number(e.target.value) })}
                  className="w-full accent-[oklch(0.58_0.19_280)]"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
