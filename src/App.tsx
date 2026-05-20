import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LandingLayout = lazy(() => import("./components/LandingLayout"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const AuthLayout = lazy(() => import("./components/AuthLayout"));

const Landing = lazy(() => import("./pages/Landing"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Dashboard = lazy(() => import("./pages/app/Dashboard"));
const Analytics = lazy(() => import("./pages/app/Analytics"));
const Projects = lazy(() => import("./pages/app/Projects"));
const AzureDeployments = lazy(() => import("./pages/app/AzureDeployments"));
const Pipelines = lazy(() => import("./pages/app/Pipelines"));
const Reports = lazy(() => import("./pages/app/Reports"));
const Monitoring = lazy(() => import("./pages/app/Monitoring"));
const AIInsights = lazy(() => import("./pages/app/AIInsights"));
const Portfolio = lazy(() => import("./pages/app/Portfolio"));
const Settings = lazy(() => import("./pages/app/Settings"));

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Loading workspace…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="projects" element={<Projects />} />
          <Route path="azure" element={<AzureDeployments />} />
          <Route path="pipelines" element={<Pipelines />} />
          <Route path="reports" element={<Reports />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
