import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceCorrelationMatrix = () => {
  const [selectedMetrics, setSelectedMetrics] = useState('all');
  const [significanceLevel, setSignificanceLevel] = useState('0.05');

  const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'revenue', label: 'Revenue Focused' },
    { value: 'customer', label: 'Customer Focused' },
    { value: 'operational', label: 'Operational' }
  ];

  const significanceOptions = [
    { value: '0.01', label: '99% Confidence' },
    { value: '0.05', label: '95% Confidence' },
    { value: '0.10', label: '90% Confidence' }
  ];

  const correlationData = [
    {
      metric: 'Revenue Growth',
      correlations: {
        'Revenue Growth': 1.00,
        'Customer Acquisition': 0.85,
        'Customer Retention': 0.72,
        'Average Order Value': 0.68,
        'Market Penetration': 0.61,
        'Customer Satisfaction': 0.58,
        'Churn Rate': -0.74,
        'Support Tickets': -0.32
      }
    },
    {
      metric: 'Customer Acquisition',
      correlations: {
        'Revenue Growth': 0.85,
        'Customer Acquisition': 1.00,
        'Customer Retention': 0.45,
        'Average Order Value': 0.52,
        'Market Penetration': 0.78,
        'Customer Satisfaction': 0.41,
        'Churn Rate': -0.38,
        'Support Tickets': -0.28
      }
    },
    {
      metric: 'Customer Retention',
      correlations: {
        'Revenue Growth': 0.72,
        'Customer Acquisition': 0.45,
        'Customer Retention': 1.00,
        'Average Order Value': 0.63,
        'Market Penetration': 0.39,
        'Customer Satisfaction': 0.82,
        'Churn Rate': -0.91,
        'Support Tickets': -0.56
      }
    },
    {
      metric: 'Average Order Value',
      correlations: {
        'Revenue Growth': 0.68,
        'Customer Acquisition': 0.52,
        'Customer Retention': 0.63,
        'Average Order Value': 1.00,
        'Market Penetration': 0.44,
        'Customer Satisfaction': 0.59,
        'Churn Rate': -0.47,
        'Support Tickets': -0.31
      }
    },
    {
      metric: 'Market Penetration',
      correlations: {
        'Revenue Growth': 0.61,
        'Customer Acquisition': 0.78,
        'Customer Retention': 0.39,
        'Average Order Value': 0.44,
        'Market Penetration': 1.00,
        'Customer Satisfaction': 0.35,
        'Churn Rate': -0.29,
        'Support Tickets': -0.22
      }
    },
    {
      metric: 'Customer Satisfaction',
      correlations: {
        'Revenue Growth': 0.58,
        'Customer Acquisition': 0.41,
        'Customer Retention': 0.82,
        'Average Order Value': 0.59,
        'Market Penetration': 0.35,
        'Customer Satisfaction': 1.00,
        'Churn Rate': -0.79,
        'Support Tickets': -0.67
      }
    },
    {
      metric: 'Churn Rate',
      correlations: {
        'Revenue Growth': -0.74,
        'Customer Acquisition': -0.38,
        'Customer Retention': -0.91,
        'Average Order Value': -0.47,
        'Market Penetration': -0.29,
        'Customer Satisfaction': -0.79,
        'Churn Rate': 1.00,
        'Support Tickets': 0.62
      }
    },
    {
      metric: 'Support Tickets',
      correlations: {
        'Revenue Growth': -0.32,
        'Customer Acquisition': -0.28,
        'Customer Retention': -0.56,
        'Average Order Value': -0.31,
        'Market Penetration': -0.22,
        'Customer Satisfaction': -0.67,
        'Churn Rate': 0.62,
        'Support Tickets': 1.00
      }
    }
  ];

  const getCorrelationColor = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return value > 0 ? 'bg-success' : 'bg-error';
    if (absValue >= 0.6) return value > 0 ? 'bg-success/70' : 'bg-error/70';
    if (absValue >= 0.4) return value > 0 ? 'bg-success/50' : 'bg-error/50';
    if (absValue >= 0.2) return value > 0 ? 'bg-success/30' : 'bg-error/30';
    return 'bg-muted/50';
  };

  const getCorrelationIntensity = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return 'opacity-100';
    if (absValue >= 0.6) return 'opacity-80';
    if (absValue >= 0.4) return 'opacity-60';
    if (absValue >= 0.2) return 'opacity-40';
    return 'opacity-20';
  };

  const getSignificanceIndicator = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return '***';
    if (absValue >= 0.5) return '**';
    if (absValue >= 0.3) return '*';
    return '';
  };

  const metrics = Object.keys(correlationData[0].correlations);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Grid3X3" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Performance Correlation Matrix</h3>
            <p className="text-sm text-muted-foreground">
              Statistical relationships between key business metrics
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={metricOptions}
            value={selectedMetrics}
            onChange={setSelectedMetrics}
            className="w-40"
          />
          
          <Select
            options={significanceOptions}
            value={significanceLevel}
            onChange={setSignificanceLevel}
            className="w-40"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span className="text-sm text-foreground">Positive Correlation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error rounded"></div>
            <span className="text-sm text-foreground">Negative Correlation</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>*** p &lt; 0.001</span>
          <span>** p &lt; 0.01</span>
          <span>* p &lt; 0.05</span>
        </div>
      </div>

      {/* Correlation Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-9 gap-1 mb-2">
            <div className="p-2"></div>
            {metrics.map((metric, index) => (
              <div key={index} className="p-2 text-xs font-medium text-center text-muted-foreground">
                <div className="transform -rotate-45 origin-center whitespace-nowrap">
                  {metric.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {correlationData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-9 gap-1 mb-1">
              {/* Row Label */}
              <div className="p-2 text-xs font-medium text-right text-muted-foreground flex items-center justify-end">
                {row.metric}
              </div>
              
              {/* Correlation Cells */}
              {metrics.map((metric, colIndex) => {
                const value = row.correlations[metric];
                const isSignificant = Math.abs(value) >= parseFloat(significanceLevel);
                
                return (
                  <div
                    key={colIndex}
                    className={`
                      relative p-2 rounded text-center cursor-pointer transition-all duration-200 hover:scale-105
                      ${getCorrelationColor(value)} ${getCorrelationIntensity(value)}
                      ${!isSignificant ? 'opacity-30' : ''}
                    `}
                    title={`${row.metric} vs ${metric}: ${value.toFixed(3)} ${getSignificanceIndicator(value)}`}
                  >
                    <div className="text-xs font-bold text-foreground">
                      {value.toFixed(2)}
                    </div>
                    {isSignificant && (
                      <div className="text-xs text-foreground/80">
                        {getSignificanceIndicator(value)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Key Correlation Insights</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Strongest Positive</span>
              </div>
              <p className="text-sm text-foreground">
                Customer Retention ↔ Customer Satisfaction (0.82***)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                High satisfaction strongly predicts retention
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Revenue Driver</span>
              </div>
              <p className="text-sm text-foreground">
                Revenue Growth ↔ Customer Acquisition (0.85***)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                New customer acquisition drives revenue growth
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">Strongest Negative</span>
              </div>
              <p className="text-sm text-foreground">
                Customer Retention ↔ Churn Rate (-0.91***)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Perfect inverse relationship as expected
              </p>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">Risk Factor</span>
              </div>
              <p className="text-sm text-foreground">
                Revenue Growth ↔ Churn Rate (-0.74***)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                High churn significantly impacts revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Analysis based on 12 months of data • Updated daily
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Calculator" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            Statistical Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCorrelationMatrix;