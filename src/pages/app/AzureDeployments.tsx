import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { deployments, azureResources } from "@/lib/mock";
import { Cloud, MapPin, RefreshCw, DollarSign, Server } from "lucide-react";

export default function AzureDeployments() {
  const totalCost = azureResources.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge tone="info"><Cloud className="h-3 w-3" />Azure</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">Azure deployments</h1>
          <p className="text-sm text-muted-foreground">Live status across environments & regions.</p>
        </div>
        <Button variant="outline" size="sm" icon={<RefreshCw className="h-4 w-4" />}>Refresh</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Cloud className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 font-display text-3xl font-bold"><AnimatedCounter value={deployments.length} /></p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Active environments</p>
        </Card>
        <Card>
          <Server className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 font-display text-3xl font-bold"><AnimatedCounter value={azureResources.length} /></p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Cloud resources</p>
        </Card>
        <Card>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 font-display text-3xl font-bold"><AnimatedCounter value={totalCost} prefix="$" /></p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Est. monthly cost</p>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Environments" description="Production, staging, QA and dev" />
        <div className="grid gap-3 md:grid-cols-2">
          {deployments.map((d) => (
            <div key={d.env} className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-base font-semibold">{d.env}</p>
                  <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />{d.region} · {d.version}
                  </p>
                </div>
                <Badge tone={d.status === "Healthy" ? "success" : "warning"}>{d.status}</Badge>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Uptime · 30d</span><span>{d.uptime}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
                  <div className="h-full gradient-emerald" style={{ width: `${d.uptime}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Cloud resources" description="Resource group: rg-zenflow-prod" />
        <div className="-mx-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-2 py-2">Name</th><th className="px-2 py-2">Type</th><th className="px-2 py-2">Region</th><th className="px-2 py-2 text-right">Cost / mo</th></tr>
            </thead>
            <tbody>
              {azureResources.map((r) => (
                <tr key={r.name} className="border-t border-border">
                  <td className="px-2 py-2.5 font-mono text-xs">{r.name}</td>
                  <td className="px-2 py-2.5">{r.type}</td>
                  <td className="px-2 py-2.5 font-mono text-xs">{r.region}</td>
                  <td className="px-2 py-2.5 text-right font-mono text-xs">${r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
