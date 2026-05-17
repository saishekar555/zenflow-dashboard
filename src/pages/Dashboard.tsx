import { Card, SectionTitle } from "@/components/Card";
import { useLocalStorage } from "@/lib/storage";
import {
  CheckSquare,
  Target,
  FolderKanban,
  TrendingUp,
  ArrowUpRight,
  BookOpen,
  Github,
  Mail,
  Calendar as CalendarIcon,
  Link as LinkIcon,
} from "lucide-react";
import type { Task } from "./Tasks";
import type { Goal } from "./Goals";
import type { Project } from "./Projects";

const quickLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Inbox", href: "https://mail.google.com", icon: Mail },
  { label: "Calendar", href: "https://calendar.google.com", icon: CalendarIcon },
  { label: "Docs", href: "https://docs.google.com", icon: BookOpen },
];

const learningRoadmap = [
  { stage: "Foundations", item: "TypeScript & React patterns", progress: 100 },
  { stage: "Building", item: "System design fundamentals", progress: 65 },
  { stage: "Mastery", item: "Cloud architecture (Azure)", progress: 30 },
  { stage: "Exploration", item: "AI-assisted engineering", progress: 15 },
];

export default function Dashboard() {
  const [tasks] = useLocalStorage<Task[]>("tasks", []);
  const [goals] = useLocalStorage<Goal[]>("goals", []);
  const [projects] = useLocalStorage<Project[]>("projects", []);

  const completedToday = tasks.filter((t) => t.done).length;
  const activeGoals = goals.filter((g) => g.progress < 100).length;
  const activeProjects = projects.filter((p) => p.status !== "Done").length;
  const totalProgress =
    goals.length > 0
      ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length)
      : 0;

  const stats = [
    { label: "Tasks done", value: completedToday, icon: CheckSquare, tone: "from-emerald-400 to-teal-500" },
    { label: "Active goals", value: activeGoals, icon: Target, tone: "from-fuchsia-400 to-violet-500" },
    { label: "Projects", value: activeProjects, icon: FolderKanban, tone: "from-sky-400 to-indigo-500" },
    { label: "Avg progress", value: `${totalProgress}%`, icon: TrendingUp, tone: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl" />
        <p className="text-sm text-muted-foreground">Welcome back 👋</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Let's make today productive.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Track tasks, capture ideas, ship projects and grow your skills — all in one focused space.
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.tone} opacity-30 blur-2xl`} />
            <s.icon className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-3xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <SectionTitle title="This week" description="A simple snapshot of your days." />
          <MiniCalendar />
        </Card>

        {/* Quick Links */}
        <Card>
          <SectionTitle title="Quick links" />
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <l.icon className="h-4 w-4 text-muted-foreground" />
                  {l.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-45" />
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning Roadmap */}
      <Card>
        <SectionTitle
          title="Learning roadmap"
          description="Stay on the path. Small steps, every week."
          action={<LinkIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <div className="space-y-4">
          {learningRoadmap.map((r) => (
            <div key={r.item}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{r.item}</span>
                <span className="text-xs text-muted-foreground">{r.stage} · {r.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${r.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MiniCalendar() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => {
        const isToday = d.toDateString() === today.toDateString();
        return (
          <div
            key={d.toISOString()}
            className={`rounded-xl border p-3 text-center transition-all ${
              isToday
                ? "border-transparent bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                : "border-border bg-muted/30"
            }`}
          >
            <p className="text-[10px] uppercase tracking-wide opacity-70">
              {d.toLocaleDateString(undefined, { weekday: "short" })}
            </p>
            <p className="mt-1 text-lg font-semibold">{d.getDate()}</p>
          </div>
        );
      })}
    </div>
  );
}
