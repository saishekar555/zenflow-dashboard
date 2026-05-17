import { useState } from "react";
import { Card, SectionTitle } from "@/components/Card";
import { useLocalStorage } from "@/lib/storage";
import { Plus, Trash2, Check } from "lucide-react";

export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [input, setInput] = useState("");

  const add = () => {
    const t = input.trim();
    if (!t) return;
    setTasks([{ id: crypto.randomUUID(), title: t, done: false, createdAt: Date.now() }, ...tasks]);
    setInput("");
  };

  const toggle = (id: string) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle
          title="Daily tasks"
          description={`${remaining} remaining · ${tasks.length} total`}
        />
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a task and press Enter…"
            className="flex-1 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
          <button
            onClick={add}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </Card>

      <Card>
        {tasks.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No tasks yet. Add your first one above.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <button
                  onClick={() => toggle(t.id)}
                  className={`grid h-6 w-6 place-items-center rounded-md border transition ${
                    t.done
                      ? "border-transparent bg-gradient-to-br from-primary to-accent text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {t.done && <Check className="h-4 w-4" />}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    t.done ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => remove(t.id)}
                  className="text-muted-foreground transition hover:text-red-500"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
