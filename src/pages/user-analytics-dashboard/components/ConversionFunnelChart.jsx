import React, { useState } from 'react';
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import Icon from '../../../components/AppIcon';

const ConversionFunnelChart = () => {
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const funnelData = [
    {
      name: 'Landing Page Views',
      value: 100000,
      users: 100000,
      percentage: 100,
      color: '#00FFFF'
    },
    {
      name: 'Product Page Views',
      value: 75000,
      users: 75000,
      percentage: 75,
      color: '#32FF32'
    },
    {
      name: 'Add to Cart',
      value: 45000,
      users: 45000,
      percentage: 45,
      color: '#6366F1'
    },
    {
      name: 'Checkout Started',
      value: 28000,
      users: 28000,
      percentage: 28,
      color: '#F59E0B'
    },
    {
      name: 'Payment Completed',
      value: 18500,
      users: 18500,
      percentage: 18.5,
      color: '#10B981'
    }
  ];

  const cohortOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'new', label: 'New Users' },
    { value: 'returning', label: 'Returning Users' },
    { value: 'premium', label: 'Premium Users' }
  ];

  const timeRangeOptions = [
    { value: '1d', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-foreground mb-2">{data.name}</h4>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Users: <span className="text-foreground font-medium">{data.users.toLocaleString()}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Conversion: <span className="text-foreground font-medium">{data.percentage}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const calculateDropoff = (current, previous) => {
    if (!previous) return 0;
    return ((previous.users - current.users) / previous.users * 100).toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Conversion Funnel Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            User journey progression with conversion rates and drop-off points
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {cohortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Chart */}
        <div className="lg:col-span-2">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="name" 
                    position="center" 
                    fill="#fff" 
                    fontSize={12}
                    fontWeight="500"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Stage Metrics</h4>
          {funnelData.map((stage, index) => {
            const previousStage = index > 0 ? funnelData[index - 1] : null;
            const dropoff = calculateDropoff(stage, previousStage);
            
            return (
              <div
                key={stage.name}
                className="p-4 bg-background border border-border rounded-lg hover:bg-accent/5 transition-colors duration-150"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-foreground">
                    {stage.name}
                  </h5>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="text-foreground font-medium">
                      {stage.users.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversion:</span>
                    <span className="text-foreground font-medium">
                      {stage.percentage}%
                    </span>
                  </div>
                  
                  {index > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Drop-off:</span>
                      <span className="text-error font-medium">
                        -{dropoff}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Overall Conversion
              </span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {funnelData[funnelData.length - 1].percentage}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              From landing to completion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnelChart;