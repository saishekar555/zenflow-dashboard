import { Link } from "react-router-dom";
import { Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { Field } from "@/components/ui/AuthForm";

export default function ResetPassword() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Set new password</h1>
      <p className="mt-2 text-sm text-muted-foreground">Choose a strong password — at least 8 characters.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="New password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} autoComplete="new-password" />
        <Field label="Confirm password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} autoComplete="new-password" />
        <Button type="submit" className="w-full" size="lg" icon={<Check className="h-4 w-4" />}>Update password</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Back to <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
