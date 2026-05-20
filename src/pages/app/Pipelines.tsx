import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { pipelineRuns } from "@/lib/mock";
import { GitBranch, Play, Check, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

const stages = [
  { name: "Source", status: "ok" },
  { name: "Restore", status: "ok" },
  { name: "Build", status: "ok" },
  { name: "Test", status: "ok" },
  { name: "Artifact", status: "ok" },
  { name: "Deploy: Staging", status: "ok" },
  { name: "Approval", status: "wait" },
  { name: "Deploy: Production", status: "idle" },
];

const releaseHistory = [
  { v: "v1.4.2", env: "Production", time: "2 min ago", status: "success" },
  { v: "v1.4.1", env: "Production", time: "Yesterday", status: "success" },
  { v: "v1.4.0", env: "Production", time: "3 days ago", status: "success" },
  { v: "v1.3.9", env: "Production", time: "1 week ago", status: "rollback" },
  { v: "v1.3.8", env: "Production", time: "9 days ago", status: "success" },
];

export default function Pipelines() {
  const success = pipelineRuns.filter((r) => r.status === "success").length;
  const successPct = Math.round((success / pipelineRuns.length) * 100);
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge><GitBranch className="h-3 w-3" />Azure DevOps</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">CI/CD pipelines</h1>
          <p className="text-sm text-muted-foreground">Build & release across all repos.</p>
        </div>
        <Button size="sm" icon={<Play className="h-4 w-4" />}>Run pipeline</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><p className="font-mono text-[10px] uppercase text-muted-foreground">Success rate</p><p className="mt-1 font-display text-3xl font-bold text-success">{successPct}%</p></Card>
        <Card><p className="font-mono text-[10px] uppercase text-muted-foreground">Avg duration</p><p className="mt-1 font-display text-3xl font-bold">3m 52s</p></Card>
        <Card><p className="font-mono text-[10px] uppercase text-muted-foreground">Runs today</p><p className="mt-1 font-display text-3xl font-bold">24</p></Card>
        <Card><p className="font-mono text-[10px] uppercase text-muted-foreground">Failed (7d)</p><p className="mt-1 font-display text-3xl font-bold text-danger">2</p></Card>
      </div>

      <Card>
        <SectionTitle title="Release pipeline · v1.4.3-rc.1" description="Awaiting production approval" />
        <div className="flex flex-wrap items-center gap-2">
          {stages.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
                s.status === "ok" ? "border-success/30 bg-success/10 text-success" :
                s.status === "wait" ? "border-warning/30 bg-warning/10 text-warning" :
                "border-border bg-muted/40 text-muted-foreground"
              }`}>
                {s.status === "ok" ? <Check className="h-3.5 w-3.5" /> :
                 s.status === "wait" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> :
                 <span className="h-2 w-2 rounded-full bg-current opacity-50" />}
                {s.name}
              </div>
              {i < stages.length - 1 && <span className="h-px w-4 bg-border" />}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" icon={<CheckCircle2 className="h-4 w-4" />}>Approve production</Button>
          <Button size="sm" variant="outline">View logs</Button>
          <Button size="sm" variant="danger" icon={<AlertTriangle className="h-4 w-4" />}>Reject</Button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Recent runs" />
          <ul className="space-y-2">
            {pipelineRuns.map((r) => (
              <li key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${
                  r.status === "success" ? "bg-success/15 text-success" :
                  r.status === "failed" ? "bg-danger/15 text-danger" :
                  "bg-info/15 text-info"
                }`}>
                  {r.status === "success" ? <Check className="h-4 w-4" /> :
                   r.status === "failed" ? <X className="h-4 w-4" /> :
                   <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{r.id} · <span className="font-mono text-xs text-muted-foreground">{r.branch}</span></p>
                  <p className="font-mono text-[10px] text-muted-foreground">{r.actor} · {r.time}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{r.duration}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Release history" />
          <ul className="space-y-2">
            {releaseHistory.map((r) => (
              <li key={r.v} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
                <div>
                  <p className="font-display text-sm font-semibold">{r.v}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{r.env} · {r.time}</p>
                </div>
                <Badge tone={r.status === "success" ? "success" : "warning"}>{r.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
