import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControls = ({ onEnvironmentChange, onRefreshIntervalChange, onAlertThresholdChange }) => {
  const [environment, setEnvironment] = useState('production');
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [websocketStatus, setWebsocketStatus] = useState('connected');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('medium');

  const environmentOptions = [
    { value: 'production', label: 'Production', description: 'Live production environment' },
    { value: 'staging', label: 'Staging', description: 'Pre-production testing' },
    { value: 'development', label: 'Development', description: 'Development environment' }
  ];

  const refreshOptions = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  const alertThresholdOptions = [
    { value: 'low', label: 'Low Sensitivity', description: 'Fewer alerts, critical only' },
    { value: 'medium', label: 'Medium Sensitivity', description: 'Balanced alert frequency' },
    { value: 'high', label: 'High Sensitivity', description: 'All alerts including warnings' }
  ];

  useEffect(() => {
    // Simulate WebSocket status changes
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected', 'error'];
      const weights = [0.7, 0.1, 0.15, 0.05]; // Higher probability for connected
      const random = Math.random();
      let cumulative = 0;
      
      for (let i = 0; i < statuses.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
          setWebsocketStatus(statuses[i]);
          break;
        }
      }
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  const handleEnvironmentChange = (value) => {
    setEnvironment(value);
    onEnvironmentChange?.(value);
  };

  const handleRefreshIntervalChange = (value) => {
    setRefreshInterval(value);
    onRefreshIntervalChange?.(value);
  };

  const handleAlertThresholdChange = (value) => {
    setAlertThreshold(value);
    onAlertThresholdChange?.(value);
  };

  const getWebSocketStatusColor = () => {
    switch (websocketStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getWebSocketIcon = () => {
    switch (websocketStatus) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'Loader';
      case 'disconnected': return 'WifiOff';
      case 'error': return 'AlertCircle';
      default: return 'Wifi';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Environment & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-4">
            <Select
              label="Environment"
              options={environmentOptions}
              value={environment}
              onChange={handleEnvironmentChange}
              className="min-w-[160px]"
            />
            
            <div className="flex items-center space-x-2">
              <Icon 
                name={getWebSocketIcon()} 
                size={16} 
                className={`${getWebSocketStatusColor()} ${websocketStatus === 'connecting' ? 'animate-spin' : ''}`}
              />
              <span className={`text-sm font-medium ${getWebSocketStatusColor()} capitalize`}>
                {websocketStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Real-time monitoring active
            </span>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Select
            label="Refresh Interval"
            options={refreshOptions}
            value={refreshInterval}
            onChange={handleRefreshIntervalChange}
            className="min-w-[140px]"
          />

          <Select
            label="Alert Threshold"
            options={alertThresholdOptions}
            value={alertThreshold}
            onChange={handleAlertThresholdChange}
            className="min-w-[160px]"
          />

          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              iconName={autoRefresh ? "Pause" : "Play"}
              iconPosition="left"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Configure
            </Button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <span>Data latency: &lt;100ms</span>
            <span>•</span>
            <span>Active alerts: 3</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {environment.charAt(0).toUpperCase() + environment.slice(1)} DB
            </span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;