import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/ui/DashboardLayout';
import GlobalControls from './components/GlobalControls';
import MetricsStrip from './components/MetricsStrip';
import PerformanceChart from './components/PerformanceChart';
import LiveActivityFeed from './components/LiveActivityFeed';
import ActiveSessionsTable from './components/ActiveSessionsTable';
import Icon from '../../components/AppIcon';

const RealTimeOperationsDashboard = () => {
  const [environment, setEnvironment] = useState('production');
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [alertThreshold, setAlertThreshold] = useState('medium');
  const [systemHealth, setSystemHealth] = useState({
    overall: 'healthy',
    services: {
      api: 'healthy',
      database: 'healthy',
      cache: 'warning',
      cdn: 'healthy'
    }
  });

  useEffect(() => {
    // Simulate system health monitoring
    const healthInterval = setInterval(() => {
      const statuses = ['healthy', 'warning', 'critical'];
      const weights = [0.7, 0.2, 0.1];
      
      const getRandomStatus = () => {
        const random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < statuses.length; i++) {
          cumulative += weights[i];
          if (random <= cumulative) return statuses[i];
        }
        return 'healthy';
      };

      setSystemHealth(prev => ({
        overall: getRandomStatus(),
        services: {
          api: getRandomStatus(),
          database: getRandomStatus(),
          cache: getRandomStatus(),
          cdn: getRandomStatus()
        }
      }));
    }, 30000);

    return () => clearInterval(healthInterval);
  }, []);

  const handleEnvironmentChange = (env) => {
    setEnvironment(env);
    // Simulate environment switch effects
    console.log(`Switched to ${env} environment`);
  };

  const handleRefreshIntervalChange = (interval) => {
    setRefreshInterval(interval);
    console.log(`Refresh interval set to ${interval} seconds`);
  };

  const handleAlertThresholdChange = (threshold) => {
    setAlertThreshold(threshold);
    console.log(`Alert threshold set to ${threshold}`);
  };

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
              <Icon name="Monitor" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Real-Time Operations Dashboard
              </h1>
              <p className="text-muted-foreground">
                Mission-critical command center for live platform monitoring
              </p>
            </div>
          </div>

          {/* System Health Overview */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getHealthStatusIcon(systemHealth.overall)} 
                size={16} 
                className={getHealthStatusColor(systemHealth.overall)}
              />
              <span className={`text-sm font-medium capitalize ${getHealthStatusColor(systemHealth.overall)}`}>
                System {systemHealth.overall}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-3 text-sm">
              {Object.entries(systemHealth.services).map(([service, status]) => (
                <div key={service} className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'healthy' ? 'bg-success' :
                    status === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="text-muted-foreground capitalize">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <GlobalControls
          onEnvironmentChange={handleEnvironmentChange}
          onRefreshIntervalChange={handleRefreshIntervalChange}
          onAlertThresholdChange={handleAlertThresholdChange}
        />

        {/* Metrics Strip */}
        <MetricsStrip />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance Chart - Takes 2/3 width on xl screens */}
          <div className="xl:col-span-2">
            <PerformanceChart />
          </div>

          {/* Live Activity Feed - Takes 1/3 width on xl screens */}
          <div className="xl:col-span-1">
            <LiveActivityFeed />
          </div>
        </div>

        {/* Active Sessions Table */}
        <ActiveSessionsTable />

        {/* Additional System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Server" size={16} className="text-muted-foreground" />
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold font-mono text-foreground">99.97%</p>
              <p className="text-sm text-muted-foreground">Server Uptime</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Database" size={16} className="text-muted-foreground" />
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold font-mono text-foreground">2.3ms</p>
              <p className="text-sm text-muted-foreground">DB Query Time</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Zap" size={16} className="text-muted-foreground" />
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold font-mono text-foreground">78%</p>
              <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold font-mono text-foreground">156ms</p>
              <p className="text-sm text-muted-foreground">CDN Response</p>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={14} className="text-success animate-pulse" />
                <span>Real-time monitoring active</span>
              </div>
              <span>•</span>
              <span>Environment: {environment}</span>
              <span>•</span>
              <span>Refresh: {refreshInterval}s</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <Icon name="RefreshCw" size={14} className="animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RealTimeOperationsDashboard;