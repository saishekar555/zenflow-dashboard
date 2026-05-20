import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { FolderKanban, Users, GitBranch, Plus } from "lucide-react";

const projects = [
  { name: "ZenFlow Core", desc: "Main analytics dashboard", status: "In progress", progress: 78, members: 5, branch: "main", tone: "info" as const },
  { name: "Azure Cost Optimizer", desc: "AI-driven cost reduction engine", status: "Review", progress: 92, members: 3, branch: "feature/optimizer", tone: "warning" as const },
  { name: "Pipeline Auditor", desc: "CI/CD compliance scanner", status: "Live", progress: 100, members: 4, branch: "release/v1.0", tone: "success" as const },
  { name: "Edge Observability", desc: "Front Door + CDN metrics", status: "Planning", progress: 22, members: 2, branch: "spike/edge", tone: "neutral" as const },
  { name: "Internal Identity", desc: "SSO + RBAC platform", status: "In progress", progress: 56, members: 6, branch: "main", tone: "info" as const },
  { name: "Mobile companion", desc: "iOS / Android viewer", status: "Backlog", progress: 8, members: 2, branch: "draft", tone: "neutral" as const },
];

export default function Projects() {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge>Projects</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">All projects</h1>
          <p className="text-sm text-muted-foreground">{projects.length} repositories across the organization.</p>
        </div>
        <Button size="sm" icon={<Plus className="h-4 w-4" />}>New project</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.name} className="group transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-emerald text-primary-foreground">
                <FolderKanban className="h-5 w-5" />
              </div>
              <Badge tone={p.tone}>{p.status}</Badge>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-4">
              <div className="mb-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Progress</span><span>{p.progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-emerald transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><GitBranch className="h-3.5 w-3.5" />{p.branch}</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{p.members}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
