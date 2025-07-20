import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedFilterPanel = ({ onFiltersChange, savedQueries = [] }) => {
  const [filters, setFilters] = useState([
    { id: 1, field: 'revenue', operator: 'greater_than', value: '', logic: 'AND' }
  ]);
  const [activeQuery, setActiveQuery] = useState('');

  const fieldOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'customer_segment', label: 'Customer Segment' },
    { value: 'product_line', label: 'Product Line' },
    { value: 'acquisition_cost', label: 'Acquisition Cost' },
    { value: 'lifetime_value', label: 'Customer Lifetime Value' },
    { value: 'churn_rate', label: 'Churn Rate' },
    { value: 'retention_rate', label: 'Retention Rate' },
    { value: 'market_penetration', label: 'Market Penetration' },
    { value: 'date_created', label: 'Date Created' },
    { value: 'last_activity', label: 'Last Activity' }
  ];

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'contains', label: 'Contains' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'between', label: 'Between' },
    { value: 'in_list', label: 'In List' },
    { value: 'is_null', label: 'Is Null' },
    { value: 'is_not_null', label: 'Is Not Null' }
  ];

  const logicOptions = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' }
  ];

  const savedQueryOptions = [
    { value: 'high_value_customers', label: 'High Value Customers' },
    { value: 'at_risk_segments', label: 'At Risk Segments' },
    { value: 'growth_opportunities', label: 'Growth Opportunities' },
    { value: 'quarterly_performance', label: 'Quarterly Performance' },
    { value: 'product_analysis', label: 'Product Analysis' }
  ];

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: 'revenue',
      operator: 'greater_than',
      value: '',
      logic: 'AND'
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

  const updateFilter = (id, field, value) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, [field]: value } : filter
    ));
  };

  const applyFilters = () => {
    onFiltersChange?.(filters);
  };

  const clearFilters = () => {
    setFilters([{ id: 1, field: 'revenue', operator: 'greater_than', value: '', logic: 'AND' }]);
    onFiltersChange?.([]);
  };

  const loadSavedQuery = (queryId) => {
    // Mock loading saved query
    const mockQueries = {
      high_value_customers: [
        { id: 1, field: 'lifetime_value', operator: 'greater_than', value: '10000', logic: 'AND' },
        { id: 2, field: 'customer_segment', operator: 'equals', value: 'Enterprise', logic: 'AND' }
      ],
      at_risk_segments: [
        { id: 1, field: 'churn_rate', operator: 'greater_than', value: '15', logic: 'OR' },
        { id: 2, field: 'last_activity', operator: 'less_than', value: '30', logic: 'AND' }
      ]
    };
    
    if (mockQueries[queryId]) {
      setFilters(mockQueries[queryId]);
      setActiveQuery(queryId);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {/* Saved Queries */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Saved Queries</label>
        <Select
          placeholder="Load saved query..."
          options={savedQueryOptions}
          value={activeQuery}
          onChange={(value) => loadSavedQuery(value)}
          className="w-full"
        />
      </div>

      {/* Filter Builder */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">Query Builder</label>
        
        {filters.map((filter, index) => (
          <div key={filter.id} className="space-y-3">
            {index > 0 && (
              <div className="flex items-center space-x-2">
                <Select
                  options={logicOptions}
                  value={filter.logic}
                  onChange={(value) => updateFilter(filter.id, 'logic', value)}
                  className="w-20"
                />
              </div>
            )}
            
            <div className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-4">
                <Select
                  label="Field"
                  options={fieldOptions}
                  value={filter.field}
                  onChange={(value) => updateFilter(filter.id, 'field', value)}
                />
              </div>
              
              <div className="col-span-3">
                <Select
                  label="Operator"
                  options={operatorOptions}
                  value={filter.operator}
                  onChange={(value) => updateFilter(filter.id, 'operator', value)}
                />
              </div>
              
              <div className="col-span-4">
                <Input
                  label="Value"
                  type="text"
                  placeholder="Enter value..."
                  value={filter.value}
                  onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                />
              </div>
              
              <div className="col-span-1">
                {filters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-3">
        <Button
          variant="outline"
          onClick={addFilter}
          iconName="Plus"
          iconPosition="left"
          className="w-full"
        >
          Add Filter
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button variant="default" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Query Preview */}
      {filters.some(f => f.value) && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <label className="text-sm font-medium text-foreground">Query Preview</label>
          <div className="text-sm text-muted-foreground font-mono">
            {filters.map((filter, index) => (
              <div key={filter.id}>
                {index > 0 && <span className="text-accent"> {filter.logic} </span>}
                <span className="text-primary">{filter.field}</span>
                <span> {filter.operator.replace('_', ' ')} </span>
                <span className="text-secondary">"{filter.value}"</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Query */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <Input
            type="text"
            placeholder="Query name..."
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            Save Query
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterPanel;