import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface State { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error("ErrorBoundary caught:", error); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="glass max-w-md p-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-danger/15 text-danger">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground">{this.state.error.message}</p>
          <button
            onClick={() => location.reload()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl gradient-emerald px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" /> Reload
          </button>
        </div>
      </div>
    );
  }
}
