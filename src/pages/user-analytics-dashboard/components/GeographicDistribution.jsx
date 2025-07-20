import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [metricType, setMetricType] = useState('users');

  const geographicData = [
    {
      country: 'United States',
      countryCode: 'US',
      users: 45230,
      sessions: 128450,
      bounceRate: 23.4,
      avgSessionDuration: '8m 42s',
      revenue: 892340,
      coordinates: { lat: 39.8283, lng: -98.5795 },
      growth: '+12.3%',
      flag: '🇺🇸'
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      users: 28750,
      sessions: 82340,
      bounceRate: 21.8,
      avgSessionDuration: '9m 15s',
      revenue: 567890,
      coordinates: { lat: 55.3781, lng: -3.4360 },
      growth: '+8.7%',
      flag: '🇬🇧'
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      users: 22180,
      sessions: 65420,
      bounceRate: 19.2,
      avgSessionDuration: '10m 3s',
      revenue: 445670,
      coordinates: { lat: 51.1657, lng: 10.4515 },
      growth: '+15.2%',
      flag: '🇩🇪'
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      users: 18920,
      sessions: 54780,
      bounceRate: 25.1,
      avgSessionDuration: '7m 58s',
      revenue: 378450,
      coordinates: { lat: 56.1304, lng: -106.3468 },
      growth: '+6.4%',
      flag: '🇨🇦'
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      users: 15640,
      sessions: 43290,
      bounceRate: 22.7,
      avgSessionDuration: '8m 21s',
      revenue: 312890,
      coordinates: { lat: -25.2744, lng: 133.7751 },
      growth: '+9.8%',
      flag: '🇦🇺'
    },
    {
      country: 'France',
      countryCode: 'FR',
      users: 14230,
      sessions: 39870,
      bounceRate: 20.5,
      avgSessionDuration: '9m 42s',
      revenue: 285670,
      coordinates: { lat: 46.2276, lng: 2.2137 },
      growth: '+11.5%',
      flag: '🇫🇷'
    },
    {
      country: 'Japan',
      countryCode: 'JP',
      users: 12890,
      sessions: 36540,
      bounceRate: 18.9,
      avgSessionDuration: '11m 12s',
      revenue: 258340,
      coordinates: { lat: 36.2048, lng: 138.2529 },
      growth: '+7.2%',
      flag: '🇯🇵'
    },
    {
      country: 'Netherlands',
      countryCode: 'NL',
      users: 9870,
      sessions: 28450,
      bounceRate: 21.3,
      avgSessionDuration: '8m 56s',
      revenue: 197680,
      coordinates: { lat: 52.1326, lng: 5.2913 },
      growth: '+13.7%',
      flag: '🇳🇱'
    }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'americas', label: 'Americas' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' }
  ];

  const metricOptions = [
    { value: 'users', label: 'Active Users' },
    { value: 'sessions', label: 'Sessions' },
    { value: 'revenue', label: 'Revenue' }
  ];

  const getTotalMetrics = () => {
    return geographicData.reduce((totals, country) => ({
      users: totals.users + country.users,
      sessions: totals.sessions + country.sessions,
      revenue: totals.revenue + country.revenue
    }), { users: 0, sessions: 0, revenue: 0 });
  };

  const totals = getTotalMetrics();

  const getMetricValue = (country, metric) => {
    switch (metric) {
      case 'users':
        return country.users.toLocaleString();
      case 'sessions':
        return country.sessions.toLocaleString();
      case 'revenue':
        return `$${(country.revenue / 1000).toFixed(0)}K`;
      default:
        return country.users.toLocaleString();
    }
  };

  const getPercentage = (country, metric) => {
    const total = totals[metric];
    return ((country[metric] / total) * 100).toFixed(1);
  };

  const sortedData = [...geographicData].sort((a, b) => b[metricType] - a[metricType]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Geographic Distribution
          </h3>
          <p className="text-sm text-muted-foreground">
            User activity and engagement patterns across different regions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {regionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Global User Distribution"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=39.8283,-98.5795&z=2&output=embed"
              className="rounded-lg"
            />
            
            {/* Overlay with data points */}
            <div className="absolute inset-0 pointer-events-none">
              {sortedData.slice(0, 5).map((country, index) => (
                <div
                  key={country.countryCode}
                  className="absolute bg-primary rounded-full animate-pulse"
                  style={{
                    width: `${Math.max(8, (country[metricType] / sortedData[0][metricType]) * 20)}px`,
                    height: `${Math.max(8, (country[metricType] / sortedData[0][metricType]) * 20)}px`,
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Country Rankings */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground mb-4">
            Top Countries by {metricOptions.find(opt => opt.value === metricType)?.label}
          </h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {sortedData.map((country, index) => (
              <div
                key={country.countryCode}
                className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:bg-accent/5 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted/20 rounded-full text-sm">
                    {index + 1}
                  </div>
                  <div className="text-2xl">{country.flag}</div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground">
                      {country.country}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {getPercentage(country, metricType)}% of total
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {getMetricValue(country, metricType)}
                  </p>
                  <p className="text-xs text-success">
                    {country.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Total Users</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            {totals.users.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-secondary" />
            <span className="text-sm text-muted-foreground">Total Sessions</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            {totals.sessions.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            ${(totals.revenue / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Globe" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Countries</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            {geographicData.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;