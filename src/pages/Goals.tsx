import { useState } from "react";
import { Card, SectionTitle } from "@/components/Card";
import { useLocalStorage } from "@/lib/storage";
import { Plus, Trash2, Target } from "lucide-react";

export type Goal = {
  id: string;
  title: string;
  progress: number;
  due?: string;
};

export default function Goals() {
  const [goals, setGoals] = useLocalStorage<Goal[]>("goals", []);
  const [title, setTitle] = useState("");

  const add = () => {
    const t = title.trim();
    if (!t) return;
    setGoals([{ id: crypto.randomUUID(), title: t, progress: 0 }, ...goals]);
    setTitle("");
  };
  const update = (id: string, patch: Partial<Goal>) =>
    setGoals(goals.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  const remove = (id: string) => setGoals(goals.filter((g) => g.id !== id));

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle title="Goals" description="What are you aiming at?" />
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. Ship v1 of dashboard"
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

      {goals.length === 0 ? (
        <Card>
          <div className="grid place-items-center gap-2 py-12 text-center text-sm text-muted-foreground">
            <Target className="h-8 w-8" />
            No goals yet. Set one above.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((g) => (
            <Card key={g.id} className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <input
                  value={g.title}
                  onChange={(e) => update(g.id, { title: e.target.value })}
                  className="flex-1 bg-transparent text-base font-semibold outline-none"
                />
                <button
                  onClick={() => remove(g.id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{g.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={g.progress}
                  onChange={(e) => update(g.id, { progress: Number(e.target.value) })}
                  className="mt-2 w-full accent-[oklch(0.58_0.19_280)]"
                />
              </div>
              <input
                type="date"
                value={g.due ?? ""}
                onChange={(e) => update(g.id, { due: e.target.value })}
                className="rounded-lg border border-border bg-muted/40 px-2 py-1 text-xs outline-none"
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
