
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationState, BreadcrumbItem } from '@/types/navigation';

export const useNavigation = () => {
  const location = useLocation();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isOpen: false,
    activeRoute: location.pathname,
    breadcrumbs: []
  });

  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      activeRoute: location.pathname
    }));
  }, [location.pathname]);

  const setNavigationOpen = (open: boolean) => {
    setNavigationState(prev => ({
      ...prev,
      isOpen: open
    }));
  };

  const updateBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
    setNavigationState(prev => ({
      ...prev,
      breadcrumbs
    }));
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return {
    navigationState,
    setNavigationOpen,
    updateBreadcrumbs,
    isActiveRoute
  };
};
