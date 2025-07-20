import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = () => {
  const [metrics, setMetrics] = useState({
    concurrentUsers: 8247,
    pageViewsPerSecond: 156,
    avgResponseTime: 247,
    systemLoad: 67,
    errorRate: 0.12,
    uptime: 99.97
  });

  const [previousMetrics, setPreviousMetrics] = useState(metrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousMetrics(metrics);
      setMetrics(prev => ({
        concurrentUsers: Math.max(0, prev.concurrentUsers + Math.floor(Math.random() * 200 - 100)),
        pageViewsPerSecond: Math.max(0, prev.pageViewsPerSecond + Math.floor(Math.random() * 20 - 10)),
        avgResponseTime: Math.max(50, prev.avgResponseTime + Math.floor(Math.random() * 100 - 50)),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + Math.floor(Math.random() * 10 - 5))),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() * 0.2 - 0.1))),
        uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() * 0.1 - 0.05)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [metrics]);

  const getMetricStatus = (value, thresholds) => {
    if (value >= thresholds.critical) return 'critical';
    if (value >= thresholds.warning) return 'warning';
    return 'healthy';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-success';
    }
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return 'TrendingUp';
    if (current < previous) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (current, previous, isPositiveGood = true) => {
    const isIncreasing = current > previous;
    if (isPositiveGood) {
      return isIncreasing ? 'text-success' : 'text-error';
    } else {
      return isIncreasing ? 'text-error' : 'text-success';
    }
  };

  const metricsConfig = [
    {
      key: 'concurrentUsers',
      label: 'Concurrent Users',
      icon: 'Users',
      value: metrics.concurrentUsers.toLocaleString(),
      thresholds: { warning: 10000, critical: 15000 },
      isPositiveGood: true,
      suffix: ''
    },
    {
      key: 'pageViewsPerSecond',
      label: 'Page Views/sec',
      icon: 'Eye',
      value: metrics.pageViewsPerSecond,
      thresholds: { warning: 200, critical: 300 },
      isPositiveGood: true,
      suffix: '/s'
    },
    {
      key: 'avgResponseTime',
      label: 'Avg Response Time',
      icon: 'Clock',
      value: metrics.avgResponseTime,
      thresholds: { warning: 500, critical: 1000 },
      isPositiveGood: false,
      suffix: 'ms'
    },
    {
      key: 'systemLoad',
      label: 'System Load',
      icon: 'Activity',
      value: metrics.systemLoad,
      thresholds: { warning: 70, critical: 85 },
      isPositiveGood: false,
      suffix: '%'
    },
    {
      key: 'errorRate',
      label: 'Error Rate',
      icon: 'AlertTriangle',
      value: metrics.errorRate.toFixed(2),
      thresholds: { warning: 1, critical: 2 },
      isPositiveGood: false,
      suffix: '%'
    },
    {
      key: 'uptime',
      label: 'Uptime',
      icon: 'Shield',
      value: metrics.uptime.toFixed(2),
      thresholds: { warning: 99, critical: 98 },
      isPositiveGood: true,
      suffix: '%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {metricsConfig.map((metric) => {
        const status = getMetricStatus(metrics[metric.key], metric.thresholds);
        const statusColor = getStatusColor(status);
        const trendIcon = getTrendIcon(metrics[metric.key], previousMetrics[metric.key]);
        const trendColor = getTrendColor(metrics[metric.key], previousMetrics[metric.key], metric.isPositiveGood);

        return (
          <div
            key={metric.key}
            className="bg-card border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metric.icon} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                <span className="text-sm text-muted-foreground font-medium">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={trendIcon} 
                  size={12} 
                  className={trendColor}
                />
                <div className={`w-2 h-2 rounded-full ${
                  status === 'critical' ? 'bg-error' :
                  status === 'warning' ? 'bg-warning' : 'bg-success'
                } animate-pulse`}></div>
              </div>
            </div>
            
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-bold font-mono ${statusColor}`}>
                {metric.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {metric.suffix}
              </span>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsStrip;