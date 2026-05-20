import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, FolderKanban, Cloud, GitBranch,
  FileText, Activity, Settings as SettingsIcon, Sparkles, Briefcase,
  Menu, X, Sun, Moon, Bell, Search, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/primitives";
import { notifications } from "@/lib/mock";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/projects", label: "Projects", icon: FolderKanban },
  { to: "/app/azure", label: "Azure Deployments", icon: Cloud },
  { to: "/app/pipelines", label: "CI/CD Pipelines", icon: GitBranch },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/monitoring", label: "Monitoring", icon: Activity },
  { to: "/app/ai-insights", label: "AI Insights", icon: Sparkles },
  { to: "/app/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/app/settings", label: "Settings", icon: SettingsIcon },
];

export default function AppLayout() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const loc = useLocation();
  const current = nav.find((n) => loc.pathname.startsWith(n.to))?.label ?? "Dashboard";

  useEffect(() => { setMobileOpen(false); }, [loc.pathname]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col p-3 transition-all duration-300 lg:static lg:translate-x-0",
          collapsed ? "w-[76px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        style={{ background: "var(--color-sidebar)", color: "var(--color-sidebar-foreground)", borderRight: "1px solid var(--color-sidebar-border)" }}
      >
        <div className={cn("mb-5 flex items-center px-2", collapsed ? "justify-center" : "justify-between")}>
          <Logo compact={collapsed} />
          <button
            onClick={() => setMobileOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-gradient-to-r from-primary/25 to-accent/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/65 hover:bg-white/5 hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && !collapsed && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full gradient-emerald" />
                  )}
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-3 hidden items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 lg:flex"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" />Collapse</>}
        </button>
      </aside>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="glass grid h-10 w-10 place-items-center lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="glass flex flex-1 items-center justify-between gap-3 px-3 py-2">
            <div className="hidden min-w-0 sm:block">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
              </p>
              <h1 className="font-display text-base font-semibold leading-tight">{current}</h1>
            </div>
            <div className="hidden flex-1 items-center gap-2 rounded-xl bg-muted/50 px-3 py-1.5 md:flex md:max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search resources, pipelines, builds…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border bg-background/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline">⌘K</kbd>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="relative">
                <button
                  onClick={() => setNotifOpen((o) => !o)}
                  className="relative grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-border"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-card animate-pulse-glow" />
                </button>
                {notifOpen && (
                  <>
                    <div onClick={() => setNotifOpen(false)} className="fixed inset-0 z-30" />
                    <div className="glass absolute right-0 top-12 z-40 w-80 p-2 animate-fade-up">
                      <p className="px-2 pt-1 pb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Notifications</p>
                      <ul className="space-y-1">
                        {notifications.map((n) => (
                          <li key={n.title} className="rounded-lg p-2 hover:bg-muted">
                            <div className="flex items-start gap-2">
                              <span className={cn(
                                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                                n.tone === "success" && "bg-success",
                                n.tone === "danger" && "bg-danger",
                                n.tone === "warning" && "bg-warning",
                                n.tone === "info" && "bg-info",
                              )} />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">{n.title}</p>
                                <p className="truncate text-xs text-muted-foreground">{n.desc}</p>
                              </div>
                              <span className="font-mono text-[10px] text-muted-foreground">{n.time}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={toggle}
                className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-border"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <div className="ml-1 grid h-9 w-9 place-items-center rounded-full gradient-prestige font-display text-xs font-bold text-primary-foreground">SS</div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-10 lg:px-6">
          <div className="animate-fade-up mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
