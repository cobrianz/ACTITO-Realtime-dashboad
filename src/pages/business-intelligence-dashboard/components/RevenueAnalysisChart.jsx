import React, { useState } from 'react';
import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RevenueAnalysisChart = () => {
  const [chartType, setChartType] = useState('composed');
  const [timeRange, setTimeRange] = useState('12m');
  const [showForecast, setShowForecast] = useState(true);

  const chartTypeOptions = [
    { value: 'composed', label: 'Combined View' },
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'area', label: 'Area Chart' }
  ];

  const timeRangeOptions = [
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '12m', label: 'Last 12 Months' },
    { value: '24m', label: 'Last 24 Months' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const revenueData = [
    {
      month: 'Jan 2024',
      revenue: 485000,
      forecast: 490000,
      target: 500000,
      previousYear: 420000,
      customers: 1250,
      avgOrderValue: 388
    },
    {
      month: 'Feb 2024',
      revenue: 520000,
      forecast: 525000,
      target: 520000,
      previousYear: 445000,
      customers: 1340,
      avgOrderValue: 388
    },
    {
      month: 'Mar 2024',
      revenue: 578000,
      forecast: 580000,
      target: 550000,
      previousYear: 485000,
      customers: 1490,
      avgOrderValue: 388
    },
    {
      month: 'Apr 2024',
      revenue: 612000,
      forecast: 615000,
      target: 580000,
      previousYear: 520000,
      customers: 1580,
      avgOrderValue: 387
    },
    {
      month: 'May 2024',
      revenue: 645000,
      forecast: 650000,
      target: 600000,
      previousYear: 555000,
      customers: 1665,
      avgOrderValue: 387
    },
    {
      month: 'Jun 2024',
      revenue: 698000,
      forecast: 705000,
      target: 650000,
      previousYear: 590000,
      customers: 1802,
      avgOrderValue: 387
    },
    {
      month: 'Jul 2024',
      revenue: 725000,
      forecast: 730000,
      target: 680000,
      previousYear: 615000,
      customers: 1873,
      avgOrderValue: 387
    },
    {
      month: 'Aug 2024',
      revenue: null,
      forecast: 755000,
      target: 720000,
      previousYear: 645000,
      customers: null,
      avgOrderValue: null
    },
    {
      month: 'Sep 2024',
      revenue: null,
      forecast: 780000,
      target: 750000,
      previousYear: 670000,
      customers: null,
      avgOrderValue: null
    },
    {
      month: 'Oct 2024',
      revenue: null,
      forecast: 810000,
      target: 780000,
      previousYear: 695000,
      customers: null,
      avgOrderValue: null
    },
    {
      month: 'Nov 2024',
      revenue: null,
      forecast: 835000,
      target: 800000,
      previousYear: 720000,
      customers: null,
      avgOrderValue: null
    },
    {
      month: 'Dec 2024',
      revenue: null,
      forecast: 865000,
      target: 850000,
      previousYear: 745000,
      customers: null,
      avgOrderValue: null
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}:</span>
              </div>
              <span className="font-medium text-foreground">
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: revenueData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="month" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Bar 
            dataKey="revenue" 
            fill="var(--color-primary)" 
            name="Actual Revenue"
            opacity={0.8}
          />
          
          {showForecast && (
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecast"
              dot={false}
            />
          )}
          
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="var(--color-accent)" 
            strokeWidth={2}
            name="Target"
            dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
          />
          
          <Area 
            type="monotone" 
            dataKey="previousYear" 
            fill="var(--color-muted)" 
            stroke="var(--color-muted-foreground)"
            fillOpacity={0.3}
            name="Previous Year"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Analysis & Forecasting</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive revenue trends with predictive modeling
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          
          <Select
            options={chartTypeOptions}
            value={chartType}
            onChange={setChartType}
            className="w-40"
          />
          
          <Button
            variant={showForecast ? "default" : "outline"}
            size="sm"
            onClick={() => setShowForecast(!showForecast)}
            iconName="Zap"
            iconPosition="left"
          >
            Forecast
          </Button>
        </div>
      </div>

      {/* Statistical Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-xl font-bold text-foreground">$4.26M</p>
          <p className="text-xs text-success">+18.5% YoY</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Target Achievement</span>
          </div>
          <p className="text-xl font-bold text-foreground">107.2%</p>
          <p className="text-xs text-success">Above target</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-secondary" />
            <span className="text-sm text-muted-foreground">Growth Rate</span>
          </div>
          <p className="text-xl font-bold text-foreground">12.4%</p>
          <p className="text-xs text-muted-foreground">Monthly avg</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">Forecast Accuracy</span>
          </div>
          <p className="text-xl font-bold text-foreground">94.8%</p>
          <p className="text-xs text-success">High confidence</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        {renderChart()}
      </div>

      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Actual Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span>Forecast</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Target</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
            <span>Previous Year</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Share" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalysisChart;