import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  Cloud, GitBranch, Activity, Cpu, MemoryStick, Timer, Download,
  TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Github, Bell,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { revenueSeries, trafficSeries, activities, pipelineRuns } from "@/lib/mock";

const chartTooltipStyle = {
  background: "hsl(160 60% 6% / 0.95)",
  border: "1px solid hsl(160 30% 22%)",
  borderRadius: 10,
  fontSize: 12,
  color: "white",
} as const;

const kpis = [
  { label: "Revenue (MTD)", value: 248320, prefix: "$", icon: DollarSign, delta: "+18.2%", up: true, tone: "from-emerald-400 to-teal-500" },
  { label: "Active users", value: 12842, icon: Users, delta: "+6.4%", up: true, tone: "from-amber-300 to-amber-500" },
  { label: "Deployments", value: 1284, icon: Cloud, delta: "+4 today", up: true, tone: "from-sky-400 to-indigo-500" },
  { label: "Avg uptime", value: 99.98, suffix: "%", decimals: 2, icon: Activity, delta: "30d", up: true, tone: "from-fuchsia-400 to-violet-500" },
];

const systemMetrics = [
  { label: "CPU", value: 38, icon: Cpu, color: "hsl(158 75% 50%)" },
  { label: "Memory", value: 64, icon: MemoryStick, color: "hsl(44 70% 55%)" },
  { label: "API p95", value: 142, suffix: "ms", icon: Timer, color: "hsl(200 80% 55%)", max: 500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pt-2">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> All systems operational</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Welcome back, Sai 👋</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening across your Azure infrastructure today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Bell className="h-4 w-4" />}>Subscribe</Button>
          <Button size="sm" icon={<Download className="h-4 w-4" />}>Export report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="relative overflow-hidden">
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${k.tone} opacity-25 blur-2xl`} />
            <div className="flex items-start justify-between">
              <k.icon className="h-5 w-5 text-muted-foreground" />
              <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[10px] ${k.up ? "bg-success/15 text-success" : "bg-danger/15 text-danger"}`}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">
              <AnimatedCounter value={k.value} prefix={k.prefix ?? ""} suffix={k.suffix ?? ""} decimals={k.decimals ?? 0} />
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Revenue & growth"
            description="Last 12 months · combined revenue and active users"
            action={<Badge tone="success"><TrendingUp className="h-3 w-3" />+18.2%</Badge>}
          />
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(158 75% 50%)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="hsl(158 75% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="usr" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(44 70% 55%)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(44 70% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 30% 50% / 0.15)" />
                <XAxis dataKey="month" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(158 75% 50%)" strokeWidth={2} fill="url(#rev)" />
                <Area type="monotone" dataKey="users" stroke="hsl(44 70% 55%)" strokeWidth={2} fill="url(#usr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* System metrics */}
        <Card>
          <SectionTitle title="System health" description="Production · East US" />
          <div className="space-y-5">
            {systemMetrics.map((m) => {
              const pct = m.max ? (m.value / m.max) * 100 : m.value;
              return (
                <div key={m.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium"><m.icon className="h-4 w-4 text-muted-foreground" />{m.label}</span>
                    <span className="font-mono text-xs">{m.value}{m.suffix ?? "%"}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: m.color }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">Instances</p>
              <p className="mt-1 font-display text-xl font-bold">3 / 5</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">Region</p>
              <p className="mt-1 font-display text-xl font-bold">East US</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Traffic */}
        <Card className="lg:col-span-2">
          <SectionTitle title="Traffic · last 24 hours" description="Requests vs. errors" />
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={trafficSeries} margin={{ left: -10, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 30% 50% / 0.15)" />
                <XAxis dataKey="hour" stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="requests" fill="hsl(158 75% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errors" fill="hsl(0 75% 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* GitHub activity */}
        <Card>
          <SectionTitle title="GitHub activity" description="saishekar555/zenflow-dashboard" action={<Github className="h-4 w-4 text-muted-foreground" />} />
          <div className="h-40">
            <ResponsiveContainer>
              <LineChart data={revenueSeries.map((r, i) => ({ x: i, commits: 6 + Math.round(Math.sin(i) * 4 + i) }))}>
                <Line type="monotone" dataKey="commits" stroke="hsl(158 75% 50%)" strokeWidth={2.5} dot={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { l: "Commits", v: "418" }, { l: "PRs", v: "62" }, { l: "Stars", v: "127" },
            ].map((x) => (
              <div key={x.l} className="rounded-lg bg-muted/40 p-2">
                <p className="font-display text-base font-bold">{x.v}</p>
                <p className="font-mono text-[10px] uppercase text-muted-foreground">{x.l}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity timeline + Recent pipelines */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Activity timeline" description="Latest events across your stack" />
          <ul className="relative space-y-4 pl-5">
            <span className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
            {activities.map((a) => (
              <li key={a.action} className="relative">
                <span className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full gradient-emerald shadow-md" />
                <p className="text-sm"><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.action}</span></p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{a.when}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Recent pipelines" description="Last 6 runs" action={<GitBranch className="h-4 w-4 text-muted-foreground" />} />
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-2 py-2">Run</th><th className="px-2 py-2">Branch</th><th className="px-2 py-2">Status</th><th className="px-2 py-2 text-right">Duration</th></tr>
              </thead>
              <tbody>
                {pipelineRuns.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-2 py-2.5 font-mono text-xs">{r.id}</td>
                    <td className="px-2 py-2.5 font-mono text-xs">{r.branch}</td>
                    <td className="px-2 py-2.5">
                      <Badge tone={r.status === "success" ? "success" : r.status === "failed" ? "danger" : "info"}>{r.status}</Badge>
                    </td>
                    <td className="px-2 py-2.5 text-right font-mono text-xs">{r.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
