import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { Field, SocialButtons } from "@/components/ui/AuthForm";

export default function Login() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to your ZenFlow workspace.</p>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="sai@zenflow.io" icon={<Mail className="h-4 w-4" />} autoComplete="email" />
        <Field label="Password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} autoComplete="current-password" />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="h-3.5 w-3.5 accent-primary" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-xs font-medium text-accent hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" size="lg" icon={<ArrowRight className="h-4 w-4" />}>Sign in</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
      </div>
      <SocialButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to ZenFlow? <Link to="/signup" className="font-medium text-accent hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
