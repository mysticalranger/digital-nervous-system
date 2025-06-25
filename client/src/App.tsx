import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";

import NotFound from "@/pages/not-found";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/pages/landing";
import UserDashboardPage from "@/pages/user-dashboard-page";
import CommunityPage from "@/pages/community-page";
import ContactPage from "@/pages/contact-page";
import FuturisticHome from "@/pages/futuristic-home";
import AnalyticsDashboard from "@/pages/dashboard";
import GamificationDashboard from "@/pages/gamification-dashboard";
import VoiceAssistantPage from "@/pages/voice-assistant";
import CulturalPulsePage from "@/pages/cultural-pulse";
import PaymentPage from "@/pages/payment";
import ApiManagementPage from "@/pages/api-management";

import FloatingNotifications from "@/components/floating-notifications";

function Router() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });
  
  const isAuthenticated = !!user;

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={LandingPage} />
      ) : (
        <>
          <Route path="/" component={FuturisticHome} />
        </>
      )}

      <ProtectedRoute path="/dashboard" component={UserDashboardPage} />
      <ProtectedRoute path="/analytics" component={AnalyticsDashboard} />
      <ProtectedRoute path="/gamification" component={GamificationDashboard} />
      <ProtectedRoute path="/voice-assistant" component={VoiceAssistantPage} />
      <ProtectedRoute path="/cultural-pulse" component={CulturalPulsePage} />
      <ProtectedRoute path="/payment" component={PaymentPage} />
      <ProtectedRoute path="/api-management" component={ApiManagementPage} />
      <ProtectedRoute path="/community" component={CommunityPage} />

      <Route path="/contact" component={ContactPage} />
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
