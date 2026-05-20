import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Github, Menu, X, ExternalLink, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button, Logo } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const links = [
  { to: "/#features", label: "Features" },
  { to: "/#stack", label: "Stack" },
  { to: "/#stats", label: "Stats" },
  { to: "/app/dashboard", label: "Dashboard", internal: true },
];

export default function LandingLayout() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 px-4 pt-4 lg:px-8">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) =>
              l.internal ? (
                <NavLink key={l.to} to={l.to} className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  {l.label}
                </NavLink>
              ) : (
                <a key={l.to} href={l.to} className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  {l.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-1.5">
            <button onClick={toggle} className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-border" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/login" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block px-3">Sign in</Link>
            <Link to="/app/dashboard" className="hidden sm:block">
              <Button size="sm">Launch app</Button>
            </Link>
            <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full bg-muted md:hidden" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mx-auto mt-2 max-w-7xl space-y-1 p-3 md:hidden animate-fade-up">
            {links.map((l) => (
              <a key={l.to} href={l.to} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">{l.label}</a>
            ))}
            <Link to="/login" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Sign in</Link>
            <Link to="/app/dashboard"><Button className="mt-1 w-full" size="md">Launch app</Button></Link>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="mt-16 px-4 pb-8 lg:px-8">
        <div className={cn("glass mx-auto max-w-7xl p-8")}>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Enterprise-grade analytics for Azure cloud, CI/CD pipelines, and DevOps teams.
                Built and deployed by Sai Shekar.
              </p>
              <div className="mt-4 flex gap-2">
                <a href="https://github.com/saishekar555/zenflow-dashboard" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" icon={<Github className="h-4 w-4" />}>GitHub</Button>
                </a>
                <a href="https://zenflow.azurewebsites.net/" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" icon={<ExternalLink className="h-4 w-4" />}>Azure Demo</Button>
                </a>
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Product</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#features" className="hover:text-foreground text-muted-foreground">Features</a></li>
                <li><Link to="/app/dashboard" className="hover:text-foreground text-muted-foreground">Dashboard</Link></li>
                <li><Link to="/app/ai-insights" className="hover:text-foreground text-muted-foreground">AI Insights</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Company</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/app/portfolio" className="hover:text-foreground text-muted-foreground">About</Link></li>
                <li><a href="https://github.com/saishekar555" target="_blank" rel="noreferrer" className="hover:text-foreground text-muted-foreground">Author</a></li>
                <li><a href="#" className="hover:text-foreground text-muted-foreground">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} ZenFlow Dashboard · MIT License</p>
            <p className="font-mono">Built with React · Vite · Azure · v1.4.2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
