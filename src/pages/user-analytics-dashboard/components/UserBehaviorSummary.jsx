import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UserBehaviorSummary = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const behaviorData = {
    userSegments: [
      {
        id: 'new-users',
        name: 'New Users',
        count: 12450,
        percentage: 34.2,
        avgSessionDuration: '6m 32s',
        bounceRate: 28.4,
        pagesPerSession: 3.2,
        conversionRate: 2.1,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20'
      },
      {
        id: 'returning-users',
        name: 'Returning Users',
        count: 18750,
        percentage: 51.6,
        avgSessionDuration: '9m 15s',
        bounceRate: 18.7,
        pagesPerSession: 5.8,
        conversionRate: 4.3,
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20'
      },
      {
        id: 'premium-users',
        name: 'Premium Users',
        count: 5180,
        percentage: 14.2,
        avgSessionDuration: '12m 48s',
        bounceRate: 12.1,
        pagesPerSession: 8.4,
        conversionRate: 12.8,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20'
      }
    ],
    topActions: [
      {
        action: 'Page View',
        count: 245670,
        percentage: 45.2,
        trend: '+8.3%',
        icon: 'Eye'
      },
      {
        action: 'Button Click',
        count: 128450,
        percentage: 23.6,
        trend: '+12.7%',
        icon: 'MousePointer'
      },
      {
        action: 'Form Submit',
        count: 89320,
        percentage: 16.4,
        trend: '+5.9%',
        icon: 'Send'
      },
      {
        action: 'Download',
        count: 45680,
        percentage: 8.4,
        trend: '+15.2%',
        icon: 'Download'
      },
      {
        action: 'Search',
        count: 34290,
        percentage: 6.3,
        trend: '+3.1%',
        icon: 'Search'
      }
    ],
    deviceBreakdown: [
      { device: 'Desktop', count: 18750, percentage: 51.6, icon: 'Monitor' },
      { device: 'Mobile', count: 12890, percentage: 35.5, icon: 'Smartphone' },
      { device: 'Tablet', count: 4680, percentage: 12.9, icon: 'Tablet' }
    ],
    trafficSources: [
      { source: 'Organic Search', count: 15230, percentage: 41.9, icon: 'Search' },
      { source: 'Direct', count: 9870, percentage: 27.2, icon: 'Globe' },
      { source: 'Social Media', count: 6540, percentage: 18.0, icon: 'Share2' },
      { source: 'Email', count: 3450, percentage: 9.5, icon: 'Mail' },
      { source: 'Referral', count: 1230, percentage: 3.4, icon: 'ExternalLink' }
    ]
  };

  const timeframeOptions = [
    { value: '1d', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'new', label: 'New Users' },
    { value: 'returning', label: 'Returning Users' },
    { value: 'premium', label: 'Premium Users' }
  ];

  const renderProgressBar = (percentage, color = 'bg-primary') => (
    <div className="w-full bg-muted/20 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            User Behavior Summary
          </h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis of user engagement patterns and behavior insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeframeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {segmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Segments */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">User Segments</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {behaviorData.userSegments.map((segment) => (
            <div
              key={segment.id}
              className={`p-4 rounded-lg border ${segment.bgColor} ${segment.borderColor}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className={`font-medium ${segment.color}`}>
                  {segment.name}
                </h5>
                <span className="text-sm text-muted-foreground">
                  {segment.percentage}%
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className={`text-2xl font-bold ${segment.color}`}>
                    {segment.count.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total users</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Avg Session</p>
                    <p className="font-medium text-foreground">{segment.avgSessionDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bounce Rate</p>
                    <p className="font-medium text-foreground">{segment.bounceRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pages/Session</p>
                    <p className="font-medium text-foreground">{segment.pagesPerSession}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conv. Rate</p>
                    <p className="font-medium text-foreground">{segment.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Top User Actions</h4>
        <div className="space-y-4">
          {behaviorData.topActions.map((action, index) => (
            <div key={action.action} className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={action.icon} size={18} className="text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {action.action}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">
                      {action.count.toLocaleString()}
                    </span>
                    <span className="text-xs text-success">
                      {action.trend}
                    </span>
                  </div>
                </div>
                {renderProgressBar(action.percentage)}
                <p className="text-xs text-muted-foreground mt-1">
                  {action.percentage}% of total actions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Device Breakdown</h4>
          <div className="space-y-4">
            {behaviorData.deviceBreakdown.map((device) => (
              <div key={device.device} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                  <Icon name={device.icon} size={16} className="text-secondary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {device.device}
                    </span>
                    <span className="text-sm text-foreground">
                      {device.count.toLocaleString()}
                    </span>
                  </div>
                  {renderProgressBar(device.percentage, 'bg-secondary')}
                  <p className="text-xs text-muted-foreground mt-1">
                    {device.percentage}% of sessions
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Traffic Sources</h4>
          <div className="space-y-4">
            {behaviorData.trafficSources.map((source) => (
              <div key={source.source} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
                  <Icon name={source.icon} size={16} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {source.source}
                    </span>
                    <span className="text-sm text-foreground">
                      {source.count.toLocaleString()}
                    </span>
                  </div>
                  {renderProgressBar(source.percentage, 'bg-accent')}
                  <p className="text-xs text-muted-foreground mt-1">
                    {source.percentage}% of traffic
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBehaviorSummary;