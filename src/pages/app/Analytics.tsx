import { Card, SectionTitle, Badge } from "@/components/ui/primitives";
import { revenueSeries, trafficSeries } from "@/lib/mock";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

const tooltip = { background: "hsl(160 60% 6% / 0.95)", border: "1px solid hsl(160 30% 22%)", borderRadius: 10, fontSize: 12, color: "white" } as const;

const sourceData = [
  { name: "Organic", value: 4200 },
  { name: "Direct", value: 2800 },
  { name: "Referral", value: 1400 },
  { name: "Social", value: 980 },
];
const COLORS = ["hsl(158 75% 45%)", "hsl(44 70% 55%)", "hsl(200 80% 55%)", "hsl(280 60% 60%)"];

const cohortRadar = [
  { metric: "Acquisition", A: 80, B: 95 },
  { metric: "Activation", A: 65, B: 78 },
  { metric: "Retention", A: 72, B: 84 },
  { metric: "Revenue", A: 88, B: 92 },
  { metric: "Referral", A: 55, B: 70 },
];

export default function Analytics() {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge tone="info">Analytics</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">Product analytics</h1>
          <p className="text-sm text-muted-foreground">Visitor traffic, conversion funnels and cohort comparisons.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle title="Sessions over time" />
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="ses" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(158 75% 50%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(158 75% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 30% 50% / 0.15)" />
                <XAxis dataKey="month" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltip} />
                <Area type="monotone" dataKey="users" stroke="hsl(158 75% 50%)" strokeWidth={2} fill="url(#ses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Traffic sources" />
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sourceData} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={tooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-sm">
            {sourceData.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />{s.name}</span>
                <span className="font-mono text-xs">{s.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle title="Requests & errors · 24h" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={trafficSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 30% 50% / 0.15)" />
                <XAxis dataKey="hour" stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltip} />
                <Bar dataKey="requests" fill="hsl(158 75% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errors" fill="hsl(0 75% 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Cohort A vs. B" description="Last 30 days" />
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={cohortRadar}>
                <PolarGrid stroke="hsl(160 30% 50% / 0.25)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "currentColor" }} />
                <Radar dataKey="A" stroke="hsl(44 70% 55%)" fill="hsl(44 70% 55%)" fillOpacity={0.35} />
                <Radar dataKey="B" stroke="hsl(158 75% 50%)" fill="hsl(158 75% 50%)" fillOpacity={0.35} />
                <Tooltip contentStyle={tooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
