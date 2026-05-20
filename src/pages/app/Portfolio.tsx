import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { techStack } from "@/lib/mock";
import { Github, ExternalLink, Cloud, GitBranch, Award, Code2, Server, Globe, Mail } from "lucide-react";

const highlights = [
  { icon: Cloud, t: "Azure App Service deployment with dist-only zip artifacts" },
  { icon: GitBranch, t: "Azure DevOps Pipelines · build → test → artifact → release" },
  { icon: Award, t: "99.98% uptime · automated rollback workflow" },
  { icon: Code2, t: "React 19 · Vite 7 · Tailwind v4 · Framer Motion · Recharts" },
];

const stats = [
  { label: "Lines of code", value: "12.4K" },
  { label: "Lighthouse perf", value: "98" },
  { label: "Build time", value: "42s" },
  { label: "Bundle size", value: "192 KB" },
];

export default function Portfolio() {
  return (
    <div className="space-y-6 pt-2">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-prestige opacity-95" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative grid items-center gap-6 p-2 text-primary-foreground md:grid-cols-[1fr_auto]">
          <div>
            <Badge tone="accent">Portfolio · 2026</Badge>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Sai Shekar</h1>
            <p className="font-mono text-sm opacity-90">Azure · DevOps · Frontend Engineer</p>
            <p className="mt-3 max-w-xl text-sm opacity-90">
              ZenFlow is an enterprise SaaS analytics dashboard I built and deployed on Microsoft Azure
              using a full Azure DevOps CI/CD pipeline. This page summarizes the architecture, stack and outcomes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://zenflow.azurewebsites.net/" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg" icon={<ExternalLink className="h-4 w-4" />}>Live demo</Button>
            </a>
            <a href="https://github.com/saishekar555/zenflow-dashboard" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20" icon={<Github className="h-4 w-4" />}>
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle title="Project highlights" />
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h.t} className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg gradient-emerald text-primary-foreground">
                  <h.icon className="h-4 w-4" />
                </div>
                <p className="text-sm">{h.t}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle title="Deployment status" />
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
              <span className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-success" />Production</span>
              <Badge tone="success">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
              <span className="flex items-center gap-2 text-sm"><Server className="h-4 w-4 text-info" />Region</span>
              <span className="font-mono text-xs">East US</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
              <span className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-accent" />Version</span>
              <span className="font-mono text-xs">v1.4.2</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Cloud deployment architecture" />
        <pre className="overflow-x-auto rounded-xl bg-muted/40 p-4 font-mono text-[11px] leading-relaxed">{`
   ┌─────────────────┐    git push    ┌──────────────────────┐
   │   Developer     │ ─────────────▶ │  GitHub Repository   │
   └─────────────────┘                └──────────┬───────────┘
                                                 │ webhook
                                                 ▼
                              ┌──────────────────────────────┐
                              │   Azure DevOps Pipeline      │
                              │  npm ci → build → vitest     │
                              │  → archive dist/ → app.zip   │
                              └──────────────┬───────────────┘
                                             │ artifact
                                             ▼
                              ┌──────────────────────────────┐
                              │  Azure App Service (Linux)   │
                              │  Node 22 · pm2 serve --spa   │
                              │  https://zenflow.azure*.net  │
                              └──────────────┬───────────────┘
                                             │
                       ┌─────────────────────┴────────────────────┐
                       ▼                                          ▼
              ┌────────────────┐                         ┌────────────────┐
              │ Azure Front    │                         │  Key Vault     │
              │ Door (CDN/WAF) │                         │  + App Insights│
              └────────────────┘                         └────────────────┘
`}</pre>
      </Card>

      <Card>
        <SectionTitle title="Technology stack" />
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="rounded-full border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs">{t}</span>
          ))}
        </div>
      </Card>

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold">Want the full story?</p>
          <p className="text-sm text-muted-foreground">Reach out for the technical writeup, walkthrough or interview.</p>
        </div>
        <a href="mailto:hello@example.com"><Button icon={<Mail className="h-4 w-4" />}>Contact Sai</Button></a>
      </Card>
    </div>
  );
}
