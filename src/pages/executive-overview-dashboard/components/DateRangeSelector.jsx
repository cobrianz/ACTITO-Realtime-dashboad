import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ selectedRange, onRangeChange, onExport }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dateRanges = [
    { label: 'Last 7 Days', value: '7d', description: 'Recent week performance' },
    { label: 'Last 30 Days', value: '30d', description: 'Monthly overview' },
    { label: 'Last 90 Days', value: '90d', description: 'Quarterly analysis' },
    { label: 'This Quarter', value: 'quarter', description: 'Current quarter data' },
    { label: 'This Year', value: 'year', description: 'Annual performance' },
    { label: 'Custom Range', value: 'custom', description: 'Select specific dates' }
  ];

  const exportOptions = [
    { label: 'Export PDF', value: 'pdf', icon: 'FileText' },
    { label: 'Export PowerPoint', value: 'ppt', icon: 'Presentation' },
    { label: 'Export Excel', value: 'excel', icon: 'FileSpreadsheet' }
  ];

  const getCurrentRangeLabel = () => {
    const range = dateRanges.find(r => r.value === selectedRange);
    return range ? range.label : 'Select Range';
  };

  const handleRangeSelect = (value) => {
    onRangeChange(value);
    setIsDropdownOpen(false);
  };

  const handleExport = (format) => {
    onExport(format);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Date Range Selector */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-card hover:bg-accent/10 border border-border rounded-lg transition-colors duration-150"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {getCurrentRangeLabel()}
          </span>
          <Icon 
            name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
            size={14} 
            className="text-muted-foreground transition-transform duration-150"
          />
        </button>

        {isDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsDropdownOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20">
              <div className="p-2">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleRangeSelect(range.value)}
                    className={`w-full flex items-start space-x-3 p-3 rounded-md text-left transition-colors duration-150 ${
                      selectedRange === range.value
                        ? 'bg-primary/10 text-primary' :'hover:bg-accent/10 text-foreground'
                    }`}
                  >
                    <Icon 
                      name={selectedRange === range.value ? "Check" : "Calendar"} 
                      size={16} 
                      className={selectedRange === range.value ? "text-primary" : "text-muted-foreground"}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{range.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {range.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Export Controls */}
      <div className="flex items-center space-x-2">
        {exportOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            iconName={option.icon}
            iconPosition="left"
            onClick={() => handleExport(option.value)}
            className="hidden sm:flex"
          >
            {option.label}
          </Button>
        ))}
        
        {/* Mobile Export Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          onClick={() => handleExport('pdf')}
          className="sm:hidden"
        >
          Export
        </Button>
      </div>

      {/* Refresh Button */}
      <Button
        variant="ghost"
        size="sm"
        iconName="RefreshCw"
        onClick={() => window.location.reload()}
        className="text-muted-foreground hover:text-foreground"
      >
        <span className="hidden sm:inline ml-2">Refresh</span>
      </Button>
    </div>
  );
};

export default DateRangeSelector;