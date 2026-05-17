import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  StickyNote,
  FolderKanban,
  Target,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Layout() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const current = nav.find((n) => n.to === loc.pathname)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform p-4 transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="glass flex h-full flex-col p-4">
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Flow</p>
              <p className="mt-1 text-xs text-muted-foreground">Personal Dashboard</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-gradient-to-r from-primary/15 to-accent/10 text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={toggle}
            className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-2">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === "dark" ? "Dark" : "Light"} mode
            </span>
            <span className="h-5 w-9 rounded-full bg-border p-0.5">
              <span
                className={cn(
                  "block h-4 w-4 rounded-full bg-primary transition-transform",
                  theme === "dark" ? "translate-x-4" : "translate-x-0",
                )}
              />
            </span>
          </button>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 lg:px-8">
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass grid h-10 w-10 place-items-center lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="glass flex flex-1 items-center justify-between px-4 py-2.5">
            <div>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="text-lg font-semibold leading-tight">{current}</h1>
            </div>
            <button
              onClick={toggle}
              className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-border"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 pb-10 lg:px-8">
          <div className="animate-fade-up mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
