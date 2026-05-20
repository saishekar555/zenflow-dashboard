import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Github, ExternalLink, ShieldCheck, Cloud, GitBranch,
  Sparkles, Activity, Cpu, Server, CheckCircle2, Zap, BarChart3, Layers,
} from "lucide-react";
import { Badge, Button, Card } from "@/components/ui/primitives";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { techStack } from "@/lib/mock";

const fadeUp = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

const features = [
  { icon: Cloud, title: "Azure-native", desc: "App Service, Front Door, Key Vault, Storage, SQL — all monitored in one pane." },
  { icon: GitBranch, title: "CI/CD telemetry", desc: "Live build status, deployment history, artifact tracking and rollback flow." },
  { icon: Activity, title: "Real-time monitoring", desc: "Uptime, latency, CPU and memory with alerting thresholds and on-call routing." },
  { icon: Sparkles, title: "AI recommendations", desc: "Right-size resources, predict traffic spikes, surface cost anomalies automatically." },
  { icon: ShieldCheck, title: "Enterprise security", desc: "RBAC-ready architecture, secret rotation reminders, audit-friendly activity log." },
  { icon: BarChart3, title: "Executive reports", desc: "Export PDF / CSV summaries for stakeholders — revenue, uptime, deployment KPIs." },
];

const stats = [
  { label: "Active deployments", value: 12, suffix: "" },
  { label: "Pipeline success rate", value: 99.4, suffix: "%", decimals: 1 },
  { label: "Cloud resources", value: 64, suffix: "" },
  { label: "Avg uptime", value: 99.98, suffix: "%", decimals: 2 },
];

export default function Landing() {
  return (
    <div className="px-4 lg:px-8">
      {/* HERO */}
      <section className="relative mx-auto mt-8 max-w-7xl overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-20 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute top-40 right-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl animate-float" />

        <motion.div {...fadeUp} className="relative mx-auto max-w-3xl pt-20 text-center pb-12">
          <Badge tone="accent" className="mx-auto">
            <Zap className="h-3 w-3" /> v1.4.2 · Live on Azure
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Ship faster on Azure with <span className="text-gradient">ZenFlow</span>.
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            An enterprise-grade analytics dashboard for cloud and DevOps teams.
            Monitor Azure deployments, CI/CD pipelines and AI cost insights — all in one focused workspace.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <Link to="/app/dashboard"><Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>View Dashboard</Button></Link>
            <a href="https://github.com/saishekar555/zenflow-dashboard" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" icon={<Github className="h-4 w-4" />}>GitHub Repository</Button>
            </a>
            <a href="https://zenflow.azurewebsites.net/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg" icon={<ExternalLink className="h-4 w-4" />}>Live Azure Demo</Button>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success" />MIT licensed</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success" />Azure DevOps CI/CD</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-success" />Production tested</span>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="relative mx-auto mt-6 max-w-6xl">
          <div className="glass-strong relative overflow-hidden p-3 shadow-[0_40px_120px_-30px_hsl(160_80%_15%/0.55)]">
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">zenflow.azurewebsites.net/app/dashboard</span>
            </div>
            <div className="grid gap-3 rounded-xl bg-background/60 p-4 sm:grid-cols-4">
              {[
                { l: "Revenue", v: "$248K", t: "+18.2%", icon: BarChart3 },
                { l: "Deployments", v: "1,284", t: "+4 today", icon: Cloud },
                { l: "Uptime", v: "99.98%", t: "30d avg", icon: Activity },
                { l: "Pipelines", v: "99.4%", t: "success", icon: GitBranch },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card/40 p-3">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="mt-2 font-display text-xl font-bold">{s.v}</p>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">{s.l} · {s.t}</p>
                </div>
              ))}
              <div className="rounded-xl border border-border bg-card/40 p-4 sm:col-span-3 h-44">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">Traffic · 24h</p>
                  <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-success" />Live</Badge>
                </div>
                <svg viewBox="0 0 400 100" className="mt-3 h-28 w-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="hsl(158 75% 50%)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(158 75% 50%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,70 C40,60 70,40 110,45 C150,50 180,75 220,60 C260,45 290,20 330,30 C360,38 380,55 400,40 L400,100 L0,100 Z" fill="url(#g1)" />
                  <path d="M0,70 C40,60 70,40 110,45 C150,50 180,75 220,60 C260,45 290,20 330,30 C360,38 380,55 400,40" fill="none" stroke="hsl(158 75% 50%)" strokeWidth="2" />
                </svg>
              </div>
              <div className="rounded-xl border border-border bg-card/40 p-4 h-44">
                <p className="text-xs font-medium">CPU usage</p>
                <div className="mt-4 space-y-2.5">
                  {[72, 48, 35].map((v, i) => (
                    <div key={i}>
                      <div className="flex justify-between font-mono text-[10px] text-muted-foreground"><span>node-{i + 1}</span><span>{v}%</span></div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full gradient-emerald" style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section id="stats" className="mx-auto mt-24 max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.06 }}>
              <Card className="relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-2xl" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-3xl font-bold">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto mt-24 max-w-7xl">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <Badge tone="accent">Platform</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Everything DevOps teams need</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Six pillars that turn ZenFlow from a dashboard into your team's daily command center.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-emerald text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUSTED TECH */}
      <section id="stack" className="mx-auto mt-24 max-w-7xl">
        <motion.div {...fadeUp} className="text-center">
          <Badge>Trusted technologies</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold">Built on a modern, battle-tested stack</h2>
        </motion.div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {techStack.map((t) => (
            <span key={t} className="glass rounded-full px-4 py-2 font-mono text-xs">{t}</span>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: Layers, title: "Frontend", desc: "React 19, Vite 7, Tailwind v4, Framer Motion, Recharts" },
            { icon: Cpu, title: "DevOps", desc: "Azure DevOps Pipelines, npm ci, dist-only zip deploy" },
            { icon: Server, title: "Cloud", desc: "Azure Linux App Service, Front Door, Key Vault, Storage" },
          ].map((b) => (
            <Card key={b.title}>
              <b.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-3 font-display font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 mb-8 max-w-7xl">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl gradient-prestige p-10 text-primary-foreground sm:p-16">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">See ZenFlow in action.</h2>
              <p className="mt-3 max-w-md opacity-90">
                A full production dashboard with mock telemetry — no signup required.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Link to="/app/dashboard">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>Launch dashboard</Button>
              </Link>
              <Link to="/app/portfolio">
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20">View portfolio</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
