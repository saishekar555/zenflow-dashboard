import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button, Logo } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <Logo />
        <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">404 · resource not found</p>
        <h1 className="mt-3 font-display text-6xl font-extrabold sm:text-8xl">
          <span className="text-gradient">404</span>
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          We couldn't locate that page. It might have been moved, deleted, or never existed.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/"><Button icon={<Home className="h-4 w-4" />}>Back to home</Button></Link>
          <button onClick={() => history.back()}>
            <Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>Go back</Button>
          </button>
        </div>
      </div>
    </div>
  );
}
