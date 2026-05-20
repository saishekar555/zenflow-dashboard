import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { FileText, Download, FileSpreadsheet, FileJson } from "lucide-react";

const reports = [
  { name: "Q3 Revenue Report", type: "PDF", size: "2.4 MB", date: "Oct 1, 2025" },
  { name: "Pipeline KPIs · September", type: "CSV", size: "186 KB", date: "Oct 1, 2025" },
  { name: "Azure Cost Breakdown", type: "PDF", size: "1.1 MB", date: "Sep 28, 2025" },
  { name: "Uptime SLA Report", type: "PDF", size: "740 KB", date: "Sep 27, 2025" },
  { name: "User Cohort Analysis", type: "JSON", size: "92 KB", date: "Sep 25, 2025" },
  { name: "Security Audit Trail", type: "PDF", size: "3.2 MB", date: "Sep 20, 2025" },
];

const icon = (t: string) => t === "CSV" ? FileSpreadsheet : t === "JSON" ? FileJson : FileText;

export default function Reports() {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge>Reports</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">Generated reports</h1>
          <p className="text-sm text-muted-foreground">Executive summaries, audit exports and KPI breakdowns.</p>
        </div>
        <Button size="sm" icon={<Download className="h-4 w-4" />}>New report</Button>
      </div>

      <Card>
        <SectionTitle title="All reports" description={`${reports.length} files`} />
        <ul className="divide-y divide-border">
          {reports.map((r) => {
            const Icon = icon(r.type);
            return (
              <li key={r.name} className="flex items-center gap-4 py-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{r.type} · {r.size} · {r.date}</p>
                </div>
                <Button size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>Download</Button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
