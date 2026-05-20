import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { Activity, Cpu, MemoryStick, Timer, AlertTriangle, CheckCircle2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { trafficSeries } from "@/lib/mock";

const tooltip = { background: "hsl(160 60% 6% / 0.95)", border: "1px solid hsl(160 30% 22%)", borderRadius: 10, fontSize: 12, color: "white" } as const;

const services = [
  { name: "API Gateway", uptime: 99.99, status: "Operational" },
  { name: "Auth Service", uptime: 99.97, status: "Operational" },
  { name: "Web App", uptime: 99.98, status: "Operational" },
  { name: "Worker Queue", uptime: 99.85, status: "Degraded" },
  { name: "Database", uptime: 100, status: "Operational" },
  { name: "CDN / Front Door", uptime: 100, status: "Operational" },
];

const alerts = [
  { sev: "warn", title: "Worker queue latency", desc: "p95 over 2s for 6 minutes", time: "12 min ago" },
  { sev: "info", title: "Auto-scale event", desc: "Production scaled 2 → 3 instances", time: "1 h ago" },
  { sev: "ok", title: "Incident resolved", desc: "API gateway latency back to normal", time: "3 h ago" },
];

export default function Monitoring() {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Live</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">System monitoring</h1>
          <p className="text-sm text-muted-foreground">Uptime, latency and service health across the fleet.</p>
        </div>
        <Button size="sm" variant="outline">Last 24h</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "CPU avg", v: "38%", i: Cpu },
          { l: "Memory avg", v: "64%", i: MemoryStick },
          { l: "API p95", v: "142ms", i: Timer },
          { l: "Uptime", v: "99.98%", i: Activity },
        ].map((s) => (
          <Card key={s.l}>
            <s.i className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 font-display text-3xl font-bold">{s.v}</p>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{s.l}</p>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle title="API latency (ms) — 24h" />
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={trafficSeries.map((t, i) => ({ ...t, latency: 100 + Math.round(Math.sin(i / 3) * 30 + Math.random() * 20) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 30% 50% / 0.15)" />
              <XAxis dataKey="hour" stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Line type="monotone" dataKey="latency" stroke="hsl(158 75% 50%)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Services" />
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{s.uptime}% · 30d uptime</p>
                </div>
                <Badge tone={s.status === "Operational" ? "success" : "warning"}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle title="Recent alerts" />
          <ul className="space-y-2">
            {alerts.map((a) => (
              <li key={a.title} className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  a.sev === "warn" ? "bg-warning/15 text-warning" :
                  a.sev === "ok" ? "bg-success/15 text-success" :
                  "bg-info/15 text-info"
                }`}>
                  {a.sev === "ok" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
