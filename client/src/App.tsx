import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";

import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import ProtectedRoute from "@/components/ProtectedRoute"; // Ensure this exists

// New Page Imports
import LandingPage from "@/pages/landing";
import FeaturesPage from "@/pages/features-page";
import UserDashboardPage from "@/pages/user-dashboard-page";
import CommunityPage from "@/pages/community-page";
import ContactPage from "@/pages/contact-page";
import AnalyticsDashboard from "@/pages/dashboard";

import FloatingNotifications from "@/components/floating-notifications";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/contact" component={ContactPage} />

      <ProtectedRoute path="/dashboard" component={UserDashboardPage} />
      <ProtectedRoute path="/analytics" component={AnalyticsDashboard} />
      <ProtectedRoute path="/community" component={CommunityPage} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
          <FloatingNotifications />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
