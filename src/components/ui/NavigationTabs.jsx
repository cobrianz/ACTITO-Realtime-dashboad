import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Executive',
      path: '/executive-overview-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Strategic performance overview with key business metrics and growth indicators',
      description: 'Strategic Overview'
    },
    {
      label: 'User Analytics',
      path: '/user-analytics-dashboard',
      icon: 'Users',
      tooltip: 'Product manager focused user behavior analysis and engagement pattern insights',
      description: 'Behavior Analysis'
    },
    {
      label: 'Business Intelligence',
      path: '/business-intelligence-dashboard',
      icon: 'Brain',
      tooltip: 'Comprehensive analytical capabilities with advanced reporting and forecasting tools',
      description: 'Advanced Analytics'
    },
    {
      label: 'Real-Time Operations',
      path: '/real-time-operations-dashboard',
      icon: 'Monitor',
      tooltip: 'Live system monitoring and performance command center for technical teams',
      description: 'System Monitoring'
    }
  ];

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  const handleTabClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (event, path) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(path);
    }
  };

  // Handle arrow key navigation
  useEffect(() => {
    const handleArrowNavigation = (event) => {
      if (event.target.getAttribute('role') === 'tab') {
        const currentIndex = navigationItems.findIndex(item => item.path === location.pathname);
        let nextIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % navigationItems.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIndex = currentIndex === 0 ? navigationItems.length - 1 : currentIndex - 1;
        }

        if (nextIndex !== undefined) {
          event.preventDefault();
          navigate(navigationItems[nextIndex].path);
        }
      }
    };

    document.addEventListener('keydown', handleArrowNavigation);
    return () => document.removeEventListener('keydown', handleArrowNavigation);
  }, [location.pathname, navigate]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className="hidden md:block sticky top-16 z-100 bg-background border-b border-border"
        role="tablist"
        aria-label="Dashboard Navigation"
      >
        <div className="px-6">
          <div className="flex space-x-0">
            {navigationItems.map((item, index) => (
              <button
                key={item.path}
                role="tab"
                aria-selected={isActiveTab(item.path)}
                aria-controls={`tabpanel-${index}`}
                tabIndex={isActiveTab(item.path) ? 0 : -1}
                title={item.tooltip}
                onClick={() => handleTabClick(item.path)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
                className={`
                  relative flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-150 ease-out
                  border-b-2 hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                  ${isActiveTab(item.path)
                    ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                  }
                `}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={`transition-colors duration-150 ${
                    isActiveTab(item.path) ? 'text-primary' : 'text-current'
                  }`}
                />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground hidden lg:block">
                    {item.description}
                  </span>
                </div>
                
                {/* Active indicator */}
                {isActiveTab(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-16 z-100 bg-background border-b border-border">
        <div className="px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full p-3 bg-card hover:bg-accent/10 border border-border rounded-md transition-colors duration-150"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <div className="flex items-center space-x-3">
              {(() => {
                const activeItem = navigationItems.find(item => isActiveTab(item.path));
                return activeItem ? (
                  <>
                    <Icon name={activeItem.icon} size={18} className="text-primary" />
                    <span className="font-medium text-foreground">{activeItem.label}</span>
                  </>
                ) : (
                  <span className="font-medium text-foreground">Select Dashboard</span>
                );
              })()}
            </div>
            <Icon 
              name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground transition-transform duration-150"
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-navigation-menu"
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg elevation-high"
          >
            <div className="p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.path}
                  role="tab"
                  aria-selected={isActiveTab(item.path)}
                  onClick={() => handleTabClick(item.path)}
                  className={`
                    w-full flex items-center space-x-3 p-4 rounded-md text-left transition-colors duration-150
                    ${isActiveTab(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-accent/10 text-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActiveTab(item.path) ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </div>
                  </div>
                  {isActiveTab(item.path) && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavigationTabs;