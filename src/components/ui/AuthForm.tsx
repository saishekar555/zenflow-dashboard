import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({
  label, icon, error, type = "text", className, ...rest
}: { label: string; icon?: ReactNode; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 transition focus-within:ring-2 focus-within:ring-primary/30",
        error && "border-danger/60",
      )}>
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          {...rest}
          type={isPwd && show ? "text" : type}
          className={cn("flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground", className)}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground hover:text-foreground" aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 text-sm font-medium transition hover:bg-muted">
        <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v2.83h5.35a4.57 4.57 0 0 1-1.98 3v2.5h3.2c1.87-1.72 2.95-4.27 2.95-7.3 0-.69-.06-1.36-.17-2.03z" opacity=".9"/><path fill="currentColor" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.2-2.5c-.89.6-2.03.96-3.42.96-2.63 0-4.86-1.78-5.66-4.16h-3.3v2.6A10 10 0 0 0 12 22z" opacity=".7"/><path fill="currentColor" d="M6.34 13.87a6 6 0 0 1 0-3.74V7.53h-3.3a10 10 0 0 0 0 8.94l3.3-2.6z" opacity=".5"/><path fill="currentColor" d="M12 6.1c1.47 0 2.78.5 3.82 1.5l2.86-2.86C16.96 3.1 14.7 2.2 12 2.2A10 10 0 0 0 3.04 7.53l3.3 2.6C7.14 7.88 9.37 6.1 12 6.1z" opacity=".8"/></svg>
        Google
      </button>
      <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 text-sm font-medium transition hover:bg-muted">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z"/></svg>
        Azure AD
      </button>
    </div>
  );
}
