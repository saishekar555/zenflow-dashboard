import { Link, Outlet } from "react-router-dom";
import { Logo } from "@/components/ui/primitives";
import { ShieldCheck, Cloud, GitBranch, Activity } from "lucide-react";

const highlights = [
  { icon: Cloud, label: "Azure App Service deployment" },
  { icon: GitBranch, label: "Azure DevOps CI/CD pipelines" },
  { icon: Activity, label: "Real-time monitoring & alerts" },
  { icon: ShieldCheck, label: "Enterprise security defaults" },
];

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col px-6 py-8 lg:px-12">
        <Logo />
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-md animate-fade-up">
            <Outlet />
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} ZenFlow · Enterprise SaaS portfolio
        </p>
      </div>

      {/* Right — gradient panel */}
      <div className="relative hidden overflow-hidden p-8 lg:flex">
        <div className="absolute inset-0 gradient-prestige opacity-95" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/40 blur-3xl animate-float" />
        <div className="absolute bottom-10 -left-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="relative z-10 flex w-full flex-col justify-between text-primary-foreground">
          <Link to="/" className="font-mono text-xs uppercase tracking-widest opacity-80 hover:opacity-100">← Back to site</Link>
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight">
              Cloud + DevOps,<br />in one focused workspace.
            </h2>
            <p className="mt-3 max-w-sm text-sm opacity-90">
              ZenFlow centralizes Azure deployments, CI/CD telemetry and AI cost insights for modern engineering teams.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.label} className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium backdrop-blur">
                  <h.icon className="h-4 w-4 opacity-90" />
                  {h.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">
            zenflow.azurewebsites.net
          </p>
        </div>
      </div>
    </div>
  );
}
