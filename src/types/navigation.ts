
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  requiresAuth?: boolean;
  badge?: number;
}

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface NavigationState {
  isOpen: boolean;
  activeRoute: string;
  breadcrumbs: BreadcrumbItem[];
}

export type UserRole = 'user' | 'moderator' | 'admin';

export interface NavigationContext {
  navigationState: NavigationState;
  setNavigationOpen: (open: boolean) => void;
  updateBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}
