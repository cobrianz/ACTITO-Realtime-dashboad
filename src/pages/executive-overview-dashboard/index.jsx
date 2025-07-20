import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/ui/DashboardLayout';
import MetricCard from './components/MetricCard';
import RevenueGrowthChart from './components/RevenueGrowthChart';
import PerformanceSummary from './components/PerformanceSummary';
import ActivityFeed from './components/ActivityFeed';
import DateRangeSelector from './components/DateRangeSelector';
import Icon from '../../components/AppIcon';

const ExecutiveOverviewDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for executive metrics
  const executiveMetrics = [
    {
      title: 'Revenue Growth',
      value: 2847500,
      change: 12.5,
      changeType: 'positive',
      icon: 'DollarSign',
      format: 'currency',
      sparklineData: [2200000, 2350000, 2500000, 2650000, 2750000, 2847500]
    },
    {
      title: 'User Acquisition',
      value: 45280,
      change: 8.3,
      changeType: 'positive',
      icon: 'UserPlus',
      format: 'number',
      sparklineData: [38000, 40000, 42000, 43500, 44800, 45280]
    },
    {
      title: 'Platform Uptime',
      value: 99.97,
      change: 0.02,
      changeType: 'positive',
      icon: 'Shield',
      format: 'percentage',
      sparklineData: [99.85, 99.90, 99.95, 99.96, 99.97, 99.97]
    },
    {
      title: 'Customer Satisfaction',
      value: 4.8,
      change: 2.1,
      changeType: 'positive',
      icon: 'Heart',
      format: 'number',
      suffix: '/5',
      sparklineData: [4.6, 4.65, 4.7, 4.75, 4.78, 4.8]
    }
  ];

  // Mock data for revenue growth chart
  const revenueChartData = [
    { month: 'Jan', revenue: 2200000, newUsers: 38000 },
    { month: 'Feb', revenue: 2350000, newUsers: 40000 },
    { month: 'Mar', revenue: 2500000, newUsers: 42000 },
    { month: 'Apr', revenue: 2650000, newUsers: 43500 },
    { month: 'May', revenue: 2750000, newUsers: 44800 },
    { month: 'Jun', revenue: 2847500, newUsers: 45280 }
  ];

  // Mock data for performance summary
  const performanceData = {
    systemHealth: {
      score: 94,
      metrics: [
        { name: 'Server Response', value: 98 },
        { name: 'Database Performance', value: 92 },
        { name: 'API Availability', value: 99 },
        { name: 'CDN Performance', value: 96 }
      ]
    },
    trafficGrowth: {
      percentage: 23,
      totalVisits: 1247890
    },
    clientSatisfaction: {
      rating: 4.8,
      totalResponses: 12847
    }
  };

  // Mock data for activity feed
  const activityData = [
    {
      type: 'milestone',
      title: 'Revenue Milestone Achieved',
      description: 'Monthly recurring revenue exceeded $2.8M target',
      timestamp: new Date(Date.now() - 300000),
      metrics: [
        { label: 'Target', value: '$2.8M' },
        { label: 'Actual', value: '$2.85M' }
      ]
    },
    {
      type: 'achievement',
      title: 'Customer Satisfaction Goal Met',
      description: 'Average rating reached 4.8/5 stars this quarter',
      timestamp: new Date(Date.now() - 1800000),
      metrics: [
        { label: 'Rating', value: '4.8/5' },
        { label: 'Responses', value: '12,847' }
      ]
    },
    {
      type: 'alert',
      severity: 'warning',
      title: 'High Traffic Detected',
      description: 'Current traffic is 150% above normal levels',
      timestamp: new Date(Date.now() - 3600000),
      metrics: [
        { label: 'Current', value: '15,240/min' },
        { label: 'Normal', value: '10,160/min' }
      ]
    },
    {
      type: 'system',
      title: 'System Optimization Complete',
      description: 'Database performance improved by 15%',
      timestamp: new Date(Date.now() - 7200000),
      metrics: [
        { label: 'Improvement', value: '+15%' },
        { label: 'Response Time', value: '120ms' }
      ]
    },
    {
      type: 'revenue',
      title: 'New Enterprise Client Onboarded',
      description: 'Fortune 500 company signed annual contract',
      timestamp: new Date(Date.now() - 10800000),
      metrics: [
        { label: 'Contract Value', value: '$450K' },
        { label: 'Duration', value: '12 months' }
      ]
    }
  ];

  // Update timestamp every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    // In a real app, this would trigger data refetch
    console.log('Date range changed to:', range);
  };

  const handleExport = (format) => {
    // In a real app, this would trigger export functionality
    console.log('Exporting dashboard as:', format);
    
    // Simulate export process
    const exportData = {
      dateRange: selectedDateRange,
      metrics: executiveMetrics,
      timestamp: new Date().toISOString(),
      format: format
    };
    
    // Create mock download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `executive-dashboard-${format}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Executive Overview</h1>
            <p className="text-muted-foreground mt-2">
              Strategic performance insights and key business metrics
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <DateRangeSelector
              selectedRange={selectedDateRange}
              onRangeChange={handleDateRangeChange}
              onExport={handleExport}
            />
          </div>
        </div>

        {/* Data Freshness Indicator */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Auto-refresh: 30 minutes</span>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {executiveMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              format={metric.format}
              suffix={metric.suffix}
              prefix={metric.prefix}
              sparklineData={metric.sparklineData}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Growth Chart - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <RevenueGrowthChart data={revenueChartData} />
          </div>

          {/* Performance Summary - Takes 1 column on xl screens */}
          <div className="xl:col-span-1">
            <PerformanceSummary
              systemHealth={performanceData.systemHealth}
              trafficGrowth={performanceData.trafficGrowth}
              clientSatisfaction={performanceData.clientSatisfaction}
            />
          </div>
        </div>

        {/* Activity Feed - Full width */}
        <div className="grid grid-cols-1">
          <ActivityFeed activities={activityData} />
        </div>

        {/* Footer Information */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-card border border-border rounded-lg text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} ACTITO Analytics</span>
            <span>•</span>
            <span>Executive Dashboard v2.1</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Data retention: 2 years</span>
            <span>•</span>
            <span>Compliance: SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExecutiveOverviewDashboard;