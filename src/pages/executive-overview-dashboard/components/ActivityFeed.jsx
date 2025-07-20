import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'milestone':
        return 'Trophy';
      case 'alert':
        return 'AlertTriangle';
      case 'achievement':
        return 'Award';
      case 'system':
        return 'Settings';
      case 'user':
        return 'Users';
      case 'revenue':
        return 'DollarSign';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type, severity = 'info') => {
    if (type === 'alert') {
      switch (severity) {
        case 'critical':
          return 'text-error';
        case 'warning':
          return 'text-warning';
        default:
          return 'text-primary';
      }
    }
    
    switch (type) {
      case 'milestone':
        return 'text-secondary';
      case 'achievement':
        return 'text-success';
      case 'revenue':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActivityBgColor = (type, severity = 'info') => {
    if (type === 'alert') {
      switch (severity) {
        case 'critical':
          return 'bg-error/10';
        case 'warning':
          return 'bg-warning/10';
        default:
          return 'bg-primary/10';
      }
    }
    
    switch (type) {
      case 'milestone':
        return 'bg-secondary/10';
      case 'achievement':
        return 'bg-success/10';
      case 'revenue':
        return 'bg-primary/10';
      default:
        return 'bg-muted/10';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Activity Feed</h3>
          <p className="text-sm text-muted-foreground">Critical alerts and milestones</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activities</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-accent/5 rounded-lg transition-colors duration-150">
              <div className={`p-2 rounded-lg ${getActivityBgColor(activity.type, activity.severity)}`}>
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={16} 
                  className={getActivityColor(activity.type, activity.severity)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 leading-tight">
                      {activity.description}
                    </p>
                    {activity.metrics && (
                      <div className="flex items-center space-x-4 mt-2">
                        {activity.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="text-xs">
                            <span className="text-muted-foreground">{metric.label}: </span>
                            <span className="font-medium text-foreground">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {Math.min(activities.length, 10)} of {activities.length} activities
            </span>
            <button className="text-primary hover:text-primary/80 transition-colors duration-150">
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;