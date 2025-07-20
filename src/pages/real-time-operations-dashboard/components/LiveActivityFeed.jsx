import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const feedRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const activityTypes = {
    user: { icon: 'User', color: 'text-primary', bg: 'bg-primary/10' },
    system: { icon: 'Server', color: 'text-accent', bg: 'bg-accent/10' },
    error: { icon: 'AlertTriangle', color: 'text-error', bg: 'bg-error/10' },
    performance: { icon: 'Activity', color: 'text-warning', bg: 'bg-warning/10' },
    security: { icon: 'Shield', color: 'text-success', bg: 'bg-success/10' }
  };

  const generateActivity = () => {
    const types = Object.keys(activityTypes);
    const type = types[Math.floor(Math.random() * types.length)];
    
    const activities = {
      user: [
        `User logged in from New York, US`,
        `New user registration from London, UK`,
        `User session started from Tokyo, JP`,
        `Password reset requested from Berlin, DE`,
        `User profile updated from Sydney, AU`,
        `Two-factor authentication enabled`,
        `User preferences updated`,
        `Account verification completed`
      ],
      system: [
        `Database backup completed successfully`,
        `Cache cleared and rebuilt`,
        `System health check passed`,
        `Auto-scaling triggered: +2 instances`,
        `Load balancer configuration updated`,
        `SSL certificate renewed`,
        `Maintenance window scheduled`,
        `System update deployed`
      ],
      error: [
        `HTTP 500 error on /api/users endpoint`,
        `Database connection timeout`,
        `Payment gateway error detected`,
        `File upload failed: size limit exceeded`,
        `API rate limit exceeded for client`,
        `Authentication service unavailable`,
        `Memory usage threshold exceeded`,
        `Disk space warning: 85% full`
      ],
      performance: [
        `Response time spike detected: 2.3s avg`,
        `CPU usage increased to 78%`,
        `Memory usage at 82% capacity`,
        `Database query optimization needed`,
        `CDN cache hit ratio dropped to 65%`,
        `Network latency increased: 150ms`,
        `Concurrent connections: 15,247`,
        `Page load time improved by 23%`
      ],
      security: [
        `Failed login attempt blocked`,
        `Suspicious IP address detected`,
        `DDoS attack mitigated successfully`,
        `Security scan completed - no threats`,
        `Firewall rule updated`,
        `Intrusion detection alert resolved`,
        `SSL/TLS handshake anomaly detected`,
        `Access control policy updated`
      ]
    };

    const messages = activities[type];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    return {
      id: Date.now() + Math.random(),
      type,
      message,
      timestamp: new Date(),
      severity: type === 'error' ? 'high' : type === 'performance' ? 'medium' : 'low',
      acknowledged: false
    };
  };

  useEffect(() => {
    // Generate initial activities
    const initialActivities = [];
    for (let i = 0; i < 20; i++) {
      const activity = generateActivity();
      activity.timestamp = new Date(Date.now() - i * 30000);
      initialActivities.unshift(activity);
    }
    setActivities(initialActivities);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 99)]); // Keep only last 100 activities
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (autoScroll && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [activities, autoScroll]);

  const handleAcknowledge = (id) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id ? { ...activity, acknowledged: true } : activity
      )
    );
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      default: return 'border-l-success';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return timestamp.toLocaleDateString();
  };

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities.length },
    { value: 'user', label: 'User Events', count: activities.filter(a => a.type === 'user').length },
    { value: 'system', label: 'System Events', count: activities.filter(a => a.type === 'system').length },
    { value: 'error', label: 'Errors', count: activities.filter(a => a.type === 'error').length },
    { value: 'performance', label: 'Performance', count: activities.filter(a => a.type === 'performance').length },
    { value: 'security', label: 'Security', count: activities.filter(a => a.type === 'security').length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Activity" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Live Activity Feed
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time system events and user interactions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isPaused ? "default" : "outline"}
              size="sm"
              iconName={isPaused ? "Play" : "Pause"}
              iconPosition="left"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150
                ${filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-accent/10 text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {option.label}
              <span className="ml-1 opacity-75">({option.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div 
        ref={feedRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: '600px' }}
      >
        {filteredActivities.map((activity) => {
          const typeConfig = activityTypes[activity.type];
          
          return (
            <div
              key={activity.id}
              className={`
                border-l-4 ${getSeverityColor(activity.severity)} 
                bg-background/50 hover:bg-accent/5 p-3 rounded-r-md transition-colors duration-150
                ${activity.acknowledged ? 'opacity-60' : ''}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-1.5 rounded-md ${typeConfig.bg}`}>
                    <Icon 
                      name={typeConfig.icon} 
                      size={14} 
                      className={typeConfig.color}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium
                        ${activity.severity === 'high' ? 'bg-error/10 text-error' :
                          activity.severity === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                        }
                      `}>
                        {activity.severity}
                      </span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium capitalize
                        ${typeConfig.bg} ${typeConfig.color}
                      `}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>

                {!activity.acknowledged && activity.severity === 'high' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Check"
                    onClick={() => handleAcknowledge(activity.id)}
                    className="ml-2 flex-shrink-0"
                  >
                    Ack
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activities found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Live feed {isPaused ? 'paused' : 'active'}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>Showing {filteredActivities.length} activities</span>
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
            >
              <Icon name={autoScroll ? "ArrowDown" : "ArrowUp"} size={12} />
              <span>Auto-scroll</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityFeed;