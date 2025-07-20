import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('1h');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomDomain, setZoomDomain] = useState(null);
  const chartRef = useRef(null);

  // Generate initial data
  useEffect(() => {
    const generateInitialData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 59; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000);
        data.push({
          time: timestamp.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          timestamp: timestamp.getTime(),
          pageLoadTime: Math.floor(Math.random() * 2000) + 500,
          bounceRate: Math.floor(Math.random() * 40) + 20,
          responseTime: Math.floor(Math.random() * 500) + 100,
          throughput: Math.floor(Math.random() * 1000) + 200
        });
      }
      
      setChartData(data);
    };

    generateInitialData();
  }, []);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        
        // Remove oldest data point and add new one
        newData.shift();
        newData.push({
          time: now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          timestamp: now.getTime(),
          pageLoadTime: Math.floor(Math.random() * 2000) + 500,
          bounceRate: Math.floor(Math.random() * 40) + 20,
          responseTime: Math.floor(Math.random() * 500) + 100,
          throughput: Math.floor(Math.random() * 1000) + 200
        });
        
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleZoom = (domain) => {
    if (domain) {
      setZoomDomain(domain);
      setIsZoomed(true);
    }
  };

  const resetZoom = () => {
    setZoomDomain(null);
    setIsZoomed(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${entry.name.includes('Rate') ? '%' : entry.name.includes('Time') ? 'ms' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const timeRangeOptions = [
    { value: '15m', label: '15 min' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Performance Metrics Correlation
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time page load times vs bounce rates
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
          
          {isZoomed && (
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomOut"
              iconPosition="left"
              onClick={resetZoom}
            >
              Reset Zoom
            </Button>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseDown={(e) => {
              if (e && e.activeLabel) {
                // Start zoom selection
              }
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--color-border)" 
              opacity={0.3}
            />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={zoomDomain ? [zoomDomain.left, zoomDomain.right] : ['dataMin', 'dataMax']}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Load Time (ms)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Bounce Rate (%)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pageLoadTime"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              name="Page Load Time"
              connectNulls={false}
            />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bounceRate"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              dot={false}
              name="Bounce Rate"
              connectNulls={false}
            />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="responseTime"
              stroke="var(--color-accent)"
              strokeWidth={1}
              dot={false}
              name="Response Time"
              strokeDasharray="5 5"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-border space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-primary"></div>
            <span>Page Load Time</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-secondary"></div>
            <span>Bounce Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-accent" style={{ borderTop: '1px dashed' }}></div>
            <span>Response Time</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={14} className="text-success animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Live data • Updated every 5s
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;