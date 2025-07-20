import React from 'react';
import DashboardLayout from '../../components/ui/DashboardLayout';
import AdvancedFilters from './components/AdvancedFilters';
import UserEngagementKPIs from './components/UserEngagementKPIs';
import ConversionFunnelChart from './components/ConversionFunnelChart';
import UsageHeatmap from './components/UsageHeatmap';
import GeographicDistribution from './components/GeographicDistribution';
import TopPagesTable from './components/TopPagesTable';
import UserBehaviorSummary from './components/UserBehaviorSummary';

const UserAnalyticsDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              User Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive user behavior insights and engagement pattern analysis for data-driven product optimization decisions.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters />

        {/* KPI Cards */}
        <UserEngagementKPIs />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Conversion Funnel - Takes 2 columns */}
          <div className="xl:col-span-2">
            <ConversionFunnelChart />
          </div>

          {/* User Behavior Summary - Takes 1 column */}
          <div className="xl:col-span-1">
            <UserBehaviorSummary />
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <UsageHeatmap />
          <GeographicDistribution />
        </div>

        {/* Top Pages Table */}
        <TopPagesTable />
      </div>
    </DashboardLayout>
  );
};

export default UserAnalyticsDashboard;