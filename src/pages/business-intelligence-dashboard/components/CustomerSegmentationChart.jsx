import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CustomerSegmentationChart = () => {
  const [viewType, setViewType] = useState('pie');
  const [segmentBy, setSegmentBy] = useState('value');

  const viewTypeOptions = [
    { value: 'pie', label: 'Pie Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'scatter', label: 'Scatter Plot' }
  ];

  const segmentOptions = [
    { value: 'value', label: 'Customer Value' },
    { value: 'industry', label: 'Industry' },
    { value: 'geography', label: 'Geography' },
    { value: 'size', label: 'Company Size' },
    { value: 'lifecycle', label: 'Lifecycle Stage' }
  ];

  const segmentationData = {
    value: [
      { name: 'Enterprise', value: 45, count: 125, revenue: 2850000, color: '#00FFFF' },
      { name: 'Mid-Market', value: 30, count: 340, revenue: 1890000, color: '#32FF32' },
      { name: 'SMB', value: 20, count: 680, revenue: 1260000, color: '#6366F1' },
      { name: 'Startup', value: 5, count: 155, revenue: 315000, color: '#F59E0B' }
    ],
    industry: [
      { name: 'Technology', value: 35, count: 420, revenue: 2205000, color: '#00FFFF' },
      { name: 'Healthcare', value: 25, count: 300, revenue: 1575000, color: '#32FF32' },
      { name: 'Finance', value: 20, count: 240, revenue: 1260000, color: '#6366F1' },
      { name: 'Retail', value: 12, count: 144, revenue: 756000, color: '#F59E0B' },
      { name: 'Manufacturing', value: 8, count: 96, revenue: 504000, color: '#EF4444' }
    ],
    geography: [
      { name: 'North America', value: 40, count: 480, revenue: 2520000, color: '#00FFFF' },
      { name: 'Europe', value: 30, count: 360, revenue: 1890000, color: '#32FF32' },
      { name: 'Asia Pacific', value: 20, count: 240, revenue: 1260000, color: '#6366F1' },
      { name: 'Latin America', value: 7, count: 84, revenue: 441000, color: '#F59E0B' },
      { name: 'Others', value: 3, count: 36, revenue: 189000, color: '#EF4444' }
    ]
  };

  const scatterData = [
    { x: 125, y: 22800, segment: 'Enterprise', size: 45 },
    { x: 340, y: 5559, segment: 'Mid-Market', size: 30 },
    { x: 680, y: 1853, segment: 'SMB', size: 20 },
    { x: 155, y: 2032, segment: 'Startup', size: 5 }
  ];

  const currentData = segmentationData[segmentBy] || segmentationData.value;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Percentage:</span>
              <span className="font-medium text-foreground">{data.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customers:</span>
              <span className="font-medium text-foreground">{data.count?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium text-foreground">${data.revenue?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const ScatterTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{data.segment}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customers:</span>
              <span className="font-medium text-foreground">{data.x}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Revenue:</span>
              <span className="font-medium text-foreground">${data.y?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Share:</span>
              <span className="font-medium text-foreground">{data.size}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (viewType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Customers"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Avg Revenue"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<ScatterTooltip />} />
              <Scatter 
                name="Customer Segments" 
                data={scatterData} 
                fill="var(--color-primary)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Customer Segmentation Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown of customer segments and behavior patterns
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={segmentOptions}
            value={segmentBy}
            onChange={setSegmentBy}
            className="w-40"
          />
          
          <Select
            options={viewTypeOptions}
            value={viewType}
            onChange={setViewType}
            className="w-32"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Total Customers</span>
          </div>
          <p className="text-xl font-bold text-foreground">1,300</p>
          <p className="text-xs text-success">+8.2% this month</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Crown" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">Enterprise</span>
          </div>
          <p className="text-xl font-bold text-foreground">45%</p>
          <p className="text-xs text-muted-foreground">Highest value</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Avg LTV</span>
          </div>
          <p className="text-xl font-bold text-foreground">$4,850</p>
          <p className="text-xs text-success">+12.5% YoY</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Retention Rate</span>
          </div>
          <p className="text-xl font-bold text-foreground">94.2%</p>
          <p className="text-xs text-success">Above target</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        {renderChart()}
      </div>

      {/* Segment Details */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Segment Performance</h4>
            <div className="space-y-3">
              {currentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{segment.value}%</p>
                    <p className="text-xs text-muted-foreground">{segment.count} customers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Revenue Distribution</h4>
            <div className="space-y-3">
              {currentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">{segment.name}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      ${segment.revenue?.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${Math.round(segment.revenue / segment.count).toLocaleString()} avg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Share" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegmentationChart;