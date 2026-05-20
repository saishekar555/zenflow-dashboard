import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Logo ---------- */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl gradient-prestige text-primary-foreground shadow-md transition-transform group-hover:scale-105">
        <Sparkles className="h-5 w-5" />
        <span className="absolute inset-0 rounded-xl bg-accent/30 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      {!compact && (
        <span className="font-display text-base font-bold tracking-tight">
          Zen<span className="text-gradient">Flow</span>
        </span>
      )}
    </Link>
  );
}

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "gradient-emerald text-primary-foreground shadow-md hover:opacity-90",
  secondary: "bg-accent text-accent-foreground shadow-md hover:opacity-90",
  ghost: "bg-transparent hover:bg-muted text-foreground",
  outline: "border border-border bg-background/40 hover:bg-muted text-foreground",
  danger: "bg-danger/15 text-danger hover:bg-danger/25",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}
export function Button({ variant = "primary", size = "md", icon, className, children, ...rest }: BtnProps) {
  return (
    <button
      className={cn(
        "ring-focus inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant], sizes[size], className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

/* ---------- Card ---------- */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass p-5", className)}>{children}</div>;
}

export function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton h-4 w-full", className)} />;
}

/* ---------- Badge ---------- */
type Tone = "success" | "danger" | "warning" | "info" | "neutral" | "accent";
const toneClasses: Record<Tone, string> = {
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent/15 text-accent",
};
export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium uppercase tracking-wide",
      toneClasses[tone], className,
    )}>{children}</span>
  );
}
