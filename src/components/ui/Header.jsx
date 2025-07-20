import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate WebSocket connection status
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="var(--color-background)" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground tracking-tight">
                ACTITO Analytics
              </h1>
              <span className="text-xs text-muted-foreground font-mono">
                Command Center
              </span>
            </div>
          </div>
        </div>

        {/* Center Status Indicators */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={`${getConnectionStatusColor()} transition-colors duration-150`}
            />
            <span className={`text-sm font-medium ${getConnectionStatusColor()} capitalize`}>
              {connectionStatus}
            </span>
          </div>

          {/* Data Refresh Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Live Data
            </span>
          </div>

          {/* System Load */}
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground font-mono">
              CPU: 23%
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Date Time Display */}
          <div className="hidden lg:flex flex-col items-end">
            <div className="text-sm font-mono text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Global Controls */}
          <div className="flex items-center space-x-2">
            {/* Date Range Selector */}
            <button className="flex items-center space-x-2 px-3 py-2 bg-card hover:bg-accent/10 border border-border rounded-md transition-colors duration-150">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground hidden sm:inline">
                Last 24h
              </span>
              <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-accent/10 rounded-md transition-colors duration-150">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
                <span className="text-xs text-error-foreground font-bold">3</span>
              </div>
            </button>

            {/* User Profile */}
            <button className="flex items-center space-x-2 p-2 hover:bg-accent/10 rounded-md transition-colors duration-150">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-background" />
              </div>
              <Icon name="ChevronDown" size={14} className="text-muted-foreground hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;