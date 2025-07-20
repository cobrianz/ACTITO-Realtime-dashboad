import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UsageHeatmap = () => {
  const [selectedMetric, setSelectedMetric] = useState('sessions');
  const [viewType, setViewType] = useState('hourly');

  // Generate mock heatmap data for 24 hours x 7 days
  const generateHeatmapData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return days.map(day => ({
      day,
      hours: hours.map(hour => ({
        hour,
        value: Math.floor(Math.random() * 100) + 1,
        sessions: Math.floor(Math.random() * 5000) + 500,
        users: Math.floor(Math.random() * 3000) + 300
      }))
    }));
  };

  const heatmapData = generateHeatmapData();

  const getIntensityColor = (value) => {
    const intensity = value / 100;
    if (intensity < 0.2) return 'bg-primary/10';
    if (intensity < 0.4) return 'bg-primary/25';
    if (intensity < 0.6) return 'bg-primary/50';
    if (intensity < 0.8) return 'bg-primary/75';
    return 'bg-primary';
  };

  const getTextColor = (value) => {
    const intensity = value / 100;
    return intensity > 0.6 ? 'text-background' : 'text-foreground';
  };

  const metricOptions = [
    { value: 'sessions', label: 'Sessions' },
    { value: 'users', label: 'Active Users' },
    { value: 'pageviews', label: 'Page Views' }
  ];

  const viewOptions = [
    { value: 'hourly', label: 'Hourly View' },
    { value: 'daily', label: 'Daily View' }
  ];

  const getPeakHours = () => {
    const allHours = heatmapData.flatMap(day => 
      day.hours.map(hour => ({ ...hour, day: day.day }))
    );
    
    return allHours
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(peak => ({
        time: `${peak.day} ${peak.hour.toString().padStart(2, '0')}:00`,
        value: peak.value,
        sessions: peak.sessions
      }));
  };

  const peakHours = getPeakHours();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Usage Heatmap
          </h3>
          <p className="text-sm text-muted-foreground">
            Peak usage hours and activity patterns throughout the week
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {viewOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Heatmap Grid */}
        <div className="xl:col-span-3">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Hour labels */}
              <div className="flex mb-2">
                <div className="w-12"></div>
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-xs text-muted-foreground"
                  >
                    {i.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              {heatmapData.map((dayData) => (
                <div key={dayData.day} className="flex mb-1">
                  <div className="w-12 flex items-center text-sm text-muted-foreground">
                    {dayData.day}
                  </div>
                  {dayData.hours.map((hourData) => (
                    <div
                      key={`${dayData.day}-${hourData.hour}`}
                      className={`flex-1 h-8 mx-0.5 rounded-sm flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-105 ${getIntensityColor(hourData.value)}`}
                      title={`${dayData.day} ${hourData.hour}:00 - ${hourData.sessions} sessions`}
                    >
                      <span className={`text-xs font-medium ${getTextColor(hourData.value)}`}>
                        {hourData.value > 80 ? hourData.value : ''}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center justify-center mt-4 space-x-4">
                <span className="text-xs text-muted-foreground">Less</span>
                <div className="flex space-x-1">
                  {[10, 25, 50, 75, 100].map(intensity => (
                    <div
                      key={intensity}
                      className={`w-4 h-4 rounded-sm ${getIntensityColor(intensity)}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Hours Summary */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Peak Hours</h4>
          
          {peakHours.map((peak, index) => (
            <div
              key={index}
              className="p-4 bg-background border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  #{index + 1} Peak
                </span>
                <Icon name="TrendingUp" size={14} className="text-primary" />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Time: <span className="text-foreground font-medium">{peak.time}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Sessions: <span className="text-foreground font-medium">{peak.sessions.toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Intensity: <span className="text-primary font-medium">{peak.value}%</span>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">
                Optimal Hours
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Peak activity typically occurs between 9 AM - 11 AM and 2 PM - 4 PM on weekdays.
            </p>
          </div>

          <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Weekly Pattern
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tuesday and Wednesday show highest engagement rates across all time zones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageHeatmap;