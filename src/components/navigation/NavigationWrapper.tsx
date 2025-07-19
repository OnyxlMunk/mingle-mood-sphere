
import { ReactNode } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { AuthenticatedNavigation } from './AuthenticatedNavigation';
import { MobileNavigation } from './MobileNavigation';

interface NavigationWrapperProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export function NavigationWrapper({ children, isAuthenticated = false }: NavigationWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <AuthenticatedNavigation /> : <PublicNavigation />}
      
      <main className={cn(
        "flex-1",
        isAuthenticated && "pb-20 md:pb-0" // Add bottom padding for mobile nav
      )}>
        {children}
      </main>
      
      {isAuthenticated && <MobileNavigation />}
    </div>
  );
}
