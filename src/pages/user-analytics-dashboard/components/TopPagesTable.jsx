import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TopPagesTable = () => {
  const [sortBy, setSortBy] = useState('pageviews');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const pagesData = [
    {
      id: 1,
      page: '/dashboard',
      title: 'Analytics Dashboard',
      pageviews: 45230,
      uniqueViews: 32180,
      avgTimeOnPage: '4m 32s',
      bounceRate: 23.4,
      exitRate: 45.2,
      conversions: 1250,
      conversionRate: 2.76,
      trend: '+12.3%',
      trendType: 'positive'
    },
    {
      id: 2,
      page: '/products',
      title: 'Product Catalog',
      pageviews: 38920,
      uniqueViews: 28750,
      avgTimeOnPage: '6m 15s',
      bounceRate: 18.7,
      exitRate: 32.1,
      conversions: 2340,
      conversionRate: 6.01,
      trend: '+8.9%',
      trendType: 'positive'
    },
    {
      id: 3,
      page: '/pricing',
      title: 'Pricing Plans',
      pageviews: 32450,
      uniqueViews: 24680,
      avgTimeOnPage: '3m 48s',
      bounceRate: 35.2,
      exitRate: 28.9,
      conversions: 890,
      conversionRate: 2.74,
      trend: '+15.7%',
      trendType: 'positive'
    },
    {
      id: 4,
      page: '/features',
      title: 'Feature Overview',
      pageviews: 28730,
      uniqueViews: 21450,
      avgTimeOnPage: '5m 22s',
      bounceRate: 21.8,
      exitRate: 38.7,
      conversions: 670,
      conversionRate: 2.33,
      trend: '+4.2%',
      trendType: 'positive'
    },
    {
      id: 5,
      page: '/signup',
      title: 'User Registration',
      pageviews: 25680,
      uniqueViews: 22340,
      avgTimeOnPage: '2m 15s',
      bounceRate: 42.1,
      exitRate: 15.3,
      conversions: 3450,
      conversionRate: 13.43,
      trend: '+22.1%',
      trendType: 'positive'
    },
    {
      id: 6,
      page: '/login',
      title: 'User Login',
      pageviews: 22890,
      uniqueViews: 18750,
      avgTimeOnPage: '1m 32s',
      bounceRate: 12.4,
      exitRate: 8.9,
      conversions: 4120,
      conversionRate: 18.00,
      trend: '+6.8%',
      trendType: 'positive'
    },
    {
      id: 7,
      page: '/support',
      title: 'Help & Support',
      pageviews: 19450,
      uniqueViews: 15230,
      avgTimeOnPage: '7m 45s',
      bounceRate: 28.9,
      exitRate: 52.1,
      conversions: 230,
      conversionRate: 1.18,
      trend: '-2.3%',
      trendType: 'negative'
    },
    {
      id: 8,
      page: '/blog',
      title: 'Blog Articles',
      pageviews: 17820,
      uniqueViews: 14560,
      avgTimeOnPage: '8m 12s',
      bounceRate: 45.7,
      exitRate: 67.3,
      conversions: 180,
      conversionRate: 1.01,
      trend: '+9.4%',
      trendType: 'positive'
    },
    {
      id: 9,
      page: '/contact',
      title: 'Contact Us',
      pageviews: 15670,
      uniqueViews: 12890,
      avgTimeOnPage: '3m 28s',
      bounceRate: 38.2,
      exitRate: 41.7,
      conversions: 340,
      conversionRate: 2.17,
      trend: '+1.8%',
      trendType: 'positive'
    },
    {
      id: 10,
      page: '/about',
      title: 'About Company',
      pageviews: 13240,
      uniqueViews: 10780,
      avgTimeOnPage: '4m 56s',
      bounceRate: 33.1,
      exitRate: 48.9,
      conversions: 120,
      conversionRate: 0.91,
      trend: '-5.2%',
      trendType: 'negative'
    }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...pagesData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const columns = [
    { key: 'page', label: 'Page', sortable: true },
    { key: 'pageviews', label: 'Page Views', sortable: true },
    { key: 'uniqueViews', label: 'Unique Views', sortable: true },
    { key: 'avgTimeOnPage', label: 'Avg Time', sortable: false },
    { key: 'bounceRate', label: 'Bounce Rate', sortable: true },
    { key: 'conversionRate', label: 'Conv. Rate', sortable: true },
    { key: 'trend', label: 'Trend', sortable: false }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Top Pages Performance
          </h3>
          <p className="text-sm text-muted-foreground">
            Page-level analytics with engagement metrics and conversion tracking
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent/10 border border-border rounded-md text-sm transition-colors duration-150">
            <Icon name="Download" size={16} className="text-muted-foreground" />
            <span className="text-foreground">Export</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent/10 border border-border rounded-md text-sm transition-colors duration-150">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-foreground">Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-3 px-4 text-sm font-medium text-muted-foreground ${
                    column.sortable ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Icon
                        name={getSortIcon(column.key)}
                        size={14}
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((page) => (
              <tr
                key={page.id}
                className="border-b border-border hover:bg-accent/5 transition-colors duration-150"
              >
                <td className="py-4 px-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {page.title}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {page.page}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">
                    {formatNumber(page.pageviews)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">
                    {formatNumber(page.uniqueViews)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground font-mono">
                    {page.avgTimeOnPage}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-medium ${
                    page.bounceRate > 30 ? 'text-error' : 
                    page.bounceRate > 20 ? 'text-warning' : 'text-success'
                  }`}>
                    {page.bounceRate}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-medium ${
                    page.conversionRate > 5 ? 'text-success' : 
                    page.conversionRate > 2 ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {page.conversionRate}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-medium ${
                      page.trendType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      {page.trend}
                    </span>
                    <Icon
                      name={page.trendType === 'positive' ? 'TrendingUp' : 'TrendingDown'}
                      size={14}
                      className={page.trendType === 'positive' ? 'text-success' : 'text-error'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} pages
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-accent/10 border border-border rounded-md text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={16} />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-md text-sm transition-colors duration-150 ${
                    currentPage === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-accent/10 border border-border text-foreground'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-accent/10 border border-border rounded-md text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopPagesTable;