import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { Field, SocialButtons } from "@/components/ui/AuthForm";

export default function Signup() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Start monitoring your Azure stack in under a minute.</p>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Full name" placeholder="Sai Shekar" icon={<User className="h-4 w-4" />} autoComplete="name" />
        <Field label="Work email" type="email" placeholder="sai@zenflow.io" icon={<Mail className="h-4 w-4" />} autoComplete="email" />
        <Field label="Password" type="password" placeholder="At least 8 characters" icon={<Lock className="h-4 w-4" />} autoComplete="new-password" />
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 accent-primary" />
          I agree to the <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy Policy</a>.
        </label>
        <Button type="submit" className="w-full" size="lg" icon={<ArrowRight className="h-4 w-4" />}>Create account</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <SocialButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already a member? <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
