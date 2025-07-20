import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ExecutiveOverviewDashboard from "pages/executive-overview-dashboard";
import RealTimeOperationsDashboard from "pages/real-time-operations-dashboard";
import BusinessIntelligenceDashboard from "pages/business-intelligence-dashboard";
import UserAnalyticsDashboard from "pages/user-analytics-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ExecutiveOverviewDashboard />} />
        <Route path="/executive-overview-dashboard" element={<ExecutiveOverviewDashboard />} />
        <Route path="/real-time-operations-dashboard" element={<RealTimeOperationsDashboard />} />
        <Route path="/business-intelligence-dashboard" element={<BusinessIntelligenceDashboard />} />
        <Route path="/user-analytics-dashboard" element={<UserAnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;