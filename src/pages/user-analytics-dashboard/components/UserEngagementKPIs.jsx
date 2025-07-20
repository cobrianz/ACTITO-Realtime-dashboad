import React from 'react';
import Icon from '../../../components/AppIcon';

const UserEngagementKPIs = () => {
  const kpiData = [
    {
      id: 'daily-active-users',
      title: 'Daily Active Users',
      value: '24,847',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Active users in last 24h',
      trend: [65, 72, 68, 78, 85, 92, 88, 95, 102, 98, 105, 112]
    },
    {
      id: 'session-duration',
      title: 'Avg Session Duration',
      value: '8m 42s',
      change: '+5.7%',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Average time per session',
      trend: [480, 495, 502, 518, 522, 535, 528, 542, 548, 555, 562, 522]
    },
    {
      id: 'bounce-rate',
      title: 'Bounce Rate',
      value: '23.4%',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'TrendingDown',
      description: 'Single page sessions',
      trend: [28, 27, 26, 25, 24, 23, 24, 23, 22, 21, 23, 23.4]
    },
    {
      id: 'conversion-funnel',
      title: 'Funnel Completion',
      value: '67.8%',
      change: '+8.9%',
      changeType: 'positive',
      icon: 'Target',
      description: 'End-to-end conversion',
      trend: [58, 60, 62, 64, 65, 66, 67, 68, 67, 66, 68, 67.8]
    },
    {
      id: 'feature-adoption',
      title: 'Feature Adoption',
      value: '45.2%',
      change: '+15.6%',
      changeType: 'positive',
      icon: 'Zap',
      description: 'New feature usage rate',
      trend: [32, 34, 36, 38, 40, 42, 43, 44, 45, 46, 45, 45.2]
    }
  ];

  const renderMiniChart = (trend) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-0.5 h-8 w-16">
        {trend.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className="bg-primary/30 rounded-sm flex-1"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-card border border-border rounded-lg p-6 hover:bg-accent/5 transition-colors duration-150"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon 
                  name={kpi.icon} 
                  size={20} 
                  className="text-primary"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </h3>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {kpi.value}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium ${
                  kpi.changeType === 'positive' ?'text-success' :'text-error'
                }`}
              >
                {kpi.change}
              </span>
              <Icon
                name={kpi.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'}
                size={14}
                className={
                  kpi.changeType === 'positive' ?'text-success' :'text-error'
                }
              />
            </div>
            {renderMiniChart(kpi.trend)}
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            {kpi.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserEngagementKPIs;