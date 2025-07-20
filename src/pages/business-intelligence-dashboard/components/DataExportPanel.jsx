import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataExportPanel = () => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('last_30_days');
  const [selectedDatasets, setSelectedDatasets] = useState(['revenue', 'customers']);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [recipientEmail, setRecipientEmail] = useState('');

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' },
    { value: 'xml', label: 'XML Format' }
  ];

  const dateRangeOptions = [
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_90_days', label: 'Last 90 Days' },
    { value: 'last_12_months', label: 'Last 12 Months' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const availableDatasets = [
    { id: 'revenue', label: 'Revenue Data', description: 'Revenue trends, forecasts, and targets', size: '2.4 MB' },
    { id: 'customers', label: 'Customer Analytics', description: 'Customer segments, behavior, and metrics', size: '1.8 MB' },
    { id: 'products', label: 'Product Performance', description: 'Product sales, adoption, and analytics', size: '3.1 MB' },
    { id: 'marketing', label: 'Marketing Metrics', description: 'Campaign performance and attribution', size: '1.2 MB' },
    { id: 'operations', label: 'Operational Data', description: 'System performance and operational metrics', size: '4.5 MB' },
    { id: 'financial', label: 'Financial Reports', description: 'P&L, cash flow, and financial statements', size: '0.9 MB' },
    { id: 'correlations', label: 'Correlation Analysis', description: 'Statistical correlations and insights', size: '0.6 MB' },
    { id: 'forecasts', label: 'Predictive Models', description: 'Forecasting models and predictions', size: '1.5 MB' }
  ];

  const handleDatasetToggle = (datasetId) => {
    setSelectedDatasets(prev => 
      prev.includes(datasetId) 
        ? prev.filter(id => id !== datasetId)
        : [...prev, datasetId]
    );
  };

  const getTotalSize = () => {
    return selectedDatasets.reduce((total, id) => {
      const dataset = availableDatasets.find(d => d.id === id);
      return total + parseFloat(dataset?.size || '0');
    }, 0).toFixed(1);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting data:', {
      format: exportFormat,
      dateRange,
      datasets: selectedDatasets,
      totalSize: getTotalSize()
    });
  };

  const handleScheduleSetup = () => {
    // Mock schedule setup
    console.log('Setting up scheduled export:', {
      frequency: scheduleFrequency,
      email: recipientEmail,
      datasets: selectedDatasets
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-success/10 rounded-lg">
          <Icon name="Download" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Export & Reports</h3>
          <p className="text-sm text-muted-foreground">
            Export analytics data and schedule automated reports
          </p>
        </div>
      </div>

      {/* Export Configuration */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>

        {dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value="2024-01-01"
            />
            <Input
              label="End Date"
              type="date"
              value="2024-07-20"
            />
          </div>
        )}
      </div>

      {/* Dataset Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Select Datasets</h4>
          <div className="text-sm text-muted-foreground">
            Total size: {getTotalSize()} MB
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
          {availableDatasets.map((dataset) => (
            <div
              key={dataset.id}
              className={`
                p-4 border rounded-lg cursor-pointer transition-all duration-150
                ${selectedDatasets.includes(dataset.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
              onClick={() => handleDatasetToggle(dataset.id)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedDatasets.includes(dataset.id)}
                  onChange={() => handleDatasetToggle(dataset.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-foreground">{dataset.label}</h5>
                    <span className="text-xs text-muted-foreground">{dataset.size}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{dataset.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedDatasets(availableDatasets.map(d => d.id))}
        >
          Select All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedDatasets([])}
        >
          Clear All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedDatasets(['revenue', 'customers', 'financial'])}
        >
          Business Essentials
        </Button>
      </div>

      {/* Scheduled Reports */}
      <div className="pt-4 border-t border-border space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={scheduleEnabled}
            onChange={(e) => setScheduleEnabled(e.target.checked)}
          />
          <div>
            <h4 className="text-sm font-medium text-foreground">Schedule Automated Reports</h4>
            <p className="text-xs text-muted-foreground">
              Automatically export and email reports on a regular schedule
            </p>
          </div>
        </div>

        {scheduleEnabled && (
          <div className="ml-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Frequency"
                options={frequencyOptions}
                value={scheduleFrequency}
                onChange={setScheduleFrequency}
              />
              
              <Input
                label="Recipient Email"
                type="email"
                placeholder="reports@company.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Schedule Preview</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {scheduleFrequency === 'daily' && 'Reports will be sent every day at 9:00 AM'}
                {scheduleFrequency === 'weekly' && 'Reports will be sent every Monday at 9:00 AM'}
                {scheduleFrequency === 'monthly' && 'Reports will be sent on the 1st of each month at 9:00 AM'}
                {scheduleFrequency === 'quarterly' && 'Reports will be sent on the first day of each quarter at 9:00 AM'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* API Access */}
      <div className="pt-4 border-t border-border space-y-4">
        <h4 className="text-sm font-medium text-foreground">API Access</h4>
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-foreground">REST API Endpoint</p>
              <p className="text-xs text-muted-foreground">
                Programmatic access to your analytics data
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Copy" size={16} />
            </Button>
          </div>
          <div className="bg-background border border-border rounded p-3 font-mono text-sm text-foreground">
            https://api.actito.com/v1/analytics/export
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Icon name="Key" size={16} />
            Generate API Key
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Book" size={16} />
            View Documentation
          </Button>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleExport}
          disabled={selectedDatasets.length === 0}
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Export Now ({selectedDatasets.length} datasets)
        </Button>
        
        {scheduleEnabled && (
          <Button
            variant="outline"
            onClick={handleScheduleSetup}
            disabled={!recipientEmail}
            iconName="Clock"
            iconPosition="left"
            className="flex-1"
          >
            Setup Schedule
          </Button>
        )}
      </div>

      {/* Recent Exports */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Exports</h4>
        <div className="space-y-2">
          {[
            { name: 'Q2_Revenue_Analysis.xlsx', date: '2024-07-19', size: '3.2 MB', status: 'completed' },
            { name: 'Customer_Segments.csv', date: '2024-07-18', size: '1.8 MB', status: 'completed' },
            { name: 'Monthly_Report.pdf', date: '2024-07-15', size: '5.1 MB', status: 'completed' }
          ].map((export_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{export_.name}</p>
                  <p className="text-xs text-muted-foreground">{export_.date} • {export_.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-success capitalize">{export_.status}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataExportPanel;