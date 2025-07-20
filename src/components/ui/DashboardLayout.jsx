import React, { createContext, useContext, useState, useEffect } from 'react';
import Header from './Header';
import NavigationTabs from './NavigationTabs';

// Dashboard Context for shared state management
const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const DashboardLayout = ({ children }) => {
  const [websocketStatus, setWebsocketStatus] = useState('connected');
  const [userRole, setUserRole] = useState('admin');
  const [dateRange, setDateRange] = useState('24h');
  const [theme, setTheme] = useState('dark');
  const [globalFilters, setGlobalFilters] = useState({});
  const [realTimeData, setRealTimeData] = useState({});

  // WebSocket connection management
  useEffect(() => {
    // Simulate WebSocket connection
    const ws = {
      onopen: () => setWebsocketStatus('connected'),
      onclose: () => setWebsocketStatus('disconnected'),
      onerror: () => setWebsocketStatus('error'),
    };

    // Simulate connection status changes
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setWebsocketStatus(randomStatus);
    }, 45000);

    // Simulate real-time data updates
    const dataInterval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        metrics: {
          activeUsers: Math.floor(Math.random() * 10000) + 5000,
          systemLoad: Math.floor(Math.random() * 100),
          responseTime: Math.floor(Math.random() * 500) + 100,
        }
      }));
    }, 5000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(dataInterval);
    };
  }, []);

  // Context value
  const contextValue = {
    websocketStatus,
    userRole,
    dateRange,
    setDateRange,
    theme,
    setTheme,
    globalFilters,
    setGlobalFilters,
    realTimeData,
    setRealTimeData,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Global Header */}
        <Header />
        
        {/* Navigation Tabs */}
        <NavigationTabs />
        
        {/* Main Content Area */}
        <main className="pt-32 min-h-screen">
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;