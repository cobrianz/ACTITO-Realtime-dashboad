import React, { useState, useEffect, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActiveSessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'duration', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterDevice, setFilterDevice] = useState('all');
  const [selectedSessions, setSelectedSessions] = useState(new Set());

  const locations = ['New York', 'London', 'Tokyo', 'Berlin', 'Sydney', 'Toronto', 'Mumbai', 'São Paulo'];
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];

  const generateSession = () => {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const startTime = new Date(Date.now() - Math.random() * 3600000);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      userId: `user_${Math.floor(Math.random() * 10000)}`,
      location,
      device,
      browser,
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      startTime,
      duration: Math.floor((Date.now() - startTime.getTime()) / 1000),
      pageViews: Math.floor(Math.random() * 50) + 1,
      status: Math.random() > 0.1 ? 'active' : 'idle',
      lastActivity: new Date(Date.now() - Math.random() * 300000)
    };
  };

  useEffect(() => {
    // Generate initial sessions
    const initialSessions = [];
    for (let i = 0; i < 500; i++) {
      initialSessions.push(generateSession());
    }
    setSessions(initialSessions);
  }, []);

  useEffect(() => {
    // Update sessions periodically
    const interval = setInterval(() => {
      setSessions(prevSessions => 
        prevSessions.map(session => ({
          ...session,
          duration: session.duration + 5,
          lastActivity: Math.random() > 0.8 ? new Date() : session.lastActivity,
          status: Math.random() > 0.9 ? (session.status === 'active' ? 'idle' : 'active') : session.status
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedSessions = useMemo(() => {
    let filtered = sessions.filter(session => {
      const matchesSearch = session.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.ip.includes(searchTerm);
      const matchesLocation = filterLocation === 'all' || session.location === filterLocation;
      const matchesDevice = filterDevice === 'all' || session.device === filterDevice;
      
      return matchesSearch && matchesLocation && matchesDevice;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'duration') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else if (sortConfig.key === 'lastActivity') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [sessions, sortConfig, searchTerm, filterLocation, filterDevice]);

  const handleSelectSession = (sessionId) => {
    setSelectedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedSessions.size === filteredAndSortedSessions.length) {
      setSelectedSessions(new Set());
    } else {
      setSelectedSessions(new Set(filteredAndSortedSessions.map(s => s.id)));
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    ...locations.map(loc => ({ value: loc, label: loc }))
  ];

  const deviceOptions = [
    { value: 'all', label: 'All Devices' },
    ...devices.map(dev => ({ value: dev, label: dev }))
  ];

  const SessionRow = ({ index, style }) => {
    const session = filteredAndSortedSessions[index];
    const isSelected = selectedSessions.has(session.id);
    
    return (
      <div 
        style={style}
        className={`
          flex items-center px-4 py-3 border-b border-border hover:bg-accent/5 transition-colors duration-150
          ${isSelected ? 'bg-primary/5' : ''}
        `}
      >
        <div className="w-8 flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleSelectSession(session.id)}
            className="rounded border-border"
          />
        </div>
        
        <div className="w-32 flex-shrink-0 font-mono text-sm text-foreground">
          {session.userId}
        </div>
        
        <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">
          {session.location}
        </div>
        
        <div className="w-20 flex-shrink-0 text-sm text-muted-foreground">
          {session.device}
        </div>
        
        <div className="w-32 flex-shrink-0 font-mono text-sm text-muted-foreground">
          {session.ip}
        </div>
        
        <div className="w-24 flex-shrink-0 font-mono text-sm text-foreground">
          {formatDuration(session.duration)}
        </div>
        
        <div className="w-20 flex-shrink-0 text-sm text-center text-muted-foreground">
          {session.pageViews}
        </div>
        
        <div className="w-20 flex-shrink-0">
          <span className={`text-sm font-medium capitalize ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        </div>
        
        <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">
          {formatLastActivity(session.lastActivity)}
        </div>
        
        <div className="w-20 flex-shrink-0 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            iconName="MoreHorizontal"
          >
          </Button>
        </div>
      </div>
    );
  };

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <button
      onClick={() => handleSort(sortKey)}
      className={`
        flex items-center space-x-1 text-left text-sm font-medium text-muted-foreground 
        hover:text-foreground transition-colors duration-150 ${className}
      `}
    >
      <span>{label}</span>
      {sortConfig.key === sortKey && (
        <Icon 
          name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
        />
      )}
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Active Sessions
              </h3>
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedSessions.length} active user sessions
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={locationOptions}
              value={filterLocation}
              onChange={setFilterLocation}
              placeholder="Filter by location"
              className="w-full sm:w-40"
            />
            
            <Select
              options={deviceOptions}
              value={filterDevice}
              onChange={setFilterDevice}
              placeholder="Filter by device"
              className="w-full sm:w-40"
            />
          </div>
        </div>

        {selectedSessions.size > 0 && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedSessions.size} session{selectedSessions.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
                <Button variant="outline" size="sm" iconName="X">
                  Terminate
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center">
          <div className="w-8 flex-shrink-0">
            <input
              type="checkbox"
              checked={selectedSessions.size === filteredAndSortedSessions.length && filteredAndSortedSessions.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
          </div>
          
          <SortableHeader label="User ID" sortKey="userId" className="w-32 flex-shrink-0" />
          <SortableHeader label="Location" sortKey="location" className="w-24 flex-shrink-0" />
          <SortableHeader label="Device" sortKey="device" className="w-20 flex-shrink-0" />
          <div className="w-32 flex-shrink-0 text-sm font-medium text-muted-foreground">IP Address</div>
          <SortableHeader label="Duration" sortKey="duration" className="w-24 flex-shrink-0" />
          <SortableHeader label="Pages" sortKey="pageViews" className="w-20 flex-shrink-0 text-center" />
          <SortableHeader label="Status" sortKey="status" className="w-20 flex-shrink-0" />
          <SortableHeader label="Last Active" sortKey="lastActivity" className="w-24 flex-shrink-0" />
          <div className="w-20 flex-shrink-0"></div>
        </div>
      </div>

      {/* Virtual Table Body */}
      <div className="h-96">
        <List
          height={384}
          itemCount={filteredAndSortedSessions.length}
          itemSize={60}
        >
          {SessionRow}
        </List>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Total: {sessions.length} sessions</span>
            <span>•</span>
            <span>Filtered: {filteredAndSortedSessions.length} sessions</span>
            <span>•</span>
            <span>Active: {sessions.filter(s => s.status === 'active').length}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} className="text-success animate-spin" />
            <span>Auto-refreshing every 5s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessionsTable;