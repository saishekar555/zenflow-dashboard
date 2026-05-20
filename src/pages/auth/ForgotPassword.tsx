import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { Field } from "@/components/ui/AuthForm";

export default function ForgotPassword() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Forgot password?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="sai@zenflow.io" icon={<Mail className="h-4 w-4" />} autoComplete="email" />
        <Button type="submit" className="w-full" size="lg" icon={<Send className="h-4 w-4" />}>Send reset link</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it? <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
