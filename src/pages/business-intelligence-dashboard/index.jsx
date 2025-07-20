import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/ui/DashboardLayout';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import KPICard from './components/KPICard';
import AdvancedFilterPanel from './components/AdvancedFilterPanel';
import RevenueAnalysisChart from './components/RevenueAnalysisChart';
import CustomerSegmentationChart from './components/CustomerSegmentationChart';
import PerformanceCorrelationMatrix from './components/PerformanceCorrelationMatrix';
import DataExportPanel from './components/DataExportPanel';

const BusinessIntelligenceDashboard = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [comparisonPeriod, setComparisonPeriod] = useState('yoy');
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);

  const comparisonOptions = [
    { value: 'yoy', label: 'Year over Year' },
    { value: 'qoq', label: 'Quarter over Quarter' },
    { value: 'mom', label: 'Month over Month' },
    { value: 'wow', label: 'Week over Week' }
  ];

  const layoutOptions = [
    { value: 'default', label: 'Default Layout' },
    { value: 'executive', label: 'Executive View' },
    { value: 'analyst', label: 'Analyst Focus' },
    { value: 'custom', label: 'Custom Layout' }
  ];

  const kpiData = [
    {
      title: 'Revenue Growth',
      value: '$6.32M',
      change: '+18.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: [4.2, 4.8, 5.1, 5.6, 6.0, 6.32],
      benchmark: '$6.0M',
      period: 'vs last year'
    },
    {
      title: 'Customer Lifetime Value',
      value: '$4,850',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Users',
      trend: [4200, 4350, 4500, 4650, 4750, 4850],
      benchmark: '$4,500',
      period: 'vs last quarter'
    },
    {
      title: 'Churn Rate',
      value: '5.8%',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'UserMinus',
      trend: [8.2, 7.8, 7.1, 6.5, 6.0, 5.8],
      benchmark: '6.5%',
      period: 'vs last quarter'
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$285',
      change: '-8.4%',
      changeType: 'positive',
      icon: 'UserPlus',
      trend: [320, 310, 305, 295, 290, 285],
      benchmark: '$300',
      period: 'vs last quarter'
    },
    {
      title: 'Retention Rate',
      value: '94.2%',
      change: '+3.1%',
      changeType: 'positive',
      icon: 'Shield',
      trend: [89.5, 90.8, 91.5, 92.8, 93.5, 94.2],
      benchmark: '92.0%',
      period: 'vs last quarter'
    },
    {
      title: 'Market Penetration',
      value: '23.7%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Target',
      trend: [18.2, 19.5, 20.8, 21.9, 22.8, 23.7],
      benchmark: '22.0%',
      period: 'vs last year'
    }
  ];

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    console.log('Applied filters:', filters);
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update dashboard data
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business Intelligence Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive analytical capabilities with advanced reporting and forecasting tools
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Multi-dimensional Filtering */}
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {activeFilters.length > 0 ? `${activeFilters.length} filters active` : 'No filters'}
              </span>
            </div>
            
            {/* Comparative Analysis Selector */}
            <Select
              options={comparisonOptions}
              value={comparisonPeriod}
              onChange={setComparisonPeriod}
              className="w-40"
            />
            
            {/* Dashboard Personalization */}
            <Button
              variant="outline"
              onClick={() => setIsPersonalizationOpen(!isPersonalizationOpen)}
              iconName="Settings"
              iconPosition="left"
            >
              Customize
            </Button>
          </div>
        </div>

        {/* Personalization Panel */}
        {isPersonalizationOpen && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Dashboard Personalization</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPersonalizationOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Layout Template"
                options={layoutOptions}
                value={dashboardLayout}
                onChange={setDashboardLayout}
              />
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Move" size={16} />
                  Drag & Drop Mode
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Save" size={16} />
                  Save Layout
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="RotateCcw" size={16} />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Primary Metrics Section - 6 Configurable KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              trend={kpi.trend}
              benchmark={kpi.benchmark}
              period={kpi.period}
            />
          ))}
        </div>

        {/* Main Analytical Area - 9 cols + Advanced Filtering Panel - 3 cols */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Main Analytics Section */}
          <div className="xl:col-span-9 space-y-6">
            {/* Revenue Analysis with Forecasting */}
            <RevenueAnalysisChart />
            
            {/* Customer Segmentation Analysis */}
            <CustomerSegmentationChart />
            
            {/* Performance Correlation Matrix */}
            <PerformanceCorrelationMatrix />
          </div>
          
          {/* Advanced Filtering Panel */}
          <div className="xl:col-span-3">
            <AdvancedFilterPanel onFiltersChange={handleFiltersChange} />
          </div>
        </div>

        {/* Data Export and Reporting Section */}
        <DataExportPanel />

        {/* Collaborative Features */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Icon name="MessageSquare" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Collaborative Annotations</h3>
                <p className="text-sm text-muted-foreground">
                  Share insights and collaborate with your team
                </p>
              </div>
            </div>
            
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Add Annotation
            </Button>
          </div>
          
          <div className="space-y-3">
            {[
              {
                user: 'Sarah Chen',
                time: '2 hours ago',
                content: 'The correlation between customer satisfaction and retention is particularly strong this quarter. We should investigate what\'s driving this improvement.',
                type: 'insight'
              },
              {
                user: 'Michael Rodriguez',
                time: '1 day ago',
                content: 'Revenue forecast accuracy has improved to 94.8%. The new ML model is performing well.',
                type: 'update'
              },
              {
                user: 'Emily Johnson',
                time: '2 days ago',
                content: 'Customer acquisition cost is trending down nicely. Marketing efficiency initiatives are paying off.',
                type: 'observation'
              }
            ].map((annotation, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-background">
                        {annotation.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{annotation.user}</p>
                      <p className="text-xs text-muted-foreground">{annotation.time}</p>
                    </div>
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${annotation.type === 'insight' ? 'bg-success/10 text-success' : ''}
                    ${annotation.type === 'update' ? 'bg-primary/10 text-primary' : ''}
                    ${annotation.type === 'observation' ? 'bg-accent/10 text-accent' : ''}
                  `}>
                    {annotation.type}
                  </div>
                </div>
                <p className="text-sm text-foreground">{annotation.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Last updated: {new Date().toLocaleString()}</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live data</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Data retention: 24 months</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} ACTITO Analytics</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessIntelligenceDashboard;