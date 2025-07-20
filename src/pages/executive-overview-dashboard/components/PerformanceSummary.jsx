import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceSummary = ({ systemHealth, trafficGrowth, clientSatisfaction }) => {
  const getHealthColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getHealthStatus = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  const GaugeChart = ({ value, max = 100, color, label }) => {
    const percentage = (value / max) * 100;
    const strokeDasharray = `${percentage * 2.51} 251`;
    
    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 84 84">
          <circle
            cx="42"
            cy="42"
            r="40"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="42"
            cy="42"
            r="40"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* System Health */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="Shield" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">System Health</h3>
              <p className="text-xs text-muted-foreground">Overall platform status</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${getHealthColor(systemHealth.score)}`}>
              {systemHealth.score}%
            </div>
            <div className={`text-sm font-medium ${getHealthColor(systemHealth.score)}`}>
              {getHealthStatus(systemHealth.score)}
            </div>
          </div>
          <GaugeChart 
            value={systemHealth.score} 
            color="var(--color-success)" 
            label="Score"
          />
        </div>
        
        <div className="mt-4 space-y-2">
          {systemHealth.metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.name}</span>
              <span className={`font-medium ${getHealthColor(metric.value)}`}>
                {metric.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Growth */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Traffic Growth</h3>
              <p className="text-xs text-muted-foreground">Monthly increase</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">
              +{trafficGrowth.percentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              vs last month
            </div>
          </div>
          <GaugeChart 
            value={trafficGrowth.percentage} 
            max={50} 
            color="var(--color-primary)" 
            label="Growth"
          />
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <span>{new Intl.NumberFormat('en-US').format(trafficGrowth.totalVisits)} total visits</span>
        </div>
      </div>

      {/* Client Satisfaction */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Icon name="Heart" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Client Satisfaction</h3>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-secondary">
              {clientSatisfaction.rating}/5
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(clientSatisfaction.rating) ? 'text-secondary' : 'text-muted-foreground'}
                />
              ))}
            </div>
          </div>
          <GaugeChart 
            value={clientSatisfaction.rating} 
            max={5} 
            color="var(--color-secondary)" 
            label="Rating"
          />
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <span>Based on {new Intl.NumberFormat('en-US').format(clientSatisfaction.totalResponses)} responses</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;