// Mock data for portfolio/demo views
export const revenueSeries = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: 18000 + Math.round(Math.sin(i / 1.6) * 6000 + i * 1800 + Math.random() * 2200),
  users: 1200 + Math.round(i * 240 + Math.random() * 320),
}));

export const trafficSeries = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  requests: 800 + Math.round(Math.sin((i - 6) / 3) * 600 + 600 + Math.random() * 180),
  errors: Math.max(0, Math.round(Math.sin(i / 5) * 12 + 18 + Math.random() * 8)),
}));

export const pipelineRuns = [
  { id: "#1284", branch: "main", status: "success", duration: "3m 41s", time: "2 min ago", actor: "saishekar555" },
  { id: "#1283", branch: "feature/charts", status: "success", duration: "4m 12s", time: "18 min ago", actor: "saishekar555" },
  { id: "#1282", branch: "main", status: "running", duration: "1m 02s", time: "just now", actor: "ci-bot" },
  { id: "#1281", branch: "hotfix/api", status: "failed", duration: "2m 30s", time: "1 h ago", actor: "saishekar555" },
  { id: "#1280", branch: "main", status: "success", duration: "3m 58s", time: "3 h ago", actor: "saishekar555" },
  { id: "#1279", branch: "release/v1.4", status: "success", duration: "5m 11s", time: "5 h ago", actor: "release-bot" },
] as const;

export const deployments = [
  { env: "Production", region: "East US", version: "v1.4.2", status: "Healthy", uptime: 99.98 },
  { env: "Staging", region: "West Europe", version: "v1.4.3-rc.1", status: "Healthy", uptime: 99.91 },
  { env: "QA", region: "Central India", version: "v1.5.0-beta", status: "Degraded", uptime: 98.74 },
  { env: "Dev", region: "East US 2", version: "main", status: "Healthy", uptime: 99.5 },
];

export const azureResources = [
  { name: "zenflow-app", type: "App Service", region: "East US", cost: 142 },
  { name: "zenflow-db", type: "SQL Database", region: "East US", cost: 318 },
  { name: "zenflow-cache", type: "Redis Cache", region: "East US", cost: 87 },
  { name: "zenflow-storage", type: "Storage Account", region: "East US", cost: 24 },
  { name: "zenflow-keyvault", type: "Key Vault", region: "East US", cost: 6 },
  { name: "zenflow-cdn", type: "Front Door", region: "Global", cost: 64 },
];

export const activities = [
  { who: "Sai Shekar", action: "deployed v1.4.2 to Production", when: "2 min ago", kind: "deploy" },
  { who: "ci-bot", action: "build #1282 started on main", when: "8 min ago", kind: "build" },
  { who: "Sai Shekar", action: "merged PR #214 — Add Azure metrics widget", when: "23 min ago", kind: "pr" },
  { who: "Monitor", action: "alert resolved — API latency back to normal", when: "1 h ago", kind: "alert" },
  { who: "Sai Shekar", action: "rotated Key Vault secret zenflow-db-conn", when: "3 h ago", kind: "security" },
  { who: "release-bot", action: "tagged release v1.4.1", when: "5 h ago", kind: "release" },
];

export const notifications = [
  { title: "Deployment succeeded", desc: "Production · East US · v1.4.2", time: "2m", tone: "success" as const },
  { title: "Build failed on hotfix/api", desc: "Step: npm run build — exit 1", time: "1h", tone: "danger" as const },
  { title: "Cost anomaly detected", desc: "SQL Database +18% vs. last week", time: "4h", tone: "warning" as const },
  { title: "New PR awaiting review", desc: "#215 — Refactor sidebar nav", time: "6h", tone: "info" as const },
];

export const aiInsights = [
  { title: "Right-size zenflow-db", impact: "−$92/mo", detail: "DTU avg 28%. Drop from S3 → S2 with no SLA risk." },
  { title: "Enable Front Door caching", impact: "−180ms p95", detail: "Static asset cache hit ratio currently 41%. Cache /assets/* for 7 days." },
  { title: "Pipeline flake on feature/charts", impact: "+12% reliability", detail: "Vitest snapshot test flaky 6/40 runs. Pin Node 22.7 in CI." },
  { title: "Predicted traffic spike", impact: "Fri 18:00", detail: "Model forecasts +34% requests. Pre-scale App Service to 3 instances." },
];

export const techStack = [
  "React 19", "Vite 7", "TypeScript", "Tailwind v4", "Framer Motion",
  "Recharts", "Azure App Service", "Azure DevOps", "GitHub Actions", "Node 22",
];
