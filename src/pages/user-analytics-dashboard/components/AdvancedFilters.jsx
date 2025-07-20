import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AdvancedFilters = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '7d',
    userSegment: 'all',
    region: 'all',
    deviceType: 'all',
    trafficSource: 'all',
    customDateStart: '',
    customDateEnd: '',
    minSessionDuration: '',
    maxSessionDuration: '',
    minPageViews: '',
    maxPageViews: ''
  });

  const [savedFilters, setSavedFilters] = useState([
    {
      id: 1,
      name: 'High-Value Users',
      description: 'Premium users with high engagement',
      filters: { userSegment: 'premium', minSessionDuration: '10', region: 'us' },
      isActive: false
    },
    {
      id: 2,
      name: 'Mobile Traffic',
      description: 'Mobile users from last 30 days',
      filters: { deviceType: 'mobile', dateRange: '30d' },
      isActive: false
    },
    {
      id: 3,
      name: 'Organic Visitors',
      description: 'Users from organic search',
      filters: { trafficSource: 'organic', dateRange: '7d' },
      isActive: true
    }
  ]);

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const userSegmentOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'new', label: 'New Users' },
    { value: 'returning', label: 'Returning Users' },
    { value: 'premium', label: 'Premium Users' },
    { value: 'churned', label: 'Churned Users' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'asia', label: 'Asia Pacific' },
    { value: 'americas', label: 'Americas' },
    { value: 'other', label: 'Other Regions' }
  ];

  const deviceTypeOptions = [
    { value: 'all', label: 'All Devices' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'tablet', label: 'Tablet' }
  ];

  const trafficSourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'organic', label: 'Organic Search' },
    { value: 'direct', label: 'Direct Traffic' },
    { value: 'social', label: 'Social Media' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'paid', label: 'Paid Advertising' },
    { value: 'referral', label: 'Referral Traffic' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavedFilterToggle = (filterId) => {
    setSavedFilters(prev => prev.map(filter => ({
      ...filter,
      isActive: filter.id === filterId ? !filter.isActive : false
    })));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: '7d',
      userSegment: 'all',
      region: 'all',
      deviceType: 'all',
      trafficSource: 'all',
      customDateStart: '',
      customDateEnd: '',
      minSessionDuration: '',
      maxSessionDuration: '',
      minPageViews: '',
      maxPageViews: ''
    });
    setSavedFilters(prev => prev.map(filter => ({ ...filter, isActive: false })));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange !== '7d') count++;
    if (filters.userSegment !== 'all') count++;
    if (filters.region !== 'all') count++;
    if (filters.deviceType !== 'all') count++;
    if (filters.trafficSource !== 'all') count++;
    if (filters.minSessionDuration || filters.maxSessionDuration) count++;
    if (filters.minPageViews || filters.maxPageViews) count++;
    return count + savedFilters.filter(f => f.isActive).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">
            Advanced Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset</span>
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent/10 border border-border rounded-md text-sm transition-colors duration-150"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            User Segment
          </label>
          <select
            value={filters.userSegment}
            onChange={(e) => handleFilterChange('userSegment', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {userSegmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {regionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Device Type
          </label>
          <select
            value={filters.deviceType}
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {deviceTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Traffic Source
          </label>
          <select
            value={filters.trafficSource}
            onChange={(e) => handleFilterChange('trafficSource', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {trafficSourceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.customDateStart}
                  onChange={(e) => handleFilterChange('customDateStart', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.customDateEnd}
                  onChange={(e) => handleFilterChange('customDateEnd', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Advanced Metrics */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Session Duration (minutes)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minSessionDuration}
                  onChange={(e) => handleFilterChange('minSessionDuration', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={filters.maxSessionDuration}
                  onChange={(e) => handleFilterChange('maxSessionDuration', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Page Views per Session
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  placeholder="1"
                  value={filters.minPageViews}
                  onChange={(e) => handleFilterChange('minPageViews', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={filters.maxPageViews}
                  onChange={(e) => handleFilterChange('maxPageViews', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Saved Filter Combinations */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Saved Filter Combinations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {savedFilters.map((savedFilter) => (
                <button
                  key={savedFilter.id}
                  onClick={() => handleSavedFilterToggle(savedFilter.id)}
                  className={`p-3 rounded-lg border text-left transition-colors duration-150 ${
                    savedFilter.isActive
                      ? 'bg-primary/10 border-primary/20 text-primary' :'bg-background border-border hover:bg-accent/5 text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {savedFilter.name}
                    </span>
                    {savedFilter.isActive && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {savedFilter.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;