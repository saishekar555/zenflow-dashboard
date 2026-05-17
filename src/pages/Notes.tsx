import { useState } from "react";
import { Card, SectionTitle } from "@/components/Card";
import { useLocalStorage } from "@/lib/storage";
import { Plus, Trash2 } from "lucide-react";

type Note = { id: string; title: string; body: string; updatedAt: number };

export default function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);
  const active = notes.find((n) => n.id === activeId) ?? null;

  const create = () => {
    const n: Note = { id: crypto.randomUUID(), title: "Untitled", body: "", updatedAt: Date.now() };
    setNotes([n, ...notes]);
    setActiveId(n.id);
  };
  const update = (patch: Partial<Note>) => {
    if (!active) return;
    setNotes(notes.map((n) => (n.id === active.id ? { ...n, ...patch, updatedAt: Date.now() } : n)));
  };
  const remove = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    if (activeId === id) setActiveId(next[0]?.id ?? null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <Card className="h-fit">
        <SectionTitle
          title="Notes"
          action={
            <button
              onClick={create}
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow"
            >
              <Plus className="h-4 w-4" />
            </button>
          }
        />
        {notes.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No notes yet</p>
        ) : (
          <ul className="space-y-1">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setActiveId(n.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                    n.id === activeId ? "bg-primary/15 text-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="truncate">{n.title || "Untitled"}</span>
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(n.id);
                    }}
                    className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        {active ? (
          <div className="space-y-3">
            <input
              value={active.title}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full bg-transparent text-2xl font-semibold tracking-tight outline-none"
              placeholder="Note title"
            />
            <p className="text-xs text-muted-foreground">
              Updated {new Date(active.updatedAt).toLocaleString()}
            </p>
            <textarea
              value={active.body}
              onChange={(e) => update({ body: e.target.value })}
              placeholder="Start writing…"
              className="min-h-[400px] w-full resize-none rounded-xl border border-border bg-muted/30 p-4 text-sm outline-none ring-primary/30 focus:ring-2"
            />
          </div>
        ) : (
          <div className="grid h-64 place-items-center text-sm text-muted-foreground">
            Select or create a note
          </div>
        )}
      </Card>
    </div>
  );
}
