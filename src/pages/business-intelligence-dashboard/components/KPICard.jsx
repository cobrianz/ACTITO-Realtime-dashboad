import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend, 
  benchmark,
  period = "vs last period",
  isCustomizable = true 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendData = () => {
    if (!trend) return [];
    return trend.map((value, index) => ({
      x: index,
      y: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
        </div>
        {isCustomizable && (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-accent/10 rounded">
            <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Change Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">{period}</span>
        </div>
        {benchmark && (
          <div className="text-xs text-muted-foreground">
            Benchmark: {benchmark}
          </div>
        )}
      </div>

      {/* Mini Trend Chart */}
      {trend && trend.length > 0 && (
        <div className="h-12 w-full">
          <svg width="100%" height="100%" className="overflow-visible">
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {getTrendData().map((point, index) => {
              if (index === 0) return null;
              const prevPoint = getTrendData()[index - 1];
              const x1 = (prevPoint.x / (trend.length - 1)) * 100;
              const y1 = 100 - ((prevPoint.y - Math.min(...trend)) / (Math.max(...trend) - Math.min(...trend))) * 80;
              const x2 = (point.x / (trend.length - 1)) * 100;
              const y2 = 100 - ((point.y - Math.min(...trend)) / (Math.max(...trend) - Math.min(...trend))) * 80;
              
              return (
                <line
                  key={index}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};

export default KPICard;